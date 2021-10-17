# 3.X 问题

这部分是在阅读过程

- 全局作用域 函数作用域 块级作用域 三者区别和联系
- 什么是块级作用域，怎么形成？
  - 好像是 {}
- 预编译过程？
- JS 存在的自动转换是什么
- 浮点数为什么 会出现 0.1 + 0.2 != 0.3

# 语言基础

## 3.1 语法

标识符：变量、函数、属性或函数参数的名称

严格模式, 通常在脚本开头加上一行

```js
"use strict"
```

是一个预处理指令，
也可以放在函数开头

```js
function doSomething() {
  "use strict"
  // 函数体
}
```

## 3.2 关键字与保留字

## 3.3 变量

松散类型：**变量可以用于保存任何类型的数据**  
var const let

**推荐用 const let 新语法，块级作用域**

**var 声明作用域** ,
**实践中不推荐这么做，容易引起作用域混乱，严格模式下抛错**

- 函数内部声明带 var，则为局部作用域
- 函数内部省略 var，则为全局作用域

```js
function test() {
  var message = "hi" // 局部变量
}
test()
```

```js
function test() {
  message = "hi" // 全局变量
}
test()
console.log(message) // "hi"
```

### var 声明提升

也是一个特殊点，不推荐使用 var  
**预编译**的时候会有变量提升，提升到函数顶部  
多次使用 var 声明同一个变量，也没有问题

### let 声明

声明范围是 **块级作用域** 是 **函数作用域**的子集

暂时性死区：
**let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone）**  
所以 混用 var 声明变量的时候，依然可以被提升

**全局作用域**

在全局作用中 用 var 声明，会被赋值在 window 对象下。

```js
var name = "Matt"
console.log(window.name) // 'Matt'
let age = 26
console.log(window.age) // undefined
```

### const 声明

- 必须初始化一个值
- 不能修改
- 其他和 let 一样

### 声明风格及最佳实践

- 不用 var
- const 优先，let 次之

## 3.4 数据类型

**typeof** 操作符查看类型  
返回如下结果

- undefined
- boolean
- string
- number
- object
  - 不能区分，对象，null，array
- function
- symbol

### 简单数据类型

6 种简单类型

- Undefined
  let 声明时候，如果没有初始值，会默认初始化 值为 undefined
- Null
  - 是，**空对象的引用** 所以 typeof Null === 'object'
- Boolean

  - | 数据类型  |   转换为 true 的值   | 转换为 false 的值 |
    | :-------: | :------------------: | :---------------: |
    | Boonlean  |         true         |       false       |
    |  String   |   true 非空字符串    |        ''         |
    |  Number   |         非 0         |         0         |
    |  Object   | 任意不为 null 的对象 |       null        |
    | Undefined |                      |       false       |

- Number
  - 八进制表示，可以用 类似 070 代表 56（十进制） **不推荐**
  - 十六进制表示，可以用 类似 0x70 代表 112（十进制） **不推荐**
  - 3.125e7 等于 31250000
  - 浮点数
- String
- Symbol
