<template>
  <div>
    <el-table :data="teamListInfo" height="80vh" stripe style="width: 100%">
      <el-table-column prop="id" label="队伍编号" width="180"></el-table-column>
      <el-table-column prop="courseId" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="course.course_name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="leaderDetail.name" label="队长姓名" width="180"></el-table-column>
      <el-table-column prop="leader" label="队长学号" width="180"></el-table-column>
      <el-table-column prop="leaderDetail.qq" label="qq" width="180"></el-table-column>
      <el-table-column prop="leaderDetail.school" label="学院" width="180"></el-table-column>
      <el-table-column prop="currentNum" label="现成员数" width="180"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入队长学号 回车搜索"
            title="输入队长学号 使用回车搜索"
            @change="searchSomething"/>
        </template>
        <template slot-scope="scope">
          <el-button @click.native.prevent="sendApplication(scope.row)" type="text" size="small">申请加入</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination ref="pageSize" @rewriteList="getListData" target-url1="/foyer" target-url2="/foyer/pages"
                v-show="showPagination"></Pagination>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Pagination from "../common/Pagination";

  export default {
    name: "team-list",
    data() {
      return {
        teamListInfo: [],//所有队伍信息,
        teamListInfoBackUp: [],//备份队伍信息,
        showPagination: true,
        message: {
          type: "",
          text: ""
        },
        search: ""
      }
    },
    components: {Pagination},
    computed: {
      ...mapState(["searchTeamInfo", "userInfoData", "regExpLibrary"])
    },
    watch: {
      //如果搜索框的输入为空,那么就重新显示搜索前的结果
      search(newVal) {
        if (!newVal) {
          this.teamListInfo = this.teamListInfoBackUp
          this.showPagination = true
        }
      }
    },
    methods: {

      /**
       * 获取从pagination组件提交来的数据,赋值给 stuList,用来渲染表格
       * @param data : pagination 组件提交来的数据
       */
      getListData(data) {
        this.teamListInfo = data
        //备份列表数据data,备份列表数据.以备search=""时,显示数据
        this.teamListInfoBackUp = data
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
              case 0:
                this.message.text = "操作成功";
                this.message.type = "successful";
                break;
              case 2:
                this.message.text = "你已经在队伍里了,请勿二次组队";
                this.message.type = "warning";
                break;
              case 3:
                this.message.text = "操作失败,该队伍不接受申请";
                this.message.type = "error";
                break;
              case 4:
                this.message.text = "尚有未被处理的申请,不能继续申请";
                this.message.type = "warning";
                break;
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
      },

      /**
       * 向后端请求搜索的数据
       * @param val
       */
      searchSomething(val) {
        // 判断输入是否合法
        if (!this.util.validateSomething.call(this, val, this.regExpLibrary.schoolIdReg)) {
          return
        }
        this.axios({
          url: "/foyer/search/leader/",
          method: "get",
          params: {
            leader: val
          }
        })
          .then(response => {
            this.showPagination = false
            this.teamListInfo = response.data
          })
          .catch(err => {
            console.log(err)
          })
      },


    }
  }
</script>

<style>

</style>
