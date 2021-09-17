# Redux-thunk

this a redux middleware to do async updates by dispatching a action

## Source Code

that's all the source code.

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument)
      }

      return next(action)
    }
}
const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
```

as we can see, thunk return a decaration function that accept two params: dispatch and getState

then if the action is a function , then do it. if not, go on the next dispatch
