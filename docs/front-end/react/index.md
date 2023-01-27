# React

[React Docs](https://beta.reactjs.org/)

## 基本

`npx create-react-app my-app`  
`yarn create vite myapp --template react`

```js
// index.js
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
```

```jsx
// App.jsx
import React, { Component } from 'react'

const arr = ['tom','bob','jack']
const msg = 'Hello world'
const style = {backgroundColor:'skyblue'}

export default class App extends Component {
  render() {
    return (
      <>
        <div>{msg}</div>
        {/* 注释 */}
        <hr />
        <label htmlFor="username">用户名：</label>
        <input type="text" id='username' />
        <hr />
        <div className="box">盒子</div>
        <hr />
        <div style={style}>样式1</div>
        <div style={{backgroundColor:null ? 'skyblue' : 'pink'}}>样式2</div>
        <ul>
          {arr.map((item,index)=>
            <li key={index}>{item}</li>
          )}
        </ul>
      </>
    )
  }
}
```

## 响应

::: code-group
```jsx [类组件]
import React, { Component } from 'react'
import './app.css'
export default class App2 extends Component {
  state = {
    num1: 1,
    num2: 1,
  }
  render() {
    return (
      <>
        <div className="pink">
          <h2>数字为：{this.state.num1}</h2>
          <button
            onClick={() =>
              this.setState({ num1: this.state.num1 + 1 })
            }
          >
            累加1
          </button>
          <button onClick={this.addNum.bind(this)}>累加2</button>
          <button onClick={() => this.addNum()}>累加3</button>
          <button onClick={this.addNum2}>测试</button>
        </div>
        <div className="skyblue">
          <h2>数字为：{this.state.num2}</h2>
          <button onClick={this.setNum.bind(this, 2)}>设为2</button>
          <button onClick={() => this.setNum(3)}>设为3</button>
        </div>
      </>
    )
  }

  addNum() {
    this.setState({ num1: this.state.num1 + 1 })
    // 构造函数中的this才指向实例对象
  }

  setNum(n) {
    this.setState({ num2: n })
    // 函数中的this并非实例对象
    // 可以改成箭头函数
  }
  
  addNum2 = () => {
    console.log(this)
    this.setState({ num1: this.state.num1 + 1 })
  }
}
```
```jsx [函数组件]
//函数组件没有this, 故使用生命周期钩子
import { useState } from 'react'

export default function App3() {

  const [num, setNum] = useState(0)
  const add = () => setNum(num + 1)
  const set = n => setNum(n)

  return (
    <div>
      <h2>数字为：{num}</h2>
      <button onClick={add}>累加</button>
      <button onClick={() => set(0)}>归零</button>
    </div>
  )
}
```
:::


## Hooks

::: code-group
```jsx [useEffect]
import { useState, useEffect } from 'react'
import './app.css'
//函数组件没有this, 故使用生命周期钩子

export default function App3() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [num3, setNum3] = useState(0)

  useEffect(() => {
    console.log('不检测更新')
  }, [])

  useEffect(() => {
    console.log('检测所有更新')
  })

  useEffect(() => {
    console.log('检测num1更新')
  }, [num1])

  useEffect(() => {
    console.log('检测num1、num2更新')
  }, [num1, num2])

  useEffect(() => {
    return () => {
      console.log('组件销毁')
    }
  })

  return (
    <>
      <div className="skyblue">
        <h2>num1:{num1}</h2>
        <button onClick={() => setNum1(num1 + 1)}>add1</button>
      </div>
      <div className="pink">
        <h2>num2:{num2}</h2>
        <button onClick={() => setNum2(num2 + 1)}>add2</button>
      </div>
      <div className="skyblue">
        <h2>num3:{num3}</h2>
        <button onClick={() => setNum3(num3 + 1)}>add3</button>
      </div>
    </>
  )
}
```

```jsx [避免重新定义]
import { useState, memo, useCallback, useMemo } from 'react'

export default function App7() {
  const [num, setNum] = useState(1)
  // 组件更新的时候把定义的函数和变量都重新定义了一遍
  // 因此这两个东西就是为了不让那些东西重新定义
  const func1 = useCallback(() => setNum(num => num + 1), [])
  const func2 = useMemo(() => () => setNum(num => num + 1), [])

  return (
    <div>
      <h3>数字{num}</h3>
      <Child2 func1={func1} func2={func2} />
      <hr />
      <Child1 />
    </div>
  )
}

const Child1 = memo(() => {
  console.log('不然每次更新都会打印')
  return <>子组件 </>
})

const Child2 = memo(props => {
  console.log('不然每次更新都会打印')
  return (
    <>
      <button onClick={() => props.func1()}>累加</button>
      <button onClick={() => props.func2()}>累加</button>
    </>
  )
})
```
:::

## 组件通信
::: code-group
```jsx [基本]
import { useState } from 'react'

export default function App4() {
  const [num, setNum] = useState(1)
  return <Father num={num} setNum={setNum} />
}

function Father(props) {
  return <Child num={props.num} setNum={props.setNum} />
}

function Child(props) {
  return (
    <>
      <h2>子组件 - {props.num}</h2>
      <button onClick={() => props.setNum(0)}>归零</button>
    </>
  )
}
```

```jsx [上下文]
import { useState, createContext, useContext } from 'react'

const numCtx = createContext()

export default function App5() {
  const [num, setNum] = useState(1)
  return (
    // 提供
    <numCtx.Provider value={{ num, setNum }}>
      <Father />
    </numCtx.Provider>
  )
}

const Father = () => <Child />

function Child() {
  // 接收
  const { num, setNum } = useContext(numCtx)
  return (
    <>
      <h2>子组件 - {num}</h2>
      <button onClick={() => setNum(0)}>归零</button>
    </>
  )
}
```
:::

## 表单取值


```jsx
import { useState, useRef } from 'react'

export default function App6() {
  const [value, setValue] = useState('input')
  const ele = useRef(null)
  return (
    <div>
      <h2>受控组件</h2>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div>{value}</div>
      <hr />
      <h2>非受控组件</h2>
      <input type="text" ref={ele} />
      <button onClick={() => console.log(ele.current.value)}>
        获取dom值
      </button>
    </div>
  )
}
```

## Mobx 状态管理

::: code-group
```js [state.js]
import { makeAutoObservable, runInAction } from 'mobx'
class Number {
  num = 0

  constructor() {
    makeAutoObservable(this)
  }

  add = () => (this.num += 1)
  reset = () => (this.num = 0)
  plus = async () => {
    const times = await new Promise(r => setTimeout(() => r(2), 1000))
    runInAction(() => (this.num *= times))
  }
}

export default new Number()
```
```jsx [App.jsx]
import React from 'react'
import number from './state'
import { observer } from 'mobx-react-lite'

export default observer(() => (
  <>
    <h2>状态管理</h2>
    <h3>{number.num}</h3>
    <button onClick={number.add}>累加</button>
    <button onClick={number.reset}>归零</button>
    <button onClick={number.plus}>二倍</button>
  </>
))
```
:::


## Router

`yarn add react-router-dom`

**基本用法**

::: code-group
```jsx [router]
import {
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom'
export default createBrowserRouter([
  {
    path: '/',
    element: <div>home</div>,
  },
  {
    path: '/login',
    element: <div>login</div>,
  },
  {
    path: '/about',
    element: <div>about</div>,
  },
])
```

```jsx [main]
import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router'
import { RouterProvider,Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1>React Router</h1>
    <Link to='/login'>登录</Link>
    <RouterProvider router={router} />
  </React.StrictMode>
)
```
:::

**编程导航**

::: code-group
```jsx [Login]
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  // 替换跳转 无记录
  const goAbout1 = () => navigate('/about',{replace:true})
  // SearchParam 传参
  const goAbout2 = () => navigate('/about?id=1001')
  // Params 传参 需要路由 '/about/:id'
  const goAbout3 = () => navigate('/about/1001')

  return (
    <>
      <div>Login</div>
      <button onClick={() => navigate('/about')}>goAbout</button>
    </>
  )
}
```
```jsx [About]
import { useSearchParams, useParams } from 'react-router-dom'

const About = () => {
  const [params] = useSearchParams()
  console.log(params)
  const id1 = params.get('id')
  const {id} = useParams()
  return <div>this is about {id1 ?? id}</div>
}

export default About
```
:::

**嵌套路由**

::: code-group
```jsx [router]
{
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <div>二级默认渲染</div>,
    },
    {
      path: 'article',
      element: <div>文章</div>,
    },
  ],
}
```

```jsx [Layout]
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <Link to="/">默认</Link>
      <Link to="/article">文章</Link>
      <div>二级路由出口位置</div>
      <Outlet />
    </div>
  )
}
```
:::

**404页面**

```js
{
  path:'*',
  element: <div>404 Not Found </div>
}
```