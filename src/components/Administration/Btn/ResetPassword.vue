<template>
  <div style="margin-right: 6px;">
    <el-button type="primary" @click="dialogVisible=true" :disabled="multipleSelection.length!==1">重置密码</el-button>
    <el-dialog
      title="警告"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定要为其重置密码吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="resetPassWord">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "ResetPassword",
    data() {
      return {
        dialogVisible: false
      }
    },
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      resetPassWord() {
        this.axios({
          method: "post",
          url: "/students/resetPassword/",
          params: {
            userId: this.multipleSelection[0].username
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.dialogVisible = false
              this.util.feedbackInfo(this, 0)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

    },
  }
</script>

<style scoped>

</style>
