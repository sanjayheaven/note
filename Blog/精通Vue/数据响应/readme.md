# 数据响应

在这之前，先分清楚几个概念。

**数据驱动，响应式，双向绑定**
什么是**数据驱动**？  
在整个 Vue 实现 UI 视图过程，我们无须操作 DOM 来改变试图，利用 DOM 和数据的映射，完成对数据的修改，进而得到视图的改变。

什么是**响应式**？  
当我们对一个对象，重新定义 get 和 set 方法 ，那么这个对象就可以称为**响应式对象**。

在 Vue 当中即是，我们对一个数据修改，Vue 能够监听到这个数据的更改，并且对应利用数据驱动视图改变。

什么是**双向绑定**？
双向绑定只是一个语法糖，数据和视图 能够互相驱动更新。
上面讲的数据驱动是 数据驱动 DOM 视图改变，在这个基础上，我们监听 DOM 的变化，进而改变数据，使得数据和视图保持一致。

## 响应式对象

怎么实现响应式？  
Vue2.x 中，利用了 **Object.defineProperty**
在 core/observe/index.js

```js
// 省略无关代码
export class Observer {
  value: any
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
export function observe(value, asRootData) {
  // 省略
  ob = new Observer(value)
  // 省略
  return ob
}

export function defineReactive(obj, key, val) {
  const property = Object.getOwnPropertyDescriptor(obj, key)
  const getter = property && property.get
  const setter = property && property.set
  const dep = new Dep() // 新建依赖实例

  let childOb = !shallow && observe(val) // 递归使得数据响应式
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      dep.notify()
    },
  })
}
```

通过**observe** 来返回一个 Observer 对象构造的实例，  
在类实例构造当中，当值为对象和数据的时候，分别处理。

**defineReactive**使得对象变成响应式对象，并递归子属性，核心操作就是利用 Object.defineProperty 重写了 get 和 set 方法 。。

## 依赖收集 派发更新

想一下，平时操作 Vue 的时候，我们修改了一个 data 值， 但是 UI 部分，如果有很多地方都调用了这个值的，通常是同时完成修改。  
那么？那么多 UI 部分 DOM 映射的值是如何得知 我们修改了这个 date 值。。
原理就是通过上面的重新定义 set，当有值改变的时候，我们就通知更新，这个过程称为派发更新。
那我们怎么知道派发给谁？那就需要一个 get 过程，也即是依赖收集。  
这整个过程就是**发布订阅模式**。  
忍不住写一下发布订阅的模板。

```js
function (){
  const listeners = []
  const subscribe = function (listener){
    listeners.push(listener)
    return function unsubscribe(){
      let index = listeners.indexOf(listener)
      listeners.splice(1)
    }
  }
  function notify() {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }
}
```

我们继续看 Vue 的依赖收集过程，
在 core/observe/dep.js 中，

```js
export default class Dep {
  static target: ?Watcher
  id: number
  subs: Array<Watcher>
  constructor() {
    this.subs = []
  }
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }
  removeSub(sub: Watcher) {
    remove(this.subs, sub)
  }
  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

可以看出，这个逻辑，就是发布订阅，notify 派发更新的时候，需要调用订阅者的 update 方法，
**watcher** 就是起到订阅者这个作用。

```js
export default class Watcher {
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
}
```

我们可以看到，在 Watcher 中的 update 方法，在更新数据时候，还有一个 **queueWatcher**，
这个作用主要是为了，多数据更新时候，能够更新完之后再一起挂载。
比如来一个循环 100 次，对 data 赋值，那么只会在最后一次赋值之后，才会进行数据的更新以及 DOM 视图的变化。

## 总结

需要对以下几个概念能够区别和知悉原理。  
并且能够熟悉，在 Vue 当中是如何实践。

- 数据驱动
- 响应式
  - 通过 Observer
- 依赖收集
  - 通过 Dep
- 派发更新
  - 通过 Watcher
