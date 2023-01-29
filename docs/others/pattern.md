# 设计模式

(参考)[https://juejin.cn/post/6844904032826294286]

## 工厂模式

工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类, 根据传入参数的不同创建元素

```js
class Product {
    constructor(name) {
        this.name = name
    }
    log() {
        console.log('ok')
    }
}

class Factory {
    create(name) {
        return new Product(name)
    }
}

let factory = new Factory()
let p = factory.create('p1')
p.log()
```

## 单例模式

一个类只有一个实例，并提供一个访问它的全局访问点

```js
 class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
 }
 LoginForm.getInstance = (function () {
     let instance
     return function () {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
     }
 })()

let obj1 = LoginForm.getInstance()
obj1.show()

let obj2 = LoginForm.getInstance()
obj2.hide()

console.log(obj1 === obj2)
```

## 适配器模式

将一个类的接口转化为另外一个接口

```js
class Plug {
  getName() {
    return 'Lighting';
  }
}

class Target {
  constructor() {
    this.plug = new Plug();
  }
  getName() {
    return this.plug.getName() + ' 转Type-c';
  }
}

let target = new Target();
target.getName()
```


## 装饰者模式

```js
class Cellphone {
    create() {
        console.log('手机')
    }
}
class Decorator {
    constructor(cellphone) {
        this.cellphone = cellphone
    }
    create() {
        this.cellphone.create()
        this.createShell(cellphone)
    }
    createShell() {
        console.log('手机壳')
    }
}

let cellphone = new Cellphone()
cellphone.create()

let dec = new Decorator(cellphone)
dec.create()
```

## 代理模式

## 外观模式

## 观察者模式

## 状态模式

## 迭代器模式

## 桥接模式

## 组合模式

## 原型模式

## 策略模式

## 享元模式

## 模板方法模式

## 职责链模式

## 命令模式

## 备忘录模式

## 中介者模式

## 解释器模式

## 访问者模式

