# 日常笔记

## mongodb数据库

**关于表设计**
> 数据库禁止删除数据，一般用来改状态
- 例外： 当表中数据非常多的时候，不具有可参考性，例如议价表中，canteen-sku-price-product 毫无价值的，只作为记录，可以删除
> 多表关联时候 注意查询方向的一致性
- 举例： 产品-二级分类-一级分类-仓库 需要在子表中存储父表的_id, 通过_id 逐级查询
> 注意静态表的资源必须固定写死，比如订单记录，配单记录。

> 多表关联的时候 根据业务 确定是否需要双向关联 和 只要单向关联 
- 获取某产品信息，必须要获取该产品分类信息，product指向category表 就需要一个father字段来快速查询 
- 获取分类信息的时候，不需要获取分类底下的产品信息，children字段就显得没必要

> 牢记不要太多层，比如数组就数组，数组项是对象，那就是对象不要嵌套太多   

在CNHistory中，原来设计的是 
```js
CNHistory:[
    {
        date:Date,
        CNS:[]
    }
],
```
怎么更新CNs 都save不了，也不是状态码204的问题

**关于查询条件**
> 按照某一时间范围内查询
```js
dateStart =  dateStart && new Date(dateStart).toISOString()
dateEnd = dateEnd && new Date(new Date(dateEnd).getTime()+24*60*60*1000).toISOString()
filters = dateStart && dateEnd && (filters = { ...filters,createTime:{$gte: new Date(dateStart),$lte: new Date(dateEnd)} } ) || filters
```

## Vue2.x

**关于多组件通信**
> 父子组件的通信是单向的 注意不要在子组件轻易修改props，除非确定父组件传的值不会再修改

**关于页面优化**
> 多使用v-if 阻断不必要的渲染

**关于组件传递**
父组件向子组件传递信息，props
子组件向父组件传递信息 emit
父组件怎么触发子组件的方法。


