const A_Middleware = (product, next) => {
  console.log("A_Middleware")
  next() // 执行下一个中间件
}
const B_Middleware = (product, next) => {
  console.log("B_Middleware")
  next() // 执行下一个中间件
}
const C_Middleware = (product, next) => {
  console.log("C_Middleware")
  next() // 执行下一个中间件
}
const applyMiddlleware = function (...middlewares) {
  return function (product, next) {
    function dispatch(index) {
      // 这里只是分发过程，不是Redux的dispatch
      let middleware = middlewares[index]
      if (index == middlewares.length) {
        middleware = next
      }
      if (!middleware) return
      // 边界处理，如果最后一个中间件了。那就应用为空.， 或者为外界传入的回调
      return middleware(product, () => dispatch(index + 1))
    }
    return dispatch(0)
  }
}

// 应用
let initProduct

let res = applyMiddlleware(
  A_Middleware,
  B_Middleware,
  C_Middleware
)(initProduct)
// A_Middleware B_Middleware C_Middleware

let dispatch // Redux 的dispatch
applyMiddlleware(A_Middleware, B_Middleware, C_Middleware)(dispatch)
