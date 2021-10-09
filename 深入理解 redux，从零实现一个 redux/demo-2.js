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

// 合并Reducers
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
