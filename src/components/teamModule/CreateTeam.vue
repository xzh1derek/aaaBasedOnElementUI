<template>
  <div>
    <template v-if="buildTeam.length!==0">
    <div style="background-color: #5bc0de;width: 80%">
      <h1 style="display: inline;margin-right: 20px">尚需组队的课程</h1>
    </div>
    <el-table :data="buildTeam" stripe style="width: 80%" v-if="buildTeam">
      <el-table-column prop="course_id" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="course.course_name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="course.credit" label="学分" width="180"></el-table-column>
      <el-table-column prop="course.max_num" label="队伍最大人数" width="180"></el-table-column>
      <el-table-column prop="course.teacher" label="任课老师" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="creatTeam(scope.row)" type="text" size="small">创建队伍</el-button>
        </template>
      </el-table-column>
    </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    name: "CreateTeam",
    data() {
      return {
        buildTeam: null
      }
    },
    methods: {
      //获取课程要求组队,但用户没有组队的课程列表
      toBeCreated(self) {
        self.axios({
          methods: "post",
          url: "/team/myCourse",
          params: {
            userId: localStorage.token
          }
        })
          .then(response => {
            self.buildTeam = response.data
            console.log(self.buildTeam)
          })
          .catch(err => {
            console.log(err)
          })
      },
      creatTeam(row) {//创建队伍
        let checkInfo = confirm(" ❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗\n是否要创建一个队伍?\n创建完成后不可退出");
        let self = this;
        if (checkInfo) {
          this.axios({
            method: "get",
            url: "/team/create",
            params: {
              userId: localStorage.token,
              courseId: row.course_id
            }
          })
            .then((res) => {
              //队伍创建成功
              if (res.data == "0") {
                //查询尚未组队的课程
                this.toBeCreated(self)
                //查询现在现在的队伍
                this.$emit('updateMyTeam');
                this.$message({
                  message: '队伍创建成功!',
                  type: 'successful',
                  duration: 1500,
                  showClose: true
                });
              } else {
                alert("创建队伍失败")
              }
            })
            //解析服务器返回的response,并且做出相应的处理
            .catch(error => {
              console.log("error:" + error)
            })
        }
      },
    },
    mounted() {
      let self = this;
      this.toBeCreated(self)
    }
  }
</script>

<style scoped>

</style>
