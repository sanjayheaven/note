

const createStore = function (initState) {
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

  function notify() {
    /**通知所有订阅者，状态已更新 */
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function reducer(state) {
    return newState
  }

  function dispatch(action) {
    // 根据action执行reducer
    let newState = reducer(state)

    state = newState // 赋值新的state
    notify() // 通知所有订阅state的组件
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}
