<template>
  <div>
    <el-button type="danger" @click="dialogVisible = true" :disabled="!isDisabled">删除</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认要删除吗?确认后不可撤销</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  // import store from "../../store/store"
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "DeleteItem",
    // store,
    data() {
      return {
        isDisabled: true,
        dialogVisible: false
      }
    },
    props: ['targetUrl',],
    computed: {
      getTrunkItems() {
        return this.trunkItems
      },
      ...mapState(["trunkItems"])
    },
    watch: {
      getTrunkItems() {
        console.log(this.getTrunkItems)
        // this.isDisabled=(this.getTrunkItems.length !== 1)
      }
    },
    methods: {
      deleteItem() {


        let self = this
        this.axios({
          method: "delete",
          url: this.targetUrl,
          params: {
            id: this.trunkItems.id
          }
        })
          .then(response => {
            console.log(response.data)
            this.dialogVisible = false
            // this.$refs.CourseList.initCourseList();
            this.util.feedbackInfo(self, response.data)
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
