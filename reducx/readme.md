# Redux

well Redux can be introduced by three parts.

## Store

## Action

Action is what we want to do,for example, we want to add the quantity

- Action is an Object which has a required key: **type**

## Reducer

Reducer is that does the States Update according the action,

- Reducer is a function that uses two arguments, (state,action)=>{ return newState}

Always we use a reducer to manage all reducers.

That is

```js
export const Reducers = (state = {}, action) => {
  return {
    reducer1: reducer1(state.state1, action),
    reducer2: reducer2(state.state2, action),
  }
}
```

## Immutability

One Way Data Flow

![one-way-data-flow](./images/one-way-data-flow.png)

Redux Date Flow Diagram

![ReduxDataFlowDiagram](./images/ReduxDataFlowDiagram.gif)

Redux expects that all state updates are done immutably

## Redux Toolkit

Using Immer inside

### createSlice

- An easier way to write immutable updates

- The action object will have our new post entry as the action.payload

## Deal With Async
