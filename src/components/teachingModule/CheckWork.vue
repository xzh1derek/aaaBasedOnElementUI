<template>
  <div>
    <el-select v-model="form.courseId" placeholder="请选择要批改的课程">
      <el-option
        v-for="item in courseList"
        :key="item.id"
        :label="item.course_name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" @click="getWorkList">查询</el-button>
    <el-button type="primary" @click="downloadAll">打包下载</el-button>
    <el-button type="primary" @click="show = !show" :disabled="!form.courseId">筛选</el-button>
    <PreviewPdf ref="previewPdf"></PreviewPdf>

    <div>
      <div style="margin-top: 20px;width: 50%">
        <el-collapse-transition>
          <div v-show="show">
            <div style="margin: 10px 0">
              <el-select v-model="form.marked" slot="prepend" placeholder="请选择" style="margin-right: 10px">
                <el-option label="已批改" value="1"></el-option>
                <el-option label="全部" value="0"></el-option>
              </el-select>
              <el-select v-model="form.order" slot="prepend" placeholder="请选择" style="margin-right: 10px">
                <el-option label="按学号排序" value="3"></el-option>
                <el-option label="成绩降序" value="1"></el-option>
                <el-option label="成绩升序" value="2"></el-option>
              </el-select>
            </div>

            <el-input placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="学号" value="1"></el-option>
                <el-option label="姓名" value="2"></el-option>
                <el-option label="班级" value="3"></el-option>
                <el-option label="学院" value="4"></el-option>
                <el-option label="队伍ID" value="5"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchStu"></el-button>
            </el-input>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <el-table
      :data="workList"
      style="width: 100%">
      <el-table-column prop="username" label="学号" width="180"></el-table-column>
      <el-table-column prop="user.name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="user.class_id" label="班级"></el-table-column>
      <el-table-column prop="user.school" label="学院"></el-table-column>
      <el-table-column prop="teacher" label="老师"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="previewPDF(scope.row)">查看报告</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-if='isSearch' :second-params="form" target-url2="/score/search/pages/"
                target-url1="/score/search/"
                ref="pagination"
                @rewriteList="rewriteList"></Pagination>
  </div>
</template>

<script>
  import PreviewPdf from "../common/PreviewPdf";
  import Pagination from "../common/Pagination";

  export default {
    name: "CheckWork",
    components: {PreviewPdf, Pagination},
    data() {
      return {
        workList: [],
        userId: "",
        url: "",
        isShow: false,
        courseList: [],
        searchInfo: "",
        form: {
          courseId: "",
          // username: "",
          // name: "",
          // classId: "",
          // school: "",
          // teamId: "",
          marked: "1",
          order: "1"
        },
        formBackup: {
          // courseId: "",
          username: "",
          name: "",
          classId: "",
          school: "",
          teamId: "",
          // marked: "1",
          // order: "1"
        },
        show: false,
        select: "1",
        isSearch: false
      }
    },
    methods: {
      getCourseOfTeacher() {
        this.axios({
          method: "get",
          url: "/score/",
          params: {
            teacherId: 1
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.courseList = response.data
            } else {
              this.util.returnErr.call(this, "数据获取失败,请稍后再试")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getWorkList() {
        if (!this.form.courseId) {
          return;
        }
        this.axios({
          method: "get",
          url: "/task/homework/list",
          params: {
            courseId: this.form.courseId
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.workList = response.data
              this.isSearch = false
            } else {
              this.util.returnErr("操作失败")
              this.workList = response.data
              this.isSearch = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      previewPDF(row) {
        this.$refs.previewPdf.url = "/api/task/homework/check/?courseId=" + row.course_id + "&userId=" + row.username
        this.$refs.previewPdf.isShow = true
        this.$refs.previewPdf.courseId = row.course_id
        this.$refs.previewPdf.userId = row.user.username
        // this.$refs.previewPdf.score = row.score
        this.isShow = true
      },
      downloadAll() {
        this.axios({
          method: "get",
          url: "/task/homework/download/all/",
          params: {
            courseId: this.form.courseId
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },
      searchStu() {
        if (!this.select) {
          return;
        }
        this.form = Object.assign(this.form, this.formBackup)
        switch (this.select) {
          case "1":
            this.form.username = this.searchInfo;
            break;
          case "2":
            this.form.name = this.searchInfo;
            break;
          case "3":
            this.form.classId = this.searchInfo;
            break;
          case "4":
            this.form.school = this.searchInfo;
            break;
          case "5":
            this.form.teamId = this.searchInfo;
            break;
          default:
            this.util.returnErr("请先做出选择");
            return;
        }


        if (this.isSearch) {
          this.$refs.pagination.freshList()
        } else {
          this.isSearch = true
        }
      },
      rewriteList(data) {
        this.workList = data
      }
    },
    mounted() {
      this.getCourseOfTeacher()
    }

  }
</script>

<style>
  .el-select .el-input {
    width: 200px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
