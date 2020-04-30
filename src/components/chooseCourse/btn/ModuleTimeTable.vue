<template>
  <div style="margin-bottom: 10px">

    <el-button type="primary" @click="showWindow('/curricula/future/')" title="未完成的实验">我的实验</el-button>
    <el-button type="success" @click="showWindow('/curricula/all/')" title="所有实验,包括已完成和未完成的实验">历史实验</el-button>
    <!--    用来展示点击结果-->
    <el-collapse-transition>
      <div v-show="show" class="transition-box" style="padding: 10px">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column prop="project.course.course_name" label="课程名" width="180"></el-table-column>
          <el-table-column prop="project.project_name" label="projectName" width="180"></el-table-column>
          <el-table-column prop="project.hours" label="学时"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="location" label="地点"></el-table-column>
          <el-table-column prop="stu_num" label="总人数"></el-table-column>
          <el-table-column prop="cur_num" label="当前人数"></el-table-column>
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
  export default {
    name: "ModuleTimeTable",
    data() {
      return {
        show: false,//是否显示表格
        tableData: [],//用来在表格中显示的数据
        throttleFunc: "",//用来保存截留函数
        buttonKey: 0,//保存当前的按键
        targetUrl: '',//通过按键传入,请求资源的url
      }
    },
    methods: {

      // /**
      //  * 点击按钮,传入目标url 确定当前请求的路径
      //  */
      // changeUrl(targetUrl) {
      //   this.targetUrl = targetUrl
      //   this.showWindow()
      // },

      /**
       * 点击按钮,传入目标url 确定当前请求的路径
       * 在showWindow中展示用户点击按钮后查询到的信息
       */
      showWindow(targetUrl) {
        this.targetUrl = targetUrl
        let currentButtonKey = 10;
        //根据按钮传进来的参数,判断 buttonKey的值
        currentButtonKey = this.targetUrl === "/curricula/future/" ? 1 : 2;
        if (currentButtonKey === this.buttonKey) {
          this.show = !this.show;
        } else {
          this.buttonKey = currentButtonKey
          if (this.throttleFunc() === false) {
            this.buttonKey = -1
            return
          }
          this.show = true
        }
      },

      /**
       * 查询课表
       */
      getTimetable() {
        this.axios({
          method: "post",
          // url: "/choosing/module/my",
          url: this.targetUrl,
          params: {
            userId: localStorage.token
          }
        })
          .then(response => {
            if (typeof response.data === 'object') {
              this.tableData = response.data
              this.show = true
            } else {
              this.util.returnErr.call(this, "失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
    mounted() {
      //初始化节流函数
      //注意:把带参数的函数当成参数传递时,要使用bind
      this.throttleFunc = this.util.throttle.call(this, this.getTimetable.bind(this), 1500)
      // this.throttleFunc = this.util.throttle.call(this, this.showWindow.bind(this), 100)
    }
  }
</script>

<style scoped>

</style>
