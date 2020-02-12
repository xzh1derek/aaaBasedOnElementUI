<template>
  <div>
    <div id="container" >
      <template v-for="course in courseList">
        <el-card class="box-card" shadow="hover" style="background-color: #f9ffed" >
          <div slot="header" class="clearfix">
            <span><b>{{course.course.course_name}}</b></span>
          </div>
          <div class="text item">
            {{'课程编号: ' + course.course.course_code }}
          </div>

          <div class="text item">
            {{'学分: ' + course.course.credit }}
          </div>

          <div class="text item">
            {{'学时: ' + course.course.hours }}
          </div>

          <div class="text item">
            是否组队: {{ course.course.is_team?"是":"否" }}
          </div>

          <div class="text item" v-if="course.course.is_team">
            组队最大人数: {{ course.course.max_num }}
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
        courseList: JSON.parse(localStorage.userInfo).userCourses
      }
    },
    mounted() {
      console.log(this.courseList)
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
