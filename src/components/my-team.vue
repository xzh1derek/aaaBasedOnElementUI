<!--显示队长标识-->
<template>
  <el-table :data="myTeamMember" stripe style="width: 100%">
    <el-table-column prop="name" label="组员姓名" width="180"></el-table-column>
    <el-table-column prop="username" label="学号" width="180"></el-table-column>
    <el-table-column prop="qq" label="qq"></el-table-column>
    <el-table-column prop="school" label="学院"></el-table-column>
  </el-table>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "my-team",
    data() {
      return {
        myTeamMember: []
      }
    },
    computed: {
      ...mapState(['userInfoData'])
    },
    mounted() {
      var self = this;
      setTimeout(function () {
        self.axios({
          url: '/team',
          params: {
            leader: self.userInfoData.teamleader
          }
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            self.myTeamMember = res.data
          })
          .catch(error => {
            self.$message({
              message:"信息加载失败,请稍后再试",
              type:"error",
              duration:1500,
              showClose:true
            })
          })
      }, 100)
    }
  }
</script>

<style scoped>

</style>
