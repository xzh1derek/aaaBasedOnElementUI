<template>
  <div>
    <template v-if="!this.userInfoData.teamleader&&this.userInfoData.applicationStatus">
      <span >
        我的申请状态: <span style="font-weight: bold">{{this.userInfoData.applicationStatus==0?"未处理":this.userInfoData.applicationStatus}}</span>
      </span>

      <el-button type="primary" size="mini" @click="withdrawApply" value="1"
                 v-if="this.userInfoData.applicationStatus==0">撤回申请
      </el-button>
      <el-divider></el-divider>
    </template>


    <template v-if="!this.userInfoData.teamleader&&this.userInfoData.invitation_id">
      <span >
        队长: <span style="font-weight: bold">{{userInfoData.invitation_id}}</span> 邀请你加入他的队伍
      </span>

      <div style="text-align: right; margin: 0">
        <el-button type="primary" size="mini" @click="answerInvite($event)" value="0">拒绝</el-button>
        <el-button type="primary" size="mini" @click="answerInvite($event)" value="1">同意</el-button>
      </div>
      <el-divider></el-divider>
    </template>
    <h1 v-else>暂无消息</h1>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import store from "../store/store"

  export default {
    name: "NewMessage",
    data() {
      return {
        inviteDia: false,
        applyDia: false,
      }
    },
    store,
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      withdrawApply() {
        let self = this;
        this.inviteDia = false;
        this.axios({
          method: "post",
          url: '/withdraw',
          params: {
            userId: this.userInfoData.username,
          }
        })
          .then((response) => {
            console.log("successful")
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
      answerInvite(event) {
        this.inviteDia = false;
        this.axios({
          method: "post",
          url: '/answerInvite',
          params: {
            userId: this.userInfoData.username,
            answer: event.currentTarget.value
          }
        })
          .then((response) => {
            let self = this
            this.updateInvitationId()
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
      ...mapMutations([ "updateStatus","updateInvitationId"])
    }
  }
</script>

<style scoped>

</style>
