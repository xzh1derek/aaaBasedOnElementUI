<template>
  <el-table :data="newRequest" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="username" label="学号" width="180"></el-table-column>
    <el-table-column prop="qq" label="qq"></el-table-column>
    <el-table-column prop="school" label="学院"></el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="approveReq(scope.row)" type="text" size="small">同意</el-button>
        <el-button @click.native.prevent="rejectReq(scope.row)" type="text" size="small">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import {mapState} from "vuex"

  export default {
    name: "new-request",
    data() {
      return {
        newRequest: []
      }
    },
    methods: {
      approveReq(row) {
        this.axios({
          url: '/approve',
          params: {
            sender: row.username,//使用scope.row拿到每一行的数据,申请人
            receiver: this.userInfoData.username//队长
          }
        })
          .then((response) => {
            var self = this;
            this.util.getNewReq(self);
            this.util.feedbackInfo(self, response.data)
          })
          .catch(err => {
            this.$message({
              message: "操作失败,请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      },
      rejectReq(row) {
        this.axios({
          url: '/reject',
          params: {
            sender: row.username,////使用scope.row拿到每一行的数据
            reason: ""
          }
        })
          .then((response) => {
            var self = this;
            this.util.getNewReq(self);
            this.util.feedbackInfo(self, response.data)
          })
          .catch(err => {
            this.$message({
              message: "操作失败,请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      }
    },
    computed: {
      ...mapState(["userInfoData"])
    },
    mounted() {
      var self = this;
      this.util.getNewReq(self)
    }
  }
</script>

<style scoped>

</style>
