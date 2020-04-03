## choose course
* #### 实验预约
#### 包裹组件:BookingExperiment
| url | 参数 |方法  |效果  |返回值|错误处理 |完成情况|对应组件|
| --- | --- | --- | --- | --- | ---| --- |---|
| /choosing/course          | none               | get   | 查询所有可选课程                                                             |返回一个list,存储所有可选课程 |none | no |CourseCanBeSelected|
| /choosing/project         | userId , courseId  | post  | 返回课程下所有待选project 标明已选或者未选 事务回滚|返回当前课程下的projectList      | 1. 你没有该课程计划 2. 该课程你还未组队，请尽快组队 3.你不是队长，无权操作 |no |ProjectsOfCourse|
| /choosing/module/all      | userId , projectId | post  | 如果还没有选择上一步的project,则进入选课界面 |返回当前project下的moduleList        | 1. 已选过,不能进入 |no |ModuleInfo|
| /choosing/module/choose   | userId , moduleId  | post  | 选择某个批次                                                                | 0--成功 | 1.人数已满,无法选择 2. 已预约,无法重复选择  |no |ModuleInfo|
| /choosing/module/my       | userId , projectId | post  | 如果project已选,则查看选课信息 | 未选时,返回"n",已选时返回module实体+是否已处理字段  | 1.人数已满,无法选择 2. 已预约,无法重复选择  |no |ModuleInfo|


* #### 我的课表
| url | 参数 |方法  |效果  |返回值|错误处理 |完成情况|对应组件|
| --- | --- | --- | --- | --- | ---| --- | ---|
| /curricula/all  | userId  | get  | 查询某个学生的所有module,按时间排序  |返回一个list,存储所有module信息 | none | no |ModuleTimeTable|
| /curricula/future  | userId  | get  | 查询某个学生的所有module,只显示当前日期之后的记录 |返回一个list,存储所有module信息 | none | no |ModuleTimeTable|

