<template>
  <div>

    <!--    显示当前需要组队的课程信息-->
    <CreateTeam @updateMyTeam="getMyTeam"></CreateTeam>


    <template v-for="(team,index) in myTeamMember" style="margin-bottom: 100px">
      <div id="outer" style="background-color: #fafafa;width: 100%;border: 1px solid grey;border-radius: 10px">
        <div id="left">
          <el-row>
            <el-col :span="12">
              <div class="grid-content "><span
                style="font-weight: bold;font-size: 30px">{{team.course.course_name}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-switch
                  v-model="team.display.toString()"
                  active-text="展示队伍"
                  inactive-text="隐藏队伍"
                  active-value="true"
                  inactive-value="false"
                  @change="showTeam">
                </el-switch>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content ">队伍编号:{{team.id}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ">
                <el-switch
                  v-model="team.available.toString()"
                  active-text="接受申请"
                  inactive-text="拒绝申请"
                  active-value="true"
                  inactive-value="false"
                  @change="teamAvailable">
                </el-switch>
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="right">
          <el-input
            placeholder="请输入被邀学号"
            v-model="input"
            clearable
            style="margin-bottom: 10px">
          </el-input>
          <el-button round type="primary" @click=invite(team.id)>邀请</el-button>
        </div>
      </div>


      <el-table :key="index" :data="team.memberDetails" stripe style="width: 100%">
        <el-table-column prop="name" label="组员姓名" width="180"></el-table-column>
        <el-table-column prop="username" label="学号" width="180"></el-table-column>
        <el-table-column prop="qq" label="qq"></el-table-column>
        <el-table-column prop="school" label="学院"></el-table-column>

      </el-table>
    </template>


  </div>
</template>

<script>
  import {mapState} from "vuex"
  import CreateTeam from "./CreateTeam";

  export default {
    name: "my-team",
    components: {CreateTeam},
    data() {
      return {
        myTeamMember: [],
        show: "true",
        available: "true",
        input: ""//与输入邀请人学号的输入框绑定
      }
    },
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      getMyTeam() {
        let self = this;
        self.axios({
          url: '/team',
          params: {
            userId: localStorage.token
          }
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            if (res.data.length == 0) {
              console.log(self.myTeamMember)
              return
            }
            self.myTeamMember = res.data//这里要改

            console.log(self.myTeamMember)
            // self.myTeamMember = res.data.memberDetails//这里要改
          })
          .catch(error => {
            self.$message({
              message: "信息加载失败,请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      },
      showTeam(data) {//是否展示队伍
        // this.axios({
        //   method: "post",
        //   url: "/team/setDisplay",
        //   params: {
        //     teamId: this.userInfoProp.teamleader,
        //     status: data
        //   }
        // })
        //   .then((response) => {
        //
        //   })
        //   //解析服务器返回的response,并且做出相应的处理
        //   .catch(error => {
        //     console.log("error:" + error)
        //   })
      },
      teamAvailable(data) {
        this.axios({
          method: "post",
          url: "/team/setAvailable",
          params: {
            leader: this.userInfoProp.teamleader,
            status: data
          }
        })
          .then((response) => {
          })
          //解析服务器返回的response,并且做出相应的处理
          .catch(error => {
            console.log("error:" + error)
          })
      },
      invite(teamId) {
        this.axios({
          method: "post",
          url: "/team/invite",
          params: {
            teamId: teamId,
            receiver: this.input
          }
        })
          .then((response) => {
            let self = this
            this.util.feedbackInfo(self, response.data)
          })
          //解析服务器返回的response,并且做出相应的处理
          .catch(error => {
            this.$message({
              message: '请输入学号!',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          })
      },

    },
    mounted() {
      this.getMyTeam()
    }
  }
</script>

<style scoped>
  #outer {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  #left {
    flex: 5;
  }

  #right {
    flex: 2;
    border: 1px solid grey;
  }

  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
