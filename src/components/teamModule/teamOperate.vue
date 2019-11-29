<template>
  <div>
    <el-input
      placeholder="请输入被邀学号"
      v-model="input"
      clearable
      v-if="this.userInfoProp.leader"
      style="margin-bottom: 10px">
    </el-input>

    <el-input
      placeholder="请输入队长学号"
      v-model="input"
      clearable
      v-if="!this.userInfoProp.teamleader"
      style="margin-bottom: 10px">
    </el-input>
    <!--是队长才显示-->
    <el-button round type="primary" @click="invite" v-if="this.userInfoProp.leader">邀请</el-button>
    <!--    未组队才显示-->
    <template v-if="!this.userInfoProp.teamleader">
      <el-button round type="primary" @click="searchTeam">搜索队伍</el-button>
      <el-button round type="primary" @click="creatTeam">创建队伍</el-button>
    </template>

    <el-dialog title="是否申请加入队伍" :visible.sync="dialogVisible" width="40%">
      <div>
        <el-table :data="dialogInfo" style="width: 100%">
          <el-table-column prop="user.name" label="队长" width="100"></el-table-column>
          <el-table-column prop="user.qq" label="qq" width="150"></el-table-column>
          <el-table-column prop="current_num" label="当前人数" width="100"></el-table-column>
          <el-table-column prop="user.school" label="队长学院" width="180"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendApply">确 定</el-button>
      </span>
    </el-dialog>

    <br>
    <el-badge value="1" class="item" v-if="!this.userInfoProp.teamleader&&this.userInfoProp.invitation_id">
      <el-popover
        placement="bottom"
        width="200"
        v-model="inviteDia"
        size="small">
        <p>
          队长: <span style="font-weight: bold">{{userInfoProp.invitation_id}}</span> 邀请你加入他的队伍
        </p>
        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="answerInvite($event)" value="0">拒绝</el-button>
          <el-button type="primary" size="mini" @click="answerInvite($event)" value="1">同意</el-button>
        </div>
        <el-button slot="reference">邀请信息</el-button>
      </el-popover>
    </el-badge>

<!--    尚未组队,而且有过申请-->
    <el-badge value="1" class="item" v-if="!this.userInfoProp.teamleader&&this.userInfoProp.applicationStatus">
      <el-popover
        placement="bottom"
        width="200"
        v-model="applyDia"
        size="small">
        <p>
          我的申请状态: <span style="font-weight: bold">{{this.userInfoProp.applicationStatus==0?"未处理":this.userInfoProp.applicationStatus}}</span>
        </p>
        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="withdrawApply" value="1" v-if="this.userInfoProp.applicationStatus==0">撤回申请</el-button>
        </div>
        <el-button slot="reference">我的申请</el-button>
      </el-popover>
    </el-badge>

    <template v-if="this.userInfoProp.leader">
      <el-divider></el-divider>
      <el-switch
        v-model="show"
        active-text="展示队伍"
        inactive-text="隐藏队伍"
        active-value="1"
        inactive-value="0"
        @change="showTeam">
      </el-switch>
      <el-divider></el-divider>
      <el-switch
        v-model="available"
        active-text="接受申请"
        inactive-text="拒绝申请"
        active-value="1"
        inactive-value="0"
        @change="teamAvailable">
      </el-switch>
    </template>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'


  export default {
    name: "teamOperate",
    props: ['userInfoProp'],
    data() {
      return {
        input: "",
        show: "",
        available: "",
        dialogVisible: false,
        dialogInfo: [{
          username: "",
          leader: "",
          school: "",
          qq: "",
          current_num: ""
        }],
        // searchRes: {
        //   msg: "",
        //   type: ""
        // },
        // inviteRes: {
        //   msg: "",
        //   type: ""
        // },
        // applyRes: {
        //   msg: "",
        //   type: ""
        // },
        inviteDia: false,
        applyDia: false,
      }
    },
    computed: {
      ...mapState(["userInfoData"])
    },
    methods: {
      invite() {
        this.axios({
          method: "post",
          url: "/invite",
          params: {
            sender: this.userInfoProp.username,
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
      creatTeam() {//创建队伍
        let checkInfo = confirm(" ❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗\n是否要创建一个队伍?\n创建完成后不可退出");
        if (checkInfo) {
          this.axios({
            method: "post",
            url: "team/create",
            params: {
              leader: this.userInfoProp.username
            }
          })
            .then((res) => {
              if (res.data == "0") {//队伍创建成功
                this.beingLeader();
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
      searchTeam() {//搜索队伍
        this.axios({
          method: "get",
          url: "/search",
          params: {
            leader: this.input
          }
        })
          .then((res) => {//把拿到的数据显示在teamList中
            if (res.data !== "") {//如果有搜索到队伍
              console.log(res)
              this.dialogInfo = res.data;
              this.dialogVisible = true;
            } else {
              this.$message({
                message: '无记录',
                type: 'warning',
                duration: 1500,
                showClose: true
              })
            }
          })
          .catch(error => {
            console.log("error:" + error)
          })
      },
      showTeam(data) {//是否展示队伍
        this.axios({
          method: "post",
          url: "/team/setDisplay",
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
      sendApply() {
        // if (!this.userInfoProp.teamleader) {
        this.axios({
          method: "post",
          url: "/apply",
          params: {
            receiver: this.dialogInfo[0].leader, //队长,在生成dom时,顺便把队长学号加到a标签的id上
            sender: this.userInfoProp.username//申请人,取vuex中的username
          }
        })
          .then((response) => {//判断res的结果,给用户相应的反馈
            let self = this
            this.util.feedbackInfo(self, response.data)
            this.dialogVisible = false
          })
          //解析服务器返回的response,并且做出相应的处理
          .catch(error => {
              console.log(this.dialogInfo)
              this.$message({
                message: '操作失败!,请稍后再试',
                type: 'error',
                duration: 1500,
                showClose: true
              });
              this.dialogVisible = false
            }
          )
      },
      answerInvite(event) {
        this.inviteDia = false;
        this.axios({
          method:"post",
          url: '/answerInvite',
          params: {
            userId: this.userInfoData.username,
            answer: event.currentTarget.value
          }
        })
          .then((response) => {
            let self = this
            this.util.feedbackInfo(self, response.data)
          })
          .catch(error => {
            this.$message({
              message: '操作失败!,请稍后再试',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          })
      },
      withdrawApply() {
        this.inviteDia = false;
        this.axios({
          method:"post",
          url: '/withdraw',
          params: {
            userId: this.userInfoData.username,
          }
        })
          .then((response) => {
            let self = this;
            this.updateStatus();
            this.util.feedbackInfo(self, response.data)
          })
          .catch(error => {
            this.$message({
              message: '操作失败!,请稍后再试',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          })
      },
      ...mapMutations(["teamInfo", "beingLeader", "updateTeam","updateStatus"])
    },

    created() {
      if (this.userInfoProp.display === true) {
        this.show = "1"
      } else {
        this.show = "0"
      }
      if (this.userInfoProp.available === true) {
        this.available = "1"

      } else {
        this.available = "0"
      }
    }
  }
</script>

<style scoped>

</style>
