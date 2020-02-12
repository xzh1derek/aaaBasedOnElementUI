<!--用来存放队长操作队伍的相关操作-->
<template>
  <el-popover
    placement="bottom"
    title="请选择操作:"
    width="200"
    trigger="click">
    <div style="text-align: center">
      <el-switch
        v-model="isDisplay.toString()"
        active-text="展示队伍"
        inactive-text="隐藏队伍"
        active-value="true"
        inactive-value="false"
        title="选择是否在队伍大厅展示队伍(不影响邀请功能)"
        @change="changeStatus('/team/setDisplay',1)">
      </el-switch>

      <el-switch
        v-model="isAvailable.toString()"
        active-text="接受申请"
        inactive-text="拒绝申请"
        active-value="true"
        inactive-value="false"
        title="选择队伍是否接受他人申请(不影响邀请功能)"
        @change="changeStatus('/team/setAvailable',2)">
      </el-switch>

      <el-input
        placeholder="请输入被邀学号"
        v-model="input"
        clearable
        style="margin-bottom: 10px">
      </el-input>

      <el-button slot="reference" type="text" @click="invite">邀请</el-button>
    </div>
    <el-button slot="reference" style="float: right; padding: 3px 0" type="text">操作</el-button>
  </el-popover>
</template>

<script>
  export default {
    name: "TeamOperation",
    props: ["isDisplay", "isAvailable", "teamId"],//从my-team组件接收,分表表示是否展示在大厅,和是否接受申请
    data() {
      return {
        input: ""
      }
    },
    methods: {
      /**
       * 改变队伍的状态
       * @param url:目的地址
       * @param status:当前的状态
       */
      changeStatus(url, status) {
        let data;
        switch (status) {
          case 1://此时改变的是isDisplay
            this.isDisplay = !this.isDisplay;
            data = this.isDisplay;
            break;
          case 2://此时改变的是isAvailable
            this.isAvailable = !this.isAvailable;
            data = this.isAvailable;
            break;
          default://都不是
            return "err"
        }
        this.axios({
          method: "post",
          url: url,
          params: {
            teamId: this.teamId,
            status: data
          }
        })
          .then(response => {
            this.util.feedbackInfo(this, response.data)
            if (response.data===7){
              switch (status) {
                case 1://此时改变的是isDisplay
                  this.isDisplay = !this.isDisplay;
                  break;
                case 2://此时改变的是isAvailable
                  this.isAvailable = !this.isAvailable;
                  break;
                default://都不是
                  return "err"
              }
            }
          })
          .catch(err => {
            switch (status) {
              case 1://此时改变的是isDisplay
                this.isDisplay = !this.isDisplay;
                break;
              case 2://此时改变的是isAvailable
                this.isAvailable = !this.isAvailable;
                break;
              default://都不是
                return "err"
            }
          })
      },

      invite() {
        this.axios({
          method: "post",
          url: "/team/invite",
          params: {
            teamId: this.teamId,
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
              duration: 3000,
              showClose: true
            });
          })
      },


    }
  }
</script>

<style scoped>
  * {
    margin-bottom: 10px;
  }
</style>
