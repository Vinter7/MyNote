# 面试问题

## 个人情况

### 自我介绍

尊敬的面试官你们好，我叫，本硕都就读于浙江理工大学，现在研究生二年级，去年获得了校一等学业奖学金。
我在课题组里主要负责前后端软件的开发，我最熟悉的语言是JavaScript，平时前端项目主要是用vue框架开发，后端用node。
我做过许多项目，个人练习项目包括，用css绘制iPhone手机，用vue开发网页游戏，比如扫雷，2048等，用组件库开发后台管理系统，用axios请求网络数据这样。
团队合作的项目有，一个是圆形纬编针织机器人智能工厂，这是我们课题组和企业的合作项目，是国家纵向课题，我在其中开发了前后端调度管理软件。还有一个是研究生电子设计大赛的项目，我们组做的是基于机器视觉的自动水果识别售卖系统，这个项目最后获得了校二等奖和华东区三等奖。
我很喜欢做网站，我有自己的博客站，我把我的笔记和项目都放在上面，我也有Github仓库，去年提交了150次左右。以上就是我的自我介绍，谢谢面试官。

### 最成功一件事

略

## HTTP

- http https
  - http
    - 数据传输明文
    - 默认端口80
  - https
    - 信息加密
    - 默认端口443
    - 性能不如
    - SSL证书加密要钱
- udp tcp
  - 都位于传输层
    - 网络接口 网络 传输 应用
  - tcp 三握四挥
  - udp 不重发不纠正
- http 1.0 1.1 2.0
  - 短暂连接
  - 持久连接
  - 二进制格式 多路复用
- 状态码
  - 1临时响应 2成功 3重定向 4请求错误 5服务器错误
  - 100征询服务器情况 206断点续传
  - 301永久重定向会缓存 302临时重定向不会缓存 304协商缓存
  - 400参数有误 403禁止访问 404找不到 503服务器停机 504网关超时
- get post
  - 获取数据 提交数据
- 请求头
  - Accept Cookie Data If Origin
- 前端缓存
  - http缓存
    - 强缓存 200 f5后无效
    - 协商缓存 304
  - 浏览器缓存
    - cookie
    - sessionStorage
    - localStorage
- 解决跨域
  - JSONP
  - CORS
  - 网络代理
- 输入网址后发生了什么
  1. dns解析
  2. 与ip进行tcp连接
  3. 浏览器发送HTTP请求
  4. 服务器处理请求，返回响应
  5. 浏览器解析渲染页面
  6. 关闭TCP连接
- WebSocket
  - 以前用轮询
  - 用于实时通信

## CSS

- 盒子模型
  - content padding border margin
- 选择器
  - id、类、标签、后代、子、兄弟、群组
  - 伪类、伪元素
    - :hover :focus :visited :active 元素的进一步筛选
    - ::after ::before 在元素前面后面插入内容
- 单位
  - em rem px vh vw
  - 设备像素比（dpr） = 设备像素 / 设备独立像素
  - 每英寸像素（ppi）
- 隐藏页面元素
  - display:none visibility:hidden opacity:0
  - 不存在 存在 存在
- bfc
  - 块级格式化上下文 一块独立渲染区域
  - 根元素、浮动、overflow、display、position(ab,fixed)
- 水平垂直居中
  - margin、transform、table、flex、grid
- 布局
  - 水平垂直居中 margin、transform、table、flex、grid
  - 两栏布局 overflow: hidden(float: left; margin-left: px;)
  - 三栏布局
    - 两边float 中间margin
    - 两边absolute，中间margin
    - 两边float 和负 margin
    - display: table
    - flex grid
- flexbox
  - flex-direction flex-wrap (flex-flow) justify-content align-items align-content
  - 主轴方向 换行 对齐 交叉轴对齐 多轴线对齐
- grid
  - grid-template-columns/rows
  - grid(-r/c)-gap
  - grid-template-areas grid-auto-flow
  - j/a-items/content/self
- CSS3新特性
  - 选择器 新样式 transition 渐变 flex/grid
- CSS 动画
  - 过渡 变形 移动 动画
- 回流 重绘
  - 重算大小位置 重新绘制
  - 改class
- 响应式设计
  - 使用弹性盒子
  - 使用百分比\相对单位
- CSS优化
- 文本溢出省略
  - 单行 text-overflow white-space overflow
  - 多行 高度/行数截断
- 视察滚动
  - background-attachment:fix  transform:translate3D
- 三角形
  - width: 0; height: 0; 
  - border-style:solid; border-width: 0 50px 50px;
  - border-color: transparent transparent #d9534f;
- 小于12px 的文字 zoom
- sass
  - 变量、嵌套、导入、注释、混合器、继承



## JavaScript

- 数据类型 number bigint string boolean null undefined symbol object
- 浅拷贝
  - 浅拷贝是拷贝一层，深层次的引用类型则共享内存地址
  - `for(let i in obj) cp[i] = obj[i]`
- 深拷贝
  - `_.cloneDeep(obj)`
  - `JSON.parse(JSON.stringify(obj1))` 忽略undf symbol 函数
  - `structuredClone(obj)`
  - 循环递归 是对象的话就继续进行拷贝
