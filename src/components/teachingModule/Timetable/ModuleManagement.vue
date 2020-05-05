<!--保存所有由登录教师发布的Module-->
<template>
  <div>
    <el-table :data="moduleList" style="width: 100%" height="80vh" stripe="true">
      <el-table-column prop="project.course.course_name" label="课程名" width="180"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="project.project_name" label="projectName" width="180"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="project.hours" label="学时"></el-table-column>
      <el-table-column prop="project.course.credit" label="学分"></el-table-column>
      <el-table-column prop="date" label="日期" width="180px"></el-table-column>
      <el-table-column prop="time" label="时间" width="180px"></el-table-column>
      <el-table-column prop="location" label="地点" width="180px"></el-table-column>
      <el-table-column prop="stu_num" label="总人数"></el-table-column>
      <el-table-column prop="cur_num" label="当前人数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot="header" slot-scope="scope">
          <el-switch v-model="switch1" active-text="仅显示未完成" title="点击切换所有Module（包括已经过期的Module）和未完成的Module"></el-switch>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showStuList(scope.row)">已选课名单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <StuListOfModule @initModuleId="initModuleId" :time-for-class="timeForClass" :date="date" :module-id="targetModule"
                     v-if="targetModule!==-1"></StuListOfModule>
  </div>
</template>

<script>
  import StuListOfModule from "./StuListOfModule";

  export default {
    name: "ModuleManagement",
    data() {
      return {
        moduleList: [],//保存module信息
        targetModule: -1,//传递给StuListOfModule的moduleId,为-1时,就不加载组件
        switch1: true,//判断是否加载全部课程信息
        timeForClass: "",//用于传给导出成excel按键的数据
        date: "",//用于传给导出成excel按键的数据
      }
    },
    components: {StuListOfModule},
    methods: {
      /**
       * 查询名下的所有module
       * @param checkCode 为 1的时候查询现有,为2的时候查询全部
       */
      getMyModule(checkCode) {
        let url = checkCode === 1 ? "/curriculum/future/" : "/curriculum/all/"
        this.axios({
          method: "get",
          url: url,
          params: {
            teacherId: 1
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.moduleList = response.data
            } else {
              this.util.returnErr.bind(this, response.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      /**
       *
       * @param row
       */
      showStuList(row) {
        this.targetModule = row.id
        this.timeForClass = row.time
        this.date = row.date
      },
      initModuleId() {
        this.targetModule = -2
      }
    },
    watch: {
      switch1(val) {
        if (val) {
          this.getMyModule(1)//switch为真时,显示未完成的module
        } else {
          this.getMyModule(2)//switch为真时,显示全部的module
        }
      }
    },
    mounted() {
      this.getMyModule(1)
    }
  }
</script>

<style scoped>

</style>
