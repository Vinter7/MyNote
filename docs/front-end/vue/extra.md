# 进阶深入

## 逻辑复用

### 组合式函数

::: code-group
```vue [Component.vue]
<script setup>
import { useMouse } from './mouse.js'
const { x, y } = useMouse()
</script>
<template>
  Mouse position is at: {{ x }}, {{ y }}
</template>
```
```js [mouse.js]
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```
```js [event.js]
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```
:::

### 自定义指令

```vue
<script setup>
  const vFocus = {
  created(el, binding, vnode, prevVnode) {},
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted(el, binding, vnode, prevVnode) {
    console.log(binding.value)
    console.log(binding.arg)
    el.focus()
  },
  beforeUpdate(el, binding, vnode, prevVnode) {},
  updated(el, binding, vnode, prevVnode) {},
  beforeUnmount(el, binding, vnode, prevVnode) {},
  unmounted(el, binding, vnode, prevVnode) {}
}
</script>
<template>
  <input v-focus:arg="'value'" />
</template>
```

### 插件

```js
import { createApp } from 'vue'

const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}

const app = createApp({})
app.use(myPlugin, {
  /* 可选的选项 */
})
```

## 内置组件

### Transition

1. `v-enter-from` 插入前
2. `v-enter-active` 插入时
3. `v-enter-to` 插入后
4. `v-leave-from` 离开前
5. `v-leave-active` 离开时
6. `v-leave-to` 离开后


```vue
<script setup>
  import { ref } from 'vue'
  const show = ref(true)
</script>
<template>
  <button @click="show = !show">Toggle</button>
  <Transition name="fade">
    <p v-if="show">hello</p>
  </Transition>
</template>
<style>
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
```

### TransitionGroup

```vue
<script setup>
import { shuffle as _shuffle } from 'lodash-es'
import { ref } from 'vue'

const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref([1, 2, 3, 4, 5])
let id = items.value.length + 1

function insert() {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}

function reset() {
  items.value = [1, 2, 3, 4, 5]
}

function shuffle() {
  items.value = _shuffle(items.value)
}

function remove(item) {
  const i = items.value.indexOf(item)
  if (i > -1) {
    items.value.splice(i, 1)
  }
}
</script>

<template>
  <button @click="insert">insert at random index</button>
  <button @click="reset">reset</button>
  <button @click="shuffle">shuffle</button>

  <TransitionGroup tag="ul" name="fade" class="container">
    <div v-for="item in items" class="item" :key="item">
      {{ item }}
      <button @click="remove(item)">x</button>
    </div>
  </TransitionGroup>
</template>

<style>
.container {
  padding: 0;
}
/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
```

### KeepAlive

在多个组件间动态切换时缓存被移除的组件实例


### Teleport

将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去

```js
// 常用于模态框
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

### Suspense

用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态

## 全家桶

### 路由

[Vue Router](https://router.vuejs.org/zh/)

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

### 状态管理

[Pinia](https://pinia.vuejs.org/zh/)

::: code-group
```js [store.js]
import { reactive } from 'vue'

export default reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```
```vue [Component.vue]
<script setup>
import store from './store.js'
</script>
<template>
  <button @click="store.increment()">
    From Store: {{ store.count }}
  </button>
</template>
```
:::

### 测试

略

### 服务端渲染 SSR

[Nuxt](https://nuxt.com/)

```js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

## 进阶

### 响应原理

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

### 渲染机制

虚拟 DOM (Virtual DOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来(**编译**)，保存在内存中，然后将真实的 DOM 与之保持同步    
一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为**挂载**    
遍历两份虚拟 DOM 树，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为**更新**    

!(渲染管线)[https://cn.vuejs.org/assets/render-pipeline.03805016.png]

### 渲染函数 & JSX

`h('div', [ok.value ? h('div', 'yes') : h('span', 'no')])`  
`<div>{ok.value ? <div>yes</div> : <span>no</span>}</div>`

```js
import { h } from 'vue'

const vnode = h(
  'div',  // type
  { 
    class: 'bar',
    'prop': '100',
    style: { color: 'red' }
  },   // props
  ['hello', h('span', 'hello')],  // children
)

function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

**函数式组件** `function MyComponent(props, { slots, emit, attrs }) {}`


### 动画技巧

1. 基于 CSS class 关键帧(@keyframes)的动画
2. 状态驱动的动画
   - ``backgroundColor: `hsl(${x}, 80%, 50%)`;``
   - `transition: 0.3s background-color ease;`
3. 基于侦听器的动画 `watch(number, (n) => {gsap.to(...)})`


### 响应性语法糖

实验性功能, 默认禁用

略