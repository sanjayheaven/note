# React

This is a note to read [React(V17.0.4)](https://github.com/facebook/react/tree/main/packages/react) source code.

## APIs

From [React.js](https://github.com/facebook/react/blob/main/packages/react/src/React.js)

### Chilldren

An Object to offer funcitons that help to deal with **props.children**

- map
  - The provided function for MAP && FOREACH will be called for each leaf child.
- forEach
  - The provided function for MAP && FOREACH will be called for each leaf child.
- count
  - Count the number of all children
- toArray
  - return an array with appropriately re-keyed children
- only
  - Verifies that there is only one child in the collection

### createMutableSource

Question: how to understance Immutable?

### createRef

create an immutable object with a single mutable value for the React element，

### Component

Component is a function to offer properties such as props & context & refs & updaters

Also, the instance of Component has **setState** & **forceUpdate**

### PureComponent

- What is PureComponent? What is the difference from Component

PureComponent is Convience Component with default shallow equality for shouldComponentUpdate

### createContext

To create Context that offers Provider & Consumer property

### forwardRef

### lazy

Handle dynamically imported components

return a thenabel object (Promise)

### memo

memo is a HOC, offers a compare function that only check PROPS

### useCallback

### useContext

### useEffect

action like componentDidMount & componentDidUpdate

Fiber Object, add UpdateEffect | PassiveEffect tag
Hook Object, add UnmountPassive | MountPassive tag

### useImperativeHandle

### useDebugValue

### useLayoutEffect

Fiber Obejct, add UpdateEffect tag
Hook Obejct, add UnmountMutation | MountLayout tag

### useMemo

### useMutableSource

### useSyncExternalStore

### useReducer

### useRef

### useState

a special case of useReducer

- act as unstable_act,
- Children,
- Component,
- Fragment,
- Profiler,
- PureComponent,
- StrictMode,
- Suspense,
- SuspenseList,
- cloneElement,
- createContext,
- createElement,
- createFactory,
- createMutableSource,
- createRef,
- forwardRef,
- isValidElement,
- lazy,
- memo,
- startTransition,
- unstable_Cache,
- unstable_DebugTracingMode,
- unstable_LegacyHidden,
- unstable_Offscreen,
- unstable_Scope,
- unstable_getCacheForType,
- unstable_useCacheRefresh,
- unstable_useOpaqueIdentifier,
- useCallback,
- useContext,
- useDebugValue,
- useDeferredValue,
- useEffect,
- useImperativeHandle,
- useLayoutEffect,
- useMemo,
- useMutableSource,
- useSyncExternalStore,
- useSyncExternalStore as unstable_useSyncExternalStore,
- useReducer,
- useRef,
- useState,
- useTransition,
- version,

```

```
