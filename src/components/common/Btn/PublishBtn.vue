<!--发布课程的按键-->
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true"
               :disabled="checkDisabled"
               v-if="btnFamily===10 || btnFamily===15"
               title="发布课程，发布后部分内容不支持编辑">
      发布
    </el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定发布吗？发布后部分内容不可更改。</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="publishItem">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex"

  export default {
    name: "PublishBtn",
    data() {
      return {
        dialogVisible: false,
        params: {},
        url: ""
      }
    },
    computed: {
      checkDisabled() {
        if (this.btnFamily === 10 && this.multipleSelection.length === 1) {
          this.params.courseId = this.multipleSelection[0].id
          this.url = "/course/publish/"
          return false
        } else if (this.btnFamily === 15 && this.innerMultipleSelection.length === 1) {
          this.params.id = this.innerMultipleSelection[0].id
          this.url = "/project/publish/"
          return false
        } else {
          return true
        }
      },
      ...
        mapState(["multipleSelection", "btnFamily", "readyForRenovate", "innerMultipleSelection"])
    },
    methods: {
      publishItem() {
        this.axios({
          method: "post",
          url: this.url,
          params: this.params
          // {
          // courseId: this.multipleSelection[0].id
          // }
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.dialogVisible = false
              let payload = {
                targetKey: "readyForRenovate",
                targetVal: !this.readyForRenovate
              };
              this.updateCurrentStatus(payload)
            } else {
              this.util.returnErr.call(this, response.data)
            }
          })
          .catch(err => {
            this.util.returnErr.call(this, "操作失败，请规范操作")
          })
      }
      ,
      ...
        mapMutations(["updateCurrentStatus"])
    }
    ,

  }
</script>

<style scoped>

</style>
