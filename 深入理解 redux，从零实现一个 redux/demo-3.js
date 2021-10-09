const middlerware =
  ({ getState, dispath }) =>
  (next) =>
    action

// 变形之后
const middlerware = function ({ getState, dispatch }) {
  return function (next) {
    return function (action) {}
  }
}

function logger({ getState }) {
  return function (next) {
    return function (action) {
      console.log("will dispatch", action)

      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action)

      console.log("state after dispatch", getState())

      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue
    }
  }
}
