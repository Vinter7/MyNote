# 微信小程序

## 配置

- 全局配置
  - `pages` 页面路径列表
  - `window` 全局的默认窗口表现
  - `tabBar` 底部tab栏
- 局部配置
  - 导航栏
    - 背景色 标题色 标题文字 样式
  - 窗口背景色
  - 下拉刷新 上拉加载

## 逻辑

[生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html)

- 路由
  - `getCurrentPages()` 当前页面
  - `wx.navigateTo` `<navigator open-type="navigateTo"/>` 去非 tabBar 页面
  - `wx.redirectTo` `<navigator open-type="redirectTo"/>` 重定向
  - `wx.navigateBack` `<navigator open-type="navigateBack">` 回
  - `wx.switchTab` `<navigator open-type="switchTab"/>` 切非 tabBar 页面
  - `wx.reLaunch` `<navigator open-type="reLaunch"/>` 重启任意页面

::: code-group
```js [app.js]
App({
  onLaunch(p) {},
  onShow (p) {},
  onHide () {},
  onError (e) {},
  globalData: 'I am global data'
})
// 整个小程序只有一个 App 实例
// xxx.js 获取实例
const appInstance = getApp()
console.log(appInstance.globalData)
```
```js [index.js]
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(p) {},
  onShow: function() {},
  onReady: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function () {},
  onPageScroll: function() {},
  onResize: function() {},
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.text)
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set data for updating'
    }, function() {}) // this is setData callback
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})
```
```js [module]
// util.js
function sayHello(name) {
  console.log(`Hello ${name} !`)
}
module.exports.sayHello = sayHello

// index.js
var util = require('util.js')
Page({
  helloMINA: function() {
    util.sayHello('Vinter')
  }
})
```
```js [behaviors]
// 共享数据方法
module.exports = Behavior({
  data: {
    sharedText: 'This is a piece of data shared between pages.'
  },
  methods: {
    sharedMethod: function() {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    }
  }
})
```
:::


## 视图

**WXML**

`<标签名 属性名1="属性值1" 属性名2="属性值2" ...> ...</标签名>`

- 共同属性
  - id class style
  - hidden
  - data-*
  - bind*/catch*


::: code-group
```js [数据绑定]
Page({
  data: {
    time: (new Date()).toString()
  },
})

<text data-test="{{time}}">当前时间：{{time}}</text>
<text>{{2>1 ? 'ok' : 'no'}}</text>
```
```html [条件渲染]
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```
```html [列表渲染]
<view wx:for="{{['o-0', 'l-1','b-6']}}" wx:key="*this">
  {{index}}: {{item}} 默认就是叫这个
</view>
```
```js [触发事件]
Page({
  tapName: function(event) {
    console.log(event)
  }
})

<view bindtap="tapName"> Click me! </view>
```
```js [双向绑定]
<input model:value="{{value}}" />

// custom-component.js
Component({
  properties: {
    myValue: String
  }
})
<!-- custom-component.wxml -->
<input model:value="{{myValue}}" />

<custom-component model:my-value="{{pageValue}}" />
```
```html [模板复用]
<template name="odd">
  <view> odd </view>
</template>

<template name="even">
  <view> even </view>
</template>

<block wx:for="{{[1, 2, 3, 4, 5]}}">
  <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
</block>
```
```html [导出引入]
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>

<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>
```
:::

**WXSS**

- 单位rpx
  - rpx:px = 屏幕宽度:物理像素
- 导入
  - `@import "common.wxss";`

## 组件

```js
Component({
  behaviors: [],
  // 组件的属性可以用于接收页面的参数
  properties: {
    paramA: { // 属性名
      type: String,
      value: ''
    },
    paramB: String // 简化的定义方式
  },

  data: {
    text: "This is page data."
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  methods: {
    onLoad: function(options) {},
    onPullDownRefresh: function() {},
    // 事件响应函数
    viewTap: function() {}
  }
})
```

## 常用API

### 网络


### 存储


### 深色模式


### 调用硬件

### 用户登录