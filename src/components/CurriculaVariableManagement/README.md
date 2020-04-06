### 课程管理
* **后端controller:CurriculumOfTeachers**
* **父组件:CurriculaVariableCenter**
* **路由:/variable/**

| url | 参数 | 方法  |效果  |返回值|错误处理 |完成情况|对应组件|
| --- | --- | --- | --- | --- | ---| --- |---|
| /curriculum/module  | teacherId  | get  | 查看某老师下所有未处理的选课信息 |返回module的list,附带学生信息 | none | no |UnauthorizedStuList|
| /curriculum/module/dispose  | moduleId , List userIds  | post  | 批量处理选课 一次可处理多个学生 但只能选择一个module |-- | none | no |UnauthorizedStuList|
| /curriculum/module/reject  | moduleId,userId  | post  |教师拒绝选课  | String预约未成功，详情请咨询老师或重新选课。 | none | no |UnauthorizedStuList|
