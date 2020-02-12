<!--显示当前还需要组队的课程信息-->


<template>
  <div>
    <el-table :data="buildTeam" height="247" stripe style="width: 100%" size="mini" >
      <el-table-column prop="course.course_name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="course.credit" label="学分" width="100"></el-table-column>
      <el-table-column prop="course.max_num" label="队伍最大人数" width="150"></el-table-column>
      <el-table-column prop="course.teacher" label="任课老师" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
<!--          <el-button @click="dialogVisible=true" type="text" size="small">申请加入</el-button>-->
          <el-button @click.native.prevent="creatTeam(scope.row)" type="text" size="small">创建队伍</el-button>
        </template>
      </el-table-column>
    </el-table>


<!--    <el-dialog-->
<!--      title="请输入队长学号:"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%">-->
<!--      <el-input v-model="input"></el-input>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="sendApplication">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
  export default {
    name: "CreateTeam",
    data() {
      return {
        buildTeam: [],
        dialogVisible: false,//控制是否显示对话框
        input:"",//保存队长学号
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
            method: "post",
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

      // sendApplication() {//发送申请加入请求,这里有问题!!!!!!!!!!!!!!!!!!
      //   this.axios({
      //     method: "post",
      //     url: "/apply",
      //     params: {
      //       teamId: this.input, //队伍编号
      //       sender: localStorage.token//申请人
      //     }
      //   })
      //     .then((response) => {//判断res的结果,给用户相应的反馈
      //      this.util.feedbackInfo(this,response.data)
      //     })
      //     //解析服务器返回的response,并且做出相应的处理
      //     .catch(error => {
      //       this.$message({
      //         message: '操作失败!,请稍后再试',
      //         type: 'error',
      //         duration: 1500,
      //         showClose: true
      //       });
      //     })
      // }
    },
    mounted() {

      this.toBeCreated(this)
    }
  }
</script>

<style scoped>

</style>
