# React Router

[Home Page](https://reactrouter.com/web/guides/quick-start)

## how to use

```js
<Router>
  <Link to="/1">跳转1</Link>
  <Link to="/2">跳转2</Link>
  <Link to="/3">跳转3</Link>

  <Switch>
    <Route path="/1">路由匹配组件1</Route>
  </Switch>
  <Switch>
    <Route path="/2">路由匹配组件2</Route>
  </Switch>
  <Switch>
    <Route path="/3">路由匹配组件3</Route>
  </Switch>
</Router>
```

## hooks

### useHistory

gives access to the history instance.

```js
let history = useHistory()
```

常用属性：

- push 入栈跳转
- location 当前路由信息

### useHistory

```js
let location = useLocation()
```

常用属性：

- pathname 路径地址

### useParams

```js
let { id } = useParams()
```

常用于动态路由
例如

```js
<Route path="/order/:id" />
```

### useRouteMatch

暂定，还未使用

## BrowerserRouter
