<template>
  <div>
    <el-button type="primary" @click="show = !show">筛选</el-button>
    <div style="margin-top: 20px; width: 30%">
      <el-collapse-transition>
        <div v-show="show">
          <template v-if="searchType==='1'">
            <el-input placeholder="请输入队长学号" v-model="search" class="input-with-select">
              <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="队长学号" value=1></el-option>
                <el-option label="课程名" value=2></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchSomething(search)"></el-button>
            </el-input>
          </template>

          <template v-else>
            <el-autocomplete placeholder="请输入课程名" v-model="search" class="input-with-select"
                             :fetch-suggestions="querySearch"
                             value-key="course_name"
                             @select="handleSelect">
              <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="队长学号" value=1></el-option>
                <el-option label="课程名" value=2></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getTeamOfCourse"></el-button>
            </el-autocomplete>
          </template>
        </div>
      </el-collapse-transition>

    </div>
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

        <template slot-scope="scope">
          <el-button @click.native.prevent="sendApplication(scope.row)" type="text" size="small">申请加入</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="!isShowLeader">
      <Pagination ref="pageSize" @rewriteList="getListData" target-url1="/foyer" target-url2="/foyer/pages"
                  v-if="showPagination"></Pagination>
      <div v-if="!showPagination">
        <Pagination ref="pageSizeForSearchTeam" @rewriteList="getListData" target-url1="/foyer/search/course/"
                    target-url2="/foyer/search/course/pages/"
                    :second-params="courseId"
        ></Pagination>
      </div>
    </div>
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
        search: "",
        show: false,
        searchType: "2",
        courseNameList: [],
        courseId: "",
        isShowLeader:false
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
          this.isShowLeader=false
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
            this.isShowLeader = true
            this.teamListInfo = response.data
          })
          .catch(err => {
            console.log(err)
          })
      },

      getCourseList() {
        this.axios({
          method: "get",
          url: "/course/isTeam/",
        })
          .then(response => {
            this.courseNameList = response.data
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },

      querySearch(queryString, cb) {
        var courseNameList = this.courseNameList;
        var results = queryString ? courseNameList.filter(this.createFilter(queryString)) : courseNameList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      createFilter(queryString) {
        return (courseName) => {
          return (courseName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      handleSelect(item) {
        this.courseId = item.id
      },


      getTeamOfCourse() {
        this.isShowLeader=false
        this.showPagination = false
        // this.$refs.pageSizeForSearchTeam.freshList()

      }
    },
    mounted() {
      this.getCourseList()
    }
  }
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
