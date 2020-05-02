<template>
  <div>
    <Btns @updateList="updateList" @showAll="showAll" @showTeam="showTeam" @freshList="freshList"></Btns>
    <el-table
      :data="teamList"
      style="width: 100%"
      border
      stripe
      height="60vh"
      @selection-change="initSelection">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="course.course_name" label="课程名" width="180"></el-table-column>
      <el-table-column prop="leaderDetail.name" label="队长姓名" width="180"></el-table-column>
      <el-table-column prop="leader" label="队长学号"></el-table-column>
      <el-table-column prop="max_num" label="最大人数"></el-table-column>
      <el-table-column prop="current_num" label="当前人数"></el-table-column>
      <el-table-column prop="member1" label="组员1"></el-table-column>
      <el-table-column prop="member2" label="组员2"></el-table-column>
      <el-table-column prop="member3" label="组员3"></el-table-column>
      <el-table-column prop="member4" label="组员4"></el-table-column>
      <el-table-column prop="member5" label="组员5"></el-table-column>
      <el-table-column prop="member6" label="组员6"></el-table-column>
    </el-table>
    <pagination v-if="!showTeamOfCourse" @rewriteList="getListData" ref="pagination" target-url1="/group/"
                target-url2="/group/pages/"></pagination>
    <div v-if="showTeamOfCourse">
      <pagination @rewriteList="getListData" target-url1="/group/search/course/"
                  target-url2="/group/search/course/pages"
                  :second-params="courseId"
                  ref="pagination2"></pagination>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Pagination from "../common/Pagination";
  import Btns from "./Btn/Btns";

  export default {
    name: "TeamManagement",
    components: {Pagination, Btns},
    data() {
      return {
        teamList: [],
        teamListBackUp: [],
        showPagination: true,
        showTeamOfCourse: false,
        courseId: "",
        targetUrl1: "/group/",
        targetUrl2: "/group/pages/",
      }
    },
    methods: {
      getListData(data) {
        this.teamList = data
        this.teamListBackUp = data
      },
      initSelection(val) {
        let payload = {
          targetKey: "multipleSelection",
          targetVal: val
        }
        this.updateCurrentStatus(payload)
      },
      updateList(data) {
        this.teamList = data
        this.showPagination = false
      },
      showAll() {
        // this.showTeamOfCourse = false
        this.teamList = this.teamListBackUp
        this.showTeamOfCourse = false

        this.targetUrl1 = "/group/"
        this.targetUrl2 = "/group/pages/"
        // this.$refs.pagination.freshList()

      },
      showTeam(data) {
        this.courseId = data
        this.showTeamOfCourse = true
        this.targetUrl1 = "/group/search/course/"
        this.targetUrl2 = "/group/search/course/pages"
        this.$refs.pagination2.freshList()
      },
      freshList() {
        this.$refs.pagination.freshList()
      },
      ...mapMutations(["updateCurrentStatus"]),

    },
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
