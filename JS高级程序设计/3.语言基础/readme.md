# 3.X 问题

这部分是在阅读过程

- 全局作用域 函数作用域 块级作用域 三者区别和联系
- 什么是块级作用域，怎么形成？
  - 好像是 {}
- 预编译过程？
- JS 存在的自动转换是什么
- 浮点数为什么 会出现 0.1 + 0.2 != 0.3

## 这段没看懂

> 因为符号属性是对内存中符号的一个引用，所以直接创建并用作属性的符号不会丢失。但是，如果
> 没有显式地保存对这些属性的引用，那么必须遍历对象的所有符号属性才能找到相应的属性键：
> let o = {
> [Symbol('foo')]: 'foo val',
> [Symbol('bar')]: 'bar val'
> };
> console.log(o);
> // {Symbol(foo): "foo val", Symbol(bar): "bar val"}
> let barSymbol = Object.getOwnPropertySymbols(o)
> .find((symbol) => symbol.toString().match(/bar/));
> console.log(barSymbol);
> // Symbol(bar)

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

**Undefined Null Boonlean Number String Symbol**

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
  - **0.1+0.2!==0.3** 问题
    - IEEE754 数值，
  - 最小值：Number.MIN_VALUE ：5e-324 ， -Infinity 负无穷
  - 最大值：Number.MAX_VALUE ：1.7976931348623157e+308 Infinity 正无穷
  - 判断值 是否有限， 采用 **isFinite**
  - NaN
    - NaN == NaN 输出 false
    - **isNan** 判断是否 是 NaN
    - 注： isNaN 可以测试对象。先调用 **valueOf**, 如果不能，继续调用 **toString**
  - 数值转换
    - parseInt, parseFloat,Number
      - parseInt 能识别 '1234blue' 为 1234， 第二个参数为 进制，默认为 10
      - parseFloat 只识别 **十进制**
  - Number 转换
    - | 数据类型  |                                转换结果                                 |
      | :-------: | :---------------------------------------------------------------------: |
      | Boonlean  |                          true 为 1 false 为 0                           |
      |  Number   |                                 Number                                  |
      |   Null    |                                    0                                    |
      | Undefined |                                   NaN                                   |
      |  String   | 数值字符等同 Number, 空'' 为 0， 如果是进制数，相应为进制数，其他为 NaN |
      |  Object   |                       valueOf, toString, 依次调用                       |

- String
  - **let "JavaScript" = "Java" + "Scrip" 过程**
    - 整个过程首先会分配一个足够容纳 10 个字符的空间，然后填充上"Java"和"Script"。
    - 最后销毁原始的字符串"Java"和字符串"Script"，
  - 字符串化
    - String, toSting()
    - String(null) === 'null', String(undefined) === 'undefined'
    - toString 接受数字,表示进制
    - 模板字符串 **``** 保留换行
      - 插值 ${}
    - **模板字面量标签函数**
    - 过于非常规
  - 原始字符串
    - String.raw 针对 转义字符，获取字符串原始内容

```js
将表达式转换为字符串时会调用 toString()：
let foo = { toString: () => 'World' };
console.log(`Hello, ${ foo }!`); // Hello, World!
```

- Symbol
  - 符号，是原始值，唯一不可变
  - 需要用 Symbol 初始化
  - type Symbol() == 'symbol'
  - **Symbol is not a constructor**， 所以不能用 new 构造对象
  - Symbol.for() 注册 **全局符号表** ， 第一次使用，如果不在，创建，第二次，直接调用
  - **for-of 循环会在相关对象上使用 Symbol.iterator 属性**
  - 内置符号
    - **asyncIterator**
      - 一个方法，该方法返回对象默认的 AsyncIterator。 由 for-await-of 语句使用
    - **hasInstance**
      - 一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。由 instanceof 操作符使用
    - **isConcatSpreadable**
      - 一个布尔值，如果是 true，则意味着对象应该用 Array.prototype.concat()打平其数组元素
    - **iterator**
      - 一个方法，该方法返回对象默认的迭代器。由 for-of 语句使用
    - **match**
      - 一个正则表达式方法，该方法用正则表达式去匹配字符串。由 String.prototype.match()方法使用
    - **replace**
      - 一个正则表达式方法，该方法替换一个字符串中匹配的子串。由 String.prototype.replace()方法使用
    - **search**
      - 一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由 String.prototype.search()方法使用
    - **species**
      - 一个函数值，该函数作为创建派生对象的构造函数
    - **split**
      - 一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由 String.prototype.split()方法使用
    - **toPrimitive**
      - 一个方法，该方法将对象转换为相应的原始值。由 ToPrimitive 抽象操作使用
    - **toStringTag**
      - 一个字符串，该字符串用于创建对象的默认字符串描述。由内置方法 Object.prototype.toString()使用
    - **unscopables**
      - 一个对象，该对象所有的以及继承的属性，都会从关联对象的 with 环境绑定中排除

```js
// 创建全局符号
let s = Symbol.for("foo")
console.log(Symbol.keyFor(s)) // foo
// 创建普通符号
let s2 = Symbol("bar")
console.log(Symbol.keyFor(s2)) // undefined
```

```js
let s1 = Symbol("foo"),
  s2 = Symbol("bar")
let o = {
  [s1]: "foo val",
  [s2]: "bar val",
  baz: "baz val",
  qux: "qux val",
}
console.log(Object.getOwnPropertySymbols(o))
// [Symbol(foo), Symbol(bar)]
console.log(Object.getOwnPropertyNames(o))
// ["baz", "qux"]
console.log(Object.getOwnPropertyDescriptors(o))
// {baz: {...}, qux: {...}, Symbol(foo): {...}, Symbol(bar): {...}}
console.log(Reflect.ownKeys(o))
// ["baz", "qux", Symbol(foo), Symbol(bar)]
```

- Object 类型

**每个 Object 实例都有如下属性和方法。**

```js
let obj = {
  constructor:function,
  hasOwnProperty(propertyName),
  isPrototypeOf(object), // 是否是其他对象的原型
  propertyIsEnumerable(propertyName) // 属性是否可使用
  toLocaleString(), // 本地字符串表示
  toString(), // 字符串表示
  valueOf(),//  返回对象对应的字符串、数值或布尔值表示
}
```

## 3.5 操作符

**操作规则**

- 对于字符串，如果是有效的数值形式，则转换为数值再应用改变。变量类型从字符串变成数值。
- 对于字符串，如果不是有效的数值形式，则将变量的值设置为 NaN 。变量类型从字符串变成数值。
- 对于布尔值，如果是 false，则转换为 0 再应用改变。变量类型从布尔值变成数值。
- 对于布尔值，如果是 true，则转换为 1 再应用改变。变量类型从布尔值变成数值。
- 对于浮点值，加 1 或减 1。
- 如果是对象，调用 valueOf()到的值应用上述规则。如果是 NaN，则调用 toString()并再次应用其他规则。变量类型从对象变成数值

- 一元操作符号

  - ++a --a 前缀递增递减 等同于 a+=1 a-=1
  - a++ a-- 后缀递增递减 **在语句被求值后才发生**

- 一元 +/- 加减操作符
- **位操作符**
  - 重新回顾了 计算机基础
