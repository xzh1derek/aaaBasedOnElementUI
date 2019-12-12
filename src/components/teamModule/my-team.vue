<template>
  <div>
  <template >
  <el-table v-for="(team,index) in myTeamMember" :key="index" :data="team.memberDetails" stripe style="width: 80%">
<!--  <el-table v-for="team in myTeamMember" :data="team" stripe style="width: 80%">-->
    <el-table-column prop="name" label="组员姓名" width="180"></el-table-column>
    <el-table-column prop="username" label="学号" width="180"></el-table-column>
    <el-table-column prop="qq" label="qq"></el-table-column>
    <el-table-column prop="school" label="学院"></el-table-column>
  </el-table>
  </template>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "my-team",
    props:['userInfoProp'],
    data() {
      return {
        myTeamMember: null
        // myTeamMember:[]

      }
    },
    computed: {
      ...mapState(['userInfoData'])
    },
    methods:{

    },
    mounted() {
      var self = this;
      setTimeout(function () {
        self.axios({
          url: '/team',
          params: {
            userId: localStorage.token
          }
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            if (res.data.length==0){
              return
            }
            self.myTeamMember = res.data//这里要改
            // self.myTeamMember = res.data.memberDetails//这里要改
          })
          .catch(error => {
            self.$message({
              message: "信息加载失败,请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      }, 200)
    }
  }
</script>

<style scoped>

</style>
