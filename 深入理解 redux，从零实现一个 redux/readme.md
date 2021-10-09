# 深入理解 redux，从零实现一个 redux

初识 Redux，官方文档直接把我看蒙了。太复杂了，这讲的是工具还是哲学？

但是 Redux 作为一个状态管理容器，起到的作用就是维护状态 State，在这基础上做一些限制。

比如 状态 State 只读，要想修改状态必须要通过某个 Action 触发，这个行为由纯函数 Reducer 执行。
这基本就是 Redux 全部思想了。

## 目录

- 介绍
- 简单的 Redux
- 多 State 多 Reducer
- 原则和规范
- 中间件机制
-

## 介绍

**为什么需要 Redux 或者说 为什么需要状态管理器？**

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

[demo-1.js](demo-1.js)

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

## 多 State 多 Reducer

上面讲的整体比较抽象，实际应用中，我们肯定是维护大量的不同 State，如果只有一个 Reducer 来完成，那这个 Reducer 将会变得难以维护，十分臃肿。  
一般来说我们会按模块对不同 State 和 对应 Reducer 放置不同文件中。  
然后在某个文件中进行合并。
例如：

[demo-2.js](demo-2.js)

```js
// 文件A中
const moduleAState = "moduleAState"
const moduleAReducer = function (state, action) {
  /**
   * 为什么会是action.type? 这是Redux的规范。
   * 但是本质上是 根据不同action匹配不同结果reducer  */
  switch (action.type) {
    case "A1":
      return newState1
    case "A2":
      return newState2
    case "A3":
      return newState3
    default:
      return newState
  }
}

// 文件B中
const moduleBState = "moduleBState"
const moduleBReducer = function (state, action) {
  switch (action.type) {
    case "B1":
      return newState1
    case "B2":
      return newState2
    case "B3":
      return newState3
    default:
      return newState
  }
}
```

**在这里，我们要始终明白，Reducer 和 Action 是如何配合的，Reducer 是根据 Action 来进行某一项操**
**作，这像不像 路由匹配？ 不断找寻符合条件的, 直到符合，或最终 Default**
**所以我们对 不同模块的 Reducers 合并的最终的本质也只是，从 moduleAReducer 先匹配，再到 moduleBReducer 匹配**

代码有点复杂，但是就如上述所说，我们只是让让所匹配的 Reducer 变得更有秩序。匹配的本质不变。

```js
const combinedReducers = function (reducersObject) {
  const reducerKeys = Object.keys(reducersObject)

  //  我们需要合并成一个新的reducer，所以也是一个纯函数，接收参数是state，action
  /**
   * 回顾reducer的要求
   * 根据action， 接受state，返回newState
   */
  return function combination(state, action) {
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i]
      let reducer = reducersObject[key] // 这里就具体到某个模块的reducer了
      let newState = reducer(state, action) // 根据action匹配
      return newState //
    }
  }
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
![Store-UI-Middleware示意图](./images/Store-UI-Middleware示意图.png)

可以看到，通常的中间件机制，类如 Koa 洋葱模型的中间件机制，都是保证一定的输入输出。  
在中间件内部去完成某些操作，做一些限制或者修改补充上下文。  
Redux 中间件也是一样，

在这里推荐可以看下[Koa-compose](https://github.com/koajs/compose/blob/master/index.js)的实现，作为处理异步过程的中间件机制，代码非常精炼。

**我觉得这些中间件的机制，都像是流水线工作一样，线上的产品在流水线上流动，保证每个工位无论是对这个产品修改删除替换等操作，但都只做一件事，这样才可以提高效率，更好维护。**

**Redux 中间件机制中的产品 就是 dispatch 的 action**

Redux 实现的中间件机制，即 applyMiddleware。

首先我们先看以下一个中间件，该是什么样子，如何应用？

官方文档已经定义好了 middleware 的形式。

```js
const middlerware =
  ({ getState, dispatch }) =>
  (next) =>
    action

// 上述 变形之后 等同如下
const middlerware = function ({ getState, dispatch }) {
  return function (next) {
    return function (action) {}
  }
}
```

怎么理解这个 middleware？

[引用官方文档,middlerware 参数定义](http://cn.redux.js.org/api/applymiddleware#%E5%8F%82%E6%95%B0)

> ...middleware (arguments): 遵循 Redux middleware API 的函数。每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。该函数会被传入被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。

getState，和 dispatch 作为参数

## 原则和规范

上一部分，介绍了 Redux 关键部分，以及基本思想。  
如果我们想实现 Redux 的基本功能，首先要理解 Redux 的一些规范和原则。
