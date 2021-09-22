# ReactForwardRef

## forwardRef

a solution for HOC to forward tRef

accept a function with two arguments （props,ref）

## 为什么 ref 不能是字符串

可能：事实上， ref 并不是一个 prop，和 key 一样，它由 React 专门处理

## Why cant receive a memo?

> Instead of forwardRef(memo(...)), use ' +
> 'memo(forwardRef(...)).',

## funtion .length = arguments.length
