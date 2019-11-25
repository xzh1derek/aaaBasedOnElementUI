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
        newRequest: [
        ]
      }
    },
    methods: {
      alertMen(row){
        console.log(row.username)
      },
      approveReq(row) {
        this.axios({
          url: '/approve',
          params: {
            sender: row.username,//使用scope.row拿到每一行的数据
            receiver: this.userInfoData.username
          }
        })
          .then((res) => {
            this.$message({
              message:"操作成功,已同意成员加入",
              type:"successful",
              duration:1500,
              showClose:true
            })
          })
          .catch(err => {
            this.$message({
              message:"操作失败,请稍后再试",
              type:"error",
              duration:1500,
              showClose:true
            })
          })
      },
      rejectReq(row) {
        this.axios({
          url: '/reject',
          params: {
            sender: row.username,////使用scope.row拿到每一行的数据
            reason: "kaixin"
          }
        })
          .then((res) => {
            this.$message({
              message:"操作成功,已拒绝成员加入",
              type:"successful",
              duration:1500,
              showClose:true
            })
          })
          .catch(err => {
            this.$message({
              message:"操作失败,请稍后再试",
              type:"error",
              duration:1500,
              showClose:true
            })
          })
      }
    },
    computed: {
      ...mapState(["userInfoData"])
    },
    mounted() {
      this.axios({
        method: "get",
        url: "/mail",
        params: {
          userId: this.userInfoData.username//得改
        }
      })
      //如果查询成功,本地缓存用户信息
        .then((res) => {
          this.newRequest = res.data
        })
        //如果查询失败,提醒用户重新登录
        .catch(err => {
          this.$message({
            message:"信息加载失败,请稍后再试",
            type:"error",
            duration:1500,
            showClose:true
          })
        })
    }
  }
</script>

<style scoped>

</style>
