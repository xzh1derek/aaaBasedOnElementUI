### 教师课表
* **后端controller:CurriculumOfTeachers**
* **父组件:MyTimetable**

| url | 参数 | 方法  |效果  |返回值|错误处理 |完成情况|对应组件|
| --- | --- | --- | --- | --- | ---| --- |---|
| /curriculum/all  | teacherID  | get  | 查询某个老师下所有项目下的所有已发布批次的课表，按时间顺序 |返回一个list,存储所有小课信息  | none | no |ModuleManagement|
| /curriculum/future  | teacherID  | get  | 查询某个老师下所有项目下的所有已发布批次的课表，只显示当前日期之后的所有记录 |返回一个list,存储所有module信息 | none | no |ModuleManagement|
| /curriculum/students  | moduleId  | get  | 查询选了（或排了）某个批次的所有学生名单 |返回一个list,存储所有学生信息 | none | no |StuListOfModule|
