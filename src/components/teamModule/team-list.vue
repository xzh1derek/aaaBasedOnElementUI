<template>
  <div>
<!--      <el-table :data="teamListInfo" stripe style="width: 80%" >-->
<!--      <el-table :data="teamListInfo.filter(data => !search || data.leaderDetail.name.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 80%" >-->
      <el-table :data="teamListInfo.filter(data => !search || data.leader.toString().includes(search))" stripe style="width: 100%" >
<!--      <el-table :data="teamListInfo.filter(data => !search || (data.leader=search))" stripe style="width: 80%" >-->

        <el-table-column prop="id" label="队伍编号" width="180"></el-table-column>
        <el-table-column prop="courseId" label="课程编号" width="180"></el-table-column>
        <el-table-column prop="course.course_name" label="课程名称" width="180"></el-table-column>
        <el-table-column prop="leaderDetail.name" label="队长姓名" width="180"></el-table-column>
        <el-table-column prop="leader" label="队长学号" width="180"></el-table-column>
        <el-table-column prop="leaderDetail.qq" label="qq" width="180"></el-table-column>
        <el-table-column prop="leaderDetail.school" label="学院" width="180"></el-table-column>
        <el-table-column prop="currentNum" label="现成员数" width="180"></el-table-column>
        <el-table-column fixed="right"  width="180">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click.native.prevent="sendApplication(scope.row)" type="text" size="small">申请加入</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "team-list",
    data() {
      return {
        teamListInfo: [],//所有队伍信息,
        message:{
          type:"",
          text:""
        },
        search:""
      }
    },
    watch: {},
    computed: {
      ...mapState(["searchTeamInfo", "userInfoData"])
    },
    methods: {
      matchCourse(id){
        switch (id) {
          case 1:return "A测";
          case 0:return "B测";
        }
      },
      sendApplication(row) {//发送申请加入请求
          this.axios({
            method: "post",
            url: "/apply",
            params: {
              teamId: row.id, //队长,在生成dom时,顺便把队长学号加到a标签的id上
              sender: localStorage.token//申请人,取vuex中的username
            }
          })
            .then((response) => {//判断res的结果,给用户相应的反馈
              switch (response.data) {
                case 0:this.message.text="操作成功";this.message.type="successful";break;
                case 2:this.message.text="你已经在队伍里了,请勿二次组队";this.message.type="warning";break;
                case 3:this.message.text="操作失败,该队伍不接受申请";this.message.type="error";break;
                case 4:this.message.text="尚有未被处理的申请,不能继续申请";this.message.type="warning";break;
              }
              this.$message({
                message: this.message.text,
                type: this.message.type,
                duration: 1500,
                showClose: true
              });
            })
            //解析服务器返回的response,并且做出相应的处理
            .catch(error => {
              this.$message({
                message: '操作失败!,请稍后再试',
                type: 'error',
                duration: 1500,
                showClose: true
              });
            })
        }
      },
    mounted() {//加载页面时,发送请求,获取所有队伍信息
               //初始化时,要先把数据存在数组中
        this.axios({
          method: "get",
          url: "/foyer",
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            this.teamListInfo = res.data;
            console.log(res)
          })
          .catch(error => {
            this.$message({
              message: '信息加载失败,请稍后再试!',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          })
      }
  }
</script>

<style>

</style>
