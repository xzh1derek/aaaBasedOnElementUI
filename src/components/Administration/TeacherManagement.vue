<template>
  <div id="teacherContainer">
    <template v-for="teacher in teachers">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{teacher.name}}</span>
          <TeacherOperation :teacher-id="teacher.id" @freshList="getTeacher"></TeacherOperation>
        </div>
        <div :key="teacher.username" class="text item">
          {{'账号: ' + teacher.username }}

        </div>
        <div :key="teacher.identity" class="text item">
          {{'身份: ' + teacher.identity }}
        </div>

      </el-card>
    </template>


  </div>
</template>

<script>
  import TeacherOperation from "./TeacherOperation";

  export default {
    name: "TeacherManagement",
    data() {
      return {
        teachers: []
      }
    },
    components:{TeacherOperation},

    methods: {
      getTeacher() {
        this.axios({
          method: "get",
          url: "/teachers/",
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.teachers = response.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted(){
      this.getTeacher()
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
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
    width: 30%;
    min-width: 185px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  #teacherContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;

  }
</style>
