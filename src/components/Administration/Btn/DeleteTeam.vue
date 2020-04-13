<template>
  <div>
    <el-button type="primary" @click="dialogVisible=true">解散队伍</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定解散这支队伍吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteTargetTeam">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "DeleteTeam",
    data() {
      return {
        dialogVisible: false
      }
    },
    computed:{
      ...mapState(["multipleSelection"])
    },
    methods: {
      deleteTargetTeam() {
        this.axios({
          method: "delete",
          url: "/group/dismiss/",
          params: {
            teamId:this.multipleSelection[0].id
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.dialogVisible = false
            }else {
              this.util.returnErr.call(this,"操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