- 闭包
  - 一个函数和对其周围状态的引用捆绑在一起
  - 闭包让你可以在一个内层函数中访问到其外层函数的作用域
- 原型链
  - `person1.__proto__ === Person.prototype`
  - `Person.__proto__ === Function.prototype`
  - `Person.prototype.__proto__ === Object.prototype`
  - `Object.__proto__ === Function.prototype`
  - `Object.prototype.__proto__ === null`
- 继承
  - 原型式继承、寄生式继承、寄生组合式继承
- this
  - 普通函数为调用时对象
  - 箭头函数为定义时对象
- 判断类型
  - typeof a
  -  obj instanceof constructor 判断对象是否是构造函数生成的
  -  `Object.prototype.toString.call(obj)`
- new操作符
  - 创建obj
  - `__proto__ = Func.prototype`
  - this指向新对象
  - 返回对象
- Ajax
  - 通过XmlHttpRequest对象来向服务器发异步请求 获得数据,更新页面
- call apply bind 都是改变函数运行时this的指向 用法不一样
- 事件循环
  - 主线程(执行栈)内的任务执行完毕后会去任务队列读取任务，推入主线程执行
  - 异步任务 微任务(js引擎)优先 全完成后再执行宏任务(宿主环境)
- 浏览器存储
  - cookie 4k
  - sessionStorage 自动删除
  - localStorage 持久数据
- 防抖节流
  - 连续触发事件但只执行一定时间内最后的一次
    - 搜索框输入 文本编辑器实时保存 通过定时器清除实现
  - 连续触发事件但在设定的时间内只执行一次
    - 高频事件 下拉加载 视频播放记录时间 
    - 通过定时器实现 等定时器结束才再次开启


## Vue

- $nextTick(() => {})
  - DOM 更新之后再执行
  - 用于希望获取更新后的状态
  - 原理上将函数放入回调,进入任务队列,事件循环到了时执行,这时dom已经更新
- 对vue的理解
  - 数据驱动、组件化、指令系统
- 和React的区别
  - 双向数据流、可变数据、组件通信不同 diff算法不同
- 对SPA的理解
  - 一个主页面多个页面片段
  - 哈希模式 局部刷新
- v-show和v-if
  - 都是控制元素显示
  - 区别在于有无dom节点
- 生命周期
  - 创建、挂载、更新、销毁
  - 创建时dom节点未生成，挂载时dom节点渲染完毕
  - 都能拿到实例对象属性和方法，对页面内容改动放created
- v-if v-for不能一起
  - 先循环再判断，性能浪费
- SPA 首屏优化
  - 减小入口文件体积、静态资源缓存、组件按需加载、资源压缩
  - 使用SSR
- data属性为函数而非对象
  - 根实例对象可以是对象
  - 组件实例必为函数，防止共用data，产生数据污染
- 3比2
  - 快小易原生
- Object.defineProperty 和 Proxy
  - 遍历对象属性进行劫持，给每个属性添加getter和setter，实现响应式
  - proxy可以对整个对象进行监听，操作新的对象达到响应式
- 组件间通信
  - props、$emit、透传、pinia
- slot
  - 默认插槽、具名插槽、作用域插槽
- key
  - 提高diff效率
- diff算法
  - 深度优先、同层比较
  - 


## Webpack

- 静态模块打包工具
- 构建流程
  - 初始化 读取配置参数
  - 编译 从入口文件开始构建
  - 输出 输出到结果文件
- Loader 文件转换器 对模块的"源代码"进行转换
  - style css sass file html babel
- Plugin 提供特定的功能
  - HtmlWebpackPlugin 把打包生成的js 模块引⼊到该 html 中
  - CleanWebpackPlugin 删除构建目录
  - MiniCssExtractPlugin 提取 CSS 到一个单独的文件
  - DefinePlugin 创建配置的全局对象
  - CopyWebpackPlugin 复制文件或目录到执行区域
- 区别
  - loader 是文件加载器，能够加载资源文件 (函数)
  - plugin 是各种功能(类)
  - loader 运行在打包文件之前 plugins 在整个编译周期都起作用
- 热更新
  - 创建两个服务器 express(静态资源) socket(通信)
  - 对应的模块发生变化时 socket 将更新文件发给浏览器
  - 浏览器针对修改的模块进行更新
- webpack proxy
  - 接收客户端发送的请求后转发给其他服务器
  - 在开发模式下解决跨域问题
- 前端优化 代码图片压缩
- 提高构建速度 优化配置
- vite 按需编译

## TypeScript

- 数据类型
  - boolean number string array tuple enum any null&undefined void never object
- 枚举类型 所有可能取值的集合
  - `enum name{ok=1}`
- 接口 一个对象相关的属性和方法
  - `interface name {name: string}`
- 类 函数
- 泛型 写代码时使用一些以后才指定的类型
  - `function returnItem<T>(para: T): T {return para}`
- 通过基础类型组合成高级类型
- 装饰器 不改变原类的情况下，动态地扩展对象功能
  - `function decorate(){} @decorate`
- 和vue组合 装饰器


## 数据结构与算法