# history 和 hash 的区别

## hash

URL：http://www.abc.com/#/hello
其中 hash 值是：#/hello

hash 值不会被包括在请求中，因此改变 hash 值，刷新页面不影响

## History

URL：http://www.abc.com/hello

- 很明显,感观上有没有#号 这是区别
- 改变 hash 值，刷新页面不影响

参考 [HTML5 History Interface]()

## 参考资料

[hash 与 history 的区别](https://zhuanlan.zhihu.com/p/364019280)
