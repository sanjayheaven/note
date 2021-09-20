# ReactElement

## RESERVED_PROPS

Special handling of key and ref

```js
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
}
console.error(
  "%s: `key` is not a prop. Trying to access it will result " +
    "in `undefined` being returned. If you need to access the same " +
    "value within the child component, you should pass it as a different " +
    "prop. (https://reactjs.org/link/special-props)"
)
```

## getter.isReactWarning

## 可以理解下 原型链中 函数的关系

```js
let a = function (b, c) {
  return b + c
}
a.d = 1
```

## ReactElement

- '$$typeof' to check if a React Element
- Object.freeze(element.props);
- Object.freeze(element);

## createElement

## createFactory

create a kind type of element, using createElement

(typt,props,children){}  
Children can be more than one argument

##

## \_store ?

## defaultProps

## jsx jsxDEV
