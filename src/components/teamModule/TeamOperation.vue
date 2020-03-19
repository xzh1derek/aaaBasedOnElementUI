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
        title="选择是否在队伍大厅展示队伍,展示队伍必然接受申请(不影响邀请功能)"
        @change="changeInitStatus('/team/setDisplay',1)">
      </el-switch>

      <el-switch
        v-model="isAvailable.toString()"
        active-text="接受申请"
        inactive-text="拒绝申请"
        active-value="true"
        inactive-value="false"
        title="选择队伍是否接受他人申请,拒绝申请必然不展示队伍(不影响邀请功能)"
        @change="changeInitStatus('/team/setAvailable',2)">
      </el-switch>

      <el-input
        placeholder="请输入被邀学号"
        v-model="input"
        clearable
        prefix-icon="el-icon-search"
        style="margin-bottom: 10px">
      </el-input>

      <el-button slot="reference" type="text" @click="invite">邀请</el-button>
    </div>
    <el-button slot="reference" style="float: right; padding: 3px 0" type="text">操作</el-button>
  </el-popover>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "TeamOperation",
    props: ["isDisplay", "isAvailable", "teamId"],//从my-team组件接收,分表表示是否展示在大厅,和是否接受申请
    data() {
      return {
        input: "",
        throttleFunc: "",//用来保存截留函数
        operateUrl: "",//操作的目标地址
        operateStatus: "",//操作的状态
      }
    },
    computed: {
      isAvailableStat() {
        return this.isAvailable
      },
      isDisplayStat() {
        return this.isDisplay
      },
      ...mapState(["regExpLibrary"])
    },
    watch: {
      //拒绝申请必然不展示队伍
      isAvailableStat(newVal) {
        if (newVal === false) {
          if (this.isDisplay === false) return;
          this.operateStatus = 1;
          this.operateUrl = "/team/setDisplay";
          this.changeStatus();
          this.$message({
            message: "拒绝申请必然隐藏队伍",
            type: "info",
            duration: 3000,
            showClose: true
          })
        }
      },

      //展示队伍必然接受申请
      isDisplayStat(newVal) {
        if (newVal === true) {
          if (this.isAvailable === true) return;
          this.operateStatus = 2;
          this.operateUrl = "/team/setAvailable";
          this.changeStatus();
          this.$message({
            message: "展示队伍必然接受申请",
            type: "info",
            duration: 3000,
            showClose: true
          })
        }
      }
    },
    methods: {
      /**
       * 初始化队伍设置的相关请求
       * @url :请求的目的地址
       * @stat :请求类别--->1 for isDisplay,  2  for isAvailable
       *
       */
      changeInitStatus(url, stat) {
        this.operateStatus = stat
        this.operateUrl = url
        this.throttleFunc()
      },


      /**
       * 改变队伍的状态
       * @returns {string}
       */
      changeStatus() {
        let data;
        switch (this.operateStatus) {
          case 1://此时改变的是isDisplay
            this.isDisplay = !this.isDisplay;//这两行不要改
            data = this.isDisplay;
            break;
          case 2://此时改变的是isAvailable
            this.isAvailable = !this.isAvailable;//这两行不要改
            data = this.isAvailable;
            break;
          default://都不是
            return "err"
        }
        this.axios({
          method: "post",
          url: this.operateUrl,
          params: {
            teamId: this.teamId,//通过父组件传入
            status: data
          }
        })
          .then(response => {
            this.util.feedbackInfo(this, response.data)
            if (response.data === 7) {
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

      /**
       * 队长邀请新队员加入队伍
       */
      invite() {
        // 如果输入不规范
        if (!this.util.validateSomething.call(this, this.input, this.regExpLibrary.schoolIdReg)) return
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


    },
    mounted() {
      //初始化节流函数
      //注意:把带参数的函数当成参数传递时,要使用bind
      this.throttleFunc = this.util.throttle.call(this, this.changeStatus.bind(this), 3000)
    }
  }
</script>

<style scoped>
  * {
    margin-bottom: 10px;
  }
</style>
