<template>
  <div>
    <div id="container">
      <template v-for="module in moduleList">
        <el-card class="box-card" shadow="hover" style="background-color: #f9ffed">
          <div slot="header" class="clearfix">
            <span><b>{{module.project.course.course_name +"　"+module.project.project_name}}</b></span>
          </div>

          <div class="text item">
            {{'时间: ' + module.date+"　"+module.time }}
          </div>

          <div class="text item">
            {{'地点: ' + module.location }}
          </div>


          <div class="text item">
            {{'课程编号: ' + module.project.course.course_code }}
          </div>

          <div class="text item">
            {{'学分: ' + module.project.course.credit }}
          </div>

          <div class="text item">
            {{'学时: ' + module.project.course.hours }}
          </div>


          <div class="text item">
            是否组队: {{ module.project.course.is_team?"是":"否" }}
          </div>

          <div class="text item" v-if="module.project.course.is_team">
            组队最大人数: {{ module.project.course.max_num }}
          </div>


        </el-card>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectedCourses",
    data() {
      return {
        // moduleList: JSON.parse(localStorage.userInfo).userCourses
        moduleList: []
      }
    },
    methods: {
      /**
       * 查询课表
       */
      getTimetable() {
        this.axios({
          method: "post",
          url: "/curricula/future",
          params: {
            userId: localStorage.token
          }
        })
          .then(response => {
            if (typeof response.data === 'object') {
              this.moduleList = response.data
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
      this.getTimetable()
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
    border-bottom: 1px solid #d6eef1;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 300px;
    margin-right: 16px;
    margin-bottom: 15px;

  }

  #container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
  }
</style>
