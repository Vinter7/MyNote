<script setup>
import { ref, reactive, computed } from 'vue'

//生成数字
function* genNum(num, n) {
  for (let i = 0; i < n; i++) {
    yield num
  }
}
//邻居格子相对位置
function neighbor(i) {
  let a = w.value //列数
  if (!(i % a)) {
    return [-a, a, 1 - a, 1, a + 1]
  } else if (!((i + 1) % a)) {
    return [-a - 1, -1, a - 1, -a, a]
  } else {
    return [-a - 1, -1, a - 1, -a, a, 1 - a, 1, a + 1]
  }
}
// 周围几个雷
function around(i) {
  let sum = 0
  for (let j of neighbor(i)) {
    sum += arr.value[i + j] ?? 0
  }
  return sum
}
//扩散显示周围
function showAround(i) {
  if (!record.includes(i)) {
    record.push(i)
    for (let j of neighbor(i)) {
      let ij = i + j
      if (status.value[ij] != 0) continue
      let a = aroundArr.value[ij]
      if (a === 0) {
        status.value[ij] = 1
        showAround(ij) //递归
      } else if (a && a != 9) {
        status.value[ij] = 1
      }
    }
  }
}

function allSwept() {
  let arr_c = arr.value
  let status_c = status.value
  for (let i = 0; i < arr_c.length; i++) {
    if (!arr_c[i] && status_c[i] != 1) return false
  }
  console.log('雷扫完了')
  return true
}

//点击事件
function ck(i) {
  if (arr.value[i] === 1) {
    alert('此处是雷,游戏结束')
    status.value = status.value.map(j => (j ? j : 1))
    return (end.value = true)
  }
  status.value[i] = 1
  if (allSwept()) {
    alert('所有雷均已排除,恭喜你获得胜利')
    return (end.value = true)
  }
  if (aroundArr.value[i] == 0) showAround(i)
}

//初始化函数
function init() {
  ;[h.value, w.value, m.value] = config
  status.value = [...genNum(0, h.value * w.value)]
  end.value = false
  record = []
  let mineArr = [
    ...genNum(1, m.value),
    ...genNum(0, h.value * w.value - m.value),
  ]
    .sort(() => 0.5 - Math.random())
    .sort(() => 0.5 - Math.random())

  arr.value = mineArr
  aroundArr.value = mineArr.map((i, index) => (i ? 9 : around(index)))
}

//输入校验
let ok = computed(() => {
  let [a, b, c] = config
  if (a % 1 || b % 1 || c % 1) return true
  if (a > 25 || a < 5) return true
  if (b > 25 || b < 5) return true
  if (c > a * b) return true
  return false
})

let config = reactive([15, 15, 20]) // 响应式
let h = ref(15) //行数
let w = ref(15) //列数
let m = ref(20) //雷数
//是否被点击的状态 0未点击 1左击 2右击
let status = ref([])
let end = ref() //是否游戏结束
let record = [] //记录遍历过的点
let arr = ref([])
let aroundArr = ref([])
init()
</script>

<template>
  <div class="flexbox">
    <div
      class="grid"
      :style="`grid-template: repeat(${h}, 32px) / repeat(${w}, 30px);`"
    >
      <button
        v-for="(i, index) in aroundArr"
        @click="status[index] == 2 ? (status[index] = 0) : ck(index)"
        @contextmenu.prevent="status[index] = status[index] ? 0 : 2"
        :disabled="status[index] == 1"
        class="btn"
      >
        <!-- 数字 -->
        <div v-if="status[index] == 1">
          <b>{{ i ? (i != 9 ? i : '\u{1F4A3}') : '' }}</b>
        </div>
        <!-- 排雷旗 -->
        <div v-if="status[index] == 2">
          {{ '\u{1F6A9}' }}
        </div>
      </button>
    </div>
    <div class="form">
      <div class="tableCell">
        {{ ok ? '请正确输入' : '点笑脸开始' }}
      </div>
      <div class="tableRow">
        <label class="tableCell">行数：</label>
        <input
          type="number"
          name="h"
          v-model="config[0]"
          class="tableCell"
          required
          placeholder="15"
        />
      </div>
      <div class="tableRow">
        <label class="tableCell">列数：</label>
        <input
          type="number"
          name="w"
          v-model="config[1]"
          class="tableCell"
          required
          placeholder="15"
        />
      </div>
      <div class="tableRow">
        <label class="tableCell">雷数：</label>
        <input
          type="number"
          name="w"
          v-model="config[2]"
          class="tableCell"
          required
          placeholder="20"
        />
      </div>
      <div class="tableRow">
        <button @click="init" :disabled="ok">
          {{ ok ? '\u{1F622}' : '\u{1F60A}' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 2px;
}
.btn {
  background-color: var(--vp-c-brand);
  border: none;
}
.btn:hover {
  background-color: var(--vp-c-brand-light);
}
.btn:disabled {
  color: var(--vp-c-bg);
  background-color: var(--vp-c-text-1);
}
.flexbox {
  display: flex;
  justify-content: space-around;
}
.form {
  display: table;
  height: min-content;
}
.tableRow {
  display: table-row;
}
.tableCell {
  display: table-cell;
  margin: 10px 0;
}
input {
  max-width: 100px;
}
label {
  min-width: 50px;
}
</style>
