# 深入理解 redux，从零实现一个 redux

初识 Redux，官方文档直接把我看蒙了。太复杂了，这讲的是工具还是哲学？

但是 Redux 作为一个状态管理容器，起到的作用就是维护状态 State，在这基础上做一些限制。

比如 状态 State 只读，要想修改状态必须要通过某个 Action 触发，这个行为由纯函数 Reducer 执行。
这基本就是 Redux 全部思想了。

## 目录

- 介绍
- 简单的 Redux
- 原则和规范
- 中间件机制
-

## 介绍

** 为什么需要 Redux 或者说 为什么需要状态管理器？**

### 单一数据源，State 只读

这个和我们为什么用全局变量和少用全局变量是一个道理。  
用全局变量的好处，方便维护，统一管理。 但是要少用，避免污染。

- 避免污染，State 只读属性，只暴露单一接口修改，这个和全局变量差不多，

  - 反例： 如果 A 组件修改了 State,B 组件也修改了 State，但是 AB 在不同条件下触发修改 State，执行的先后顺序不同，那最终结果是 A 修改的值还是 B 修改的值？这也是 [竞太条件](https://zh.wikipedia.org/wiki/%E7%AB%B6%E7%88%AD%E5%8D%B1%E5%AE%B3)

- 便于跟踪和维护，State 只能通过 Action 触发修改，我们可以很清楚的得知并控制触发来源。而且我们可以围绕 acton 更快捷增加修改日志记录等。

所以这么看来，Redux 要解决的问题，就是把状态 State 管理起来，并且要达到以下几点。

- 知道什么时候更新
- 知道由于什么原因更新
- 知道更新成什么样子

总之，就是控制的细节到位，State 的变化尽在掌握中。

前两点我们可以根据 Action，就可以知道 State 为什么修改，并且只在 Action 触发的时候执行修改。

### 纯函数

相同条件，输出相同结果

**为什么需要纯函数？**
我们看到上面，如果我们想预测 State 的变化，要是每次来一个相同的 Action 触发，输出总是不同的，这不是可预测的吧？
所以，我们需要有个**纯函数，来执行 State 的变化**

### 为什么需要 Reducer 和 Action,

Action 起到了一层接口作用，State 怎么修改怎么更新，由状态仓库 Store 自己决定，UI 组件只是通知到仓库修改的指令，具体执行由 Store 内部完成，也就是 Reducer

所以为了满足这几点要求，Action 和 Reducer 缺一不可。

### 总结

用一张示意图总结这一部分。
![Store-UI示意图](./images/Store-UI示意图.png)

## 简单的 Redux

根据前面的基础，我们先尝试实现简单的版本。
为了让 UI 组件能够及时得到 State 的更新后的值，我们利用发布订阅来解决这个问题。

```js
const createStore = function (initState, reducer) {
  let state = initState
  let listeners = []
  //   State 只读
  function getState() {
    return state
  }
  function subscribe(listener) {
    listeners.push(listener)
    // 订阅之后 提供一个取消订阅方法
    return function unsubscribe() {
      let index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
  /**通知所有订阅者，状态已更新 */
  function notify() {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function dispatch(action) {
    //  reducer 会根据具体的action，执行操作
    let newState = reducer(state, action)
    state = newState // 赋值新的state
    notify() // 通知所有订阅state的组件
  }
  return { getState, subscribe, dispatch }
}
```

## 中间件机制

上面部分，我们了解到，现在整个状态仓库，是可控的，而且每一个细节都能控制的到位。  
所以当我们需要某一些额外的要求时候，比如：

- 需要记录 action 操作的时候，打印日志和状态
- 替换修改、操作某个 action
- 异步操作的时候
- etc

**我们需要中间件**

继续完善上图
![Store-UI-Middleware示意图](./images/Store-UI-MiddleWare示意图.png)

可以看到，通常的中间件机制，类如 Koa 洋葱模型的中间件机制，都是保证一定的输入输出。  
在中间件内部去完成某些操作，做一些限制或者修改补充上下文。  
Redux 中间件也是一样，

## 原则和规范

上一部分，介绍了 Redux 关键部分，以及基本思想。  
如果我们想实现 Redux 的基本功能，首先要理解 Redux 的一些规范和原则。
