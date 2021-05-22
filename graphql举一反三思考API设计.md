# 由 GraphQL 来思考 API Design

最近一直在用,由于 GraphQL 的思维变革太多,项目总是不能全面的应用.  
但是一想到 GraphQL 本质上只是一种思想,突发奇想就看看能不能应用到现有的 API 设计上.  
一搜索,果然有人做过类似的,  
[由 GraphQL 来思考 API Design](https://shanyue.tech/post/api-design-inspire-by-graphql.html).

大多时候接触的还是个人项目开发,或者全栈项目,用 node 写后端.  
所以很多时候,为了求快,会从需求上来写 api,这就导致了很多请求到最后,service 会有很多重复.  
另外,如果这个时候,后端的 api 还按照 Restful Api 的范式设计.
那绝对不是前后端分离,那是硬生生一个人去做两个人的工作.

# 按需加载资源

在 GraphQL 中,如果按需加载某部分资源,只需要提供相关字段就可以.  
例如:

```graphql
query User {
  name
  phone
}
```

当我们发出这样的请求之后, GraphQL Server 就会解析字段, 在数据库层面或者说在数据源层面也会对字段按需加载.  
但是如果这样的话,就相当于前端直接控制数据库了...

所以这也是为什么我认为 GraphQL 难以火起来的原因之一, 很多时候我们的后端或者数据库部分就是成型的,而且难以撼动.  
现在要求接手前端变量来服务,那会累死,拖垮整个团队.

当我们解析程度划分到模块位置,而不是具体的字段,这样可以有效解决 service 太重,重复利用率不高,以及可以将多资源请求合并.

所以最终实现,我们的 API 都是按照页面来发起请求,

我们 server 项目结构也将变成

- routes
  - home
  - setting(用户信息)
- controllers
  - home
  - setting(用户信息)
- services
  - user
  - order
  - product

可以看得出, Controllers 紧跟 Routes, 将尽可能一个页面发起一个请求..  
等页面多了,也会有差不多有包含关系的内容,
通常我们的页面都是一块一块的, 比如首页,我们有
