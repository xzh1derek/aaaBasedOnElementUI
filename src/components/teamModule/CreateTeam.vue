<!--显示当前还需要组队的课程信息-->
<template>
  <div>
    <el-table :data="buildTeam" height="247" stripe style="width: 100%">
      <el-table-column prop="course.course_name" label="课程名称"></el-table-column>
      <el-table-column prop="course.credit" label="学分" width="250"></el-table-column>
      <el-table-column prop="course.max_num" label="队伍最大人数" width="250"></el-table-column>
      <el-table-column prop="course.teacher" label="任课老师" width="280"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click.native.prevent="creatTeam(scope.row)" type="text" size="small">创建队伍</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex"

  export default {
    name: "CreateTeam",
    data() {
      return {
        buildTeam: [],
        dialogVisible: false,//控制是否显示对话框
        input: "",//保存队长学号
      }
    },
    computed: {
      ...mapState(["readyForRenovate"])
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
        let checkInfo = confirm(" ❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗\n" +
          "是否要创建一个队伍?\n" +
          "创建完成后不可退出");
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
                //改变 Vuex 中 readyForRenovate 的值 myList监听刷新列表
                let payload = {
                  targetKey: "readyForRenovate",
                  targetVal: !this.readyForRenovate
                };
                this.updateCurrentStatus(payload)

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
      ...mapMutations(["updateCurrentStatus"])
    },
    mounted() {

      this.toBeCreated(this)
    }
  }
</script>

<style scoped>

</style>
