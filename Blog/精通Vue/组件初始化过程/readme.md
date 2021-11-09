# 组件初始化过程

**主要讲述，Vue 类的创建，以及在类的实例初始化过程。**

直接进入 core/index.js，对外暴露 Vue 对象

```js
import Vue from "./instance/index.js"
export default vue
```

继续往里走，会发现 Vue 类的构造函数在这里，这过程由 5 个混入完成。

```js
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword")
  }
  // 这种用 instanceof 判断是否是类的实例，常见于很多库。
  this._init(options)
  //   Vue构造函数的初始化
}
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

继续分析 这 5 个 Minin 做了什么。  
直接上结果。

- **initMixin core/instance/init.js**
  - 在 Vue.prototype 添加 **\_init**
- **stateMixin core/instance/state.js**
  - 在 Vue.prototype 添加 **$data $props $watch $set $delete**
- **eventsMixin core/instance/events.js**
  - 在 Vue.prototype 添加 **$on $once $off $emit**
- **lifecycleMixin core/instance/lifecycle.js**
  - 在 Vue.prototype 添加 **\_update $forceUpdate $destroy**
- **renderMixin core/instance/render.js**
  - 在 Vue.prototype 添加 **\_render $nextTick** 以及一些**renderHelpers**

到这位置，整个 Vue 类的初始化基本完成。  
可以看出来，选择的是构造函数 + 原型继承来创建类，这也是比较常用的一种方式。

继续往里看，**\_init**方法 会在构造 Vue 实例的时候调用。  
依次包含了，

- mergeOptions
  - 合并选项
- initLifecycle
  - 生命周期相关的事情，为实例添加属性，例如
  - **$parent, $children, $refs, $root** 等等
- initEvents
  - 同样也是添加一些属性，比如 **\_events**
- ## initRender
- callHooks()
  - 调用钩子 beforeCreate
- initInjections
- initState
  - 依次初始化 **props methods data computed watch**
- initProvide
- callHooks()
  - 调用钩子 created
- $mount
  - 挂载到具体的 dom 上。

## 总结

- 5 个混入
  - render state events lifecircle init
  - 构造 Vue 对象 和 实例 vm。
  - 在原型链上添加属性和方法
- initMinin 最为重要
  - 添加 \_init 方法
  - \_init 方法 初始化 lifecircle， events，（beforecreate） injection, state，provide,（create） $mount
