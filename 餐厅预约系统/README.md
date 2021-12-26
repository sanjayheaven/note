# 餐厅预约系统（V1）

- 预定信息
  - 预定人，电话，就餐人数，分成人，儿童，性别，
  - 预定日期 预定时间
  - 留言 邮箱
- 店铺提示

- 预定 item 的状态

  - 待出席、缺席、已取消（消费者自己取消，商家取消）已出席

- 可预定设置

  - 时间段类型
  - 设置，时间段
    - 单次预定。最少就餐人数， 最多就餐人数
    - 时间段 总人数上限
  - 时间单位 （15，30，60，75，90）
  - 预定时间点，比如 18:00-18:30 记录 18:00
    - 限制人数，
    - 每一周循环，如同自助餐，如果有具体哪一天改掉，需要保留记录。

- 客户-我的预约（暂无先不做）

  - 所以消费者 不能取消预约

- 我的预约？要不要通过

## 接口

**餐厅**

- 根据日期，选择某一天预约。
- 后台获取预约信息，今天（包含）往后的 10 天 所有预约，
  - 根据日期分组一下，
    - 前端用 右上角 badget 显示当天预约数量
    - 前端先根据类型分，再根据时间点排序
- 更新预约状态，取消，缺席
- 获取预约设置信息
- 更新预约设置信息，时间段设置，其他设置，
  - 其他设置，
    - 店铺提示
  - 时间段设置

**h5**

- 创建预约信息（需要 canteenId）
  - 创建成果发送邮箱
- 获取餐厅信息（暂定）

## 数据表

reserve 预定信息表
reserveSetting 预定设置表 常用设置，

reserveSetting

本来想着 以下去存储信息，可以归为一类，

timeSlots

| 名称              | 类型   | 描述               | 备注                                                        |
| ----------------- | ------ | ------------------ | ----------------------------------------------------------- |
| status            | String | on/off             | 该时间段是否可用，创建默认可用                              |
| type              | String | lunch/dinner       |                                                             |
| accordingDateType | String | week/date          | 默认 week，必须说明周几（day），如果是具体某一天，date 记录 |
| day               | String | 周几               | monday/tuesday/wednesday/thursday/friday/saturday/sunday    |
| date              | Date   | 具体哪一天         |                                                             |
| startTime         | String | 时间段             | 暂定，看看要不要细分 start 和 end                           |
| endTime           | String | 时间段             | 暂定，看看要不要细分 start 和 end                           |
| timeUnit          | String | 时间单位           | 时间段划分最小单位                                          |
| minPax            | Number | 单次最少预定人数   | 默认 1                                                      |
| maxPax            | Number | 单次最多预定人数   |                                                             |
| totalPax          | Number | 时间段人数总上限制 |                                                             |

| 名称      | 类型     | 描述     | 备注                           |
| --------- | -------- | -------- | ------------------------------ |
| canteenId | String   | on/off   | 该时间段是否可用，创建默认可用 |
| alertInfo | String   | 提示信息 |                                |
| timeSlots | [Object] |          |                                |

reserve

| 名称         | 类型   | 描述                                   | 备注                         |
| ------------ | ------ | -------------------------------------- | ---------------------------- |
| status       | String | toBePresent, present,absent，cancelled | 待出席，已出席，缺席，已取消 |
| name         | String | on/off                                 | 是否可用，默认可用           |
| phone        | String | lunch/dinner                           |                              |
| email        | String | lunch/dinner                           |                              |
| timeSlot     | String | lunch/dinner                           | startTime - endTime          |
| adultPax     | Number | 成人人数                               |                              |
| childPax     | Number | 儿童人数                               |                              |
| day          | Date   |                                        |                              |
| time（暂定） | String | 预定的时间                             | 09:00                        |
| remark       | String | 留言/备注                              |                              |
