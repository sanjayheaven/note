const middlerware1 =
  ({ getState, dispatch }) =>
  (next) =>
    action

// 上述 变形之后 等同如下
const middlerware = function ({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      next(action) // 非必须操作
    }
  }
}

const compose = function (fns) {
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

const applyMiddlleware = function (...middlewares) {
  return function rewriteStore() {
    // 官方叫enhancer，实际上是重写了store部分的dispatch
    const store = createStore()
    let chain = middlewares.map((middlerware) => middlerware(store))
    let dispatch = store.dispatch
    let composeRes = compose(chain)
    dispatch = composeRes(dispatch) // 重写了dispatch

    return { ...store, dispatch }
  }
}
