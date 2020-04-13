<template>
  <div>
    <DeleteTeam style="display: inline"></DeleteTeam>

    <el-button type="primary" @click="filterSth(1)">筛选</el-button>
    <el-button type="primary" @click="filterSth(2)">未组队学生</el-button>
    <div style="margin-top: 20px;width: 30%">
      <el-collapse-transition>
        <div v-show="show" style="margin-bottom: 10px">
          <!-- 搜学号-->
          <template v-if="select==='1'">
            <el-input placeholder="请输入队长学号" v-model="search" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="队长学号" value=1></el-option>
                <el-option label="课程名" value=2></el-option>
                <el-option label="未组队学生" value=3></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchSomething(search)" title="搜索队长名下的队伍">搜队长</el-button>
            </el-input>
          </template>
          <!--搜课程-->
          <template v-else-if="select==='2'">
            <el-autocomplete placeholder="请输入课程名" v-model="search" class="input-with-select"
                             :fetch-suggestions="querySearch"
                             value-key="course_name"
                             @select="handleSelect">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="队长学号" value=1></el-option>
                <el-option label="课程名" value=2></el-option>
                <el-option label="未组队学生" value=3></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getTeamOfCourse" title="搜索课程下队伍列表">搜课程</el-button>
            </el-autocomplete>
          </template>
          <!--搜single-->
          <template v-else-if="select==='3'">
            <el-autocomplete placeholder="请输入课程名" v-model="search" class="input-with-select"
                             :fetch-suggestions="querySearch"
                             value-key="course_name"
                             @select="handleSelect">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="队长学号" value=1></el-option>
                <el-option label="课程名" value=2></el-option>
                <el-option label="未组队学生" value=3></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getSingleStu" title="搜索某课程下未组队的学生列表">未组队列表</el-button>
            </el-autocomplete>
          </template>

        </div>
      </el-collapse-transition>

      <el-dialog
        title="未组队学生列表"
        :visible.sync="dialogVisible"
        width="60%"
        style="overflow: auto">
        <el-button type="primary" @click="groupThem">强制组队</el-button>
        <el-button type="primary" title="批量单独成队" @click="createTeam">单独成队</el-button>
        <el-table
          :data="teamlessList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          @selection-change="handleSelection">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="user.username" label="学号" width="180"></el-table-column>
          <el-table-column prop="user.name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="user.year" label="年级"></el-table-column>
          <el-table-column prop="user.class_id" label="班级"></el-table-column>
          <el-table-column prop="user.school" label="学院"></el-table-column>
        </el-table>
        <div class="paginationClass">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8, 20, 40]"
            :page-size="pagesize"
            :background='true'
            :pager-count="pagerCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="teamlessList.length" class="pageControl">
          </el-pagination>
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  import DeleteTeam from "./DeleteTeam";
  import {mapState, mapMutations} from "vuex"

  export default {
    name: "Btns",
    components: {DeleteTeam},
    data() {
      return {
        show: false,
        select: "1",
        search: "",
        teamlessList: [],
        searchFunc: {},
        selection: [],
        courseId: "",
        dialogVisible: false,
        currentPage: 1,//初始页
        pagesize: 8,//每一页的数量,
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
      }
    },
    watch: {
      search(val) {
        if (!val) {
          this.$emit("showAll")
        }
      },
      dialogVisible(val) {
        if (val === false) {
          this.$emit("freshList")
        }
      }
    },
    computed: {
      ...mapState(["regExpLibrary"])
    },
    methods: {
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
            this.$emit("updateList", response.data)
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

      getTeamOfCourse() {
        this.$emit("showTeam", this.courseId)
      },

      getSingleStu() {
        this.axios({
          method: "get",
          url: "/group/search/course/teamless/",
          params: {
            courseId: this.courseId
          }
        })
          .then(response => {
            this.teamlessList = response.data
            this.dialogVisible = true
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleSelection(val) {
        this.selection = val
      },
      handleSizeChange(size) {
        //选择 一页展示多少数据时 调用的方法
        this.pagesize = size;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(currentPage) {
        //点击页面项 的函数响应
        this.currentPage = currentPage;
        this.currentChangePage(this.courseListInfo, currentPage)
      },
      //分页方法（重点）
      currentChangePage(list, currentPage) {
        let from = (currentPage - 1) * this.pagesize;
        let to = currentPage * this.pagesize;
        this.tempList = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tempList.push(list[from]);
          }
        }
      },


      groupThem() {

        let usernameList = this.util.getPropFormListObj(this.selection, "username")
        this.axios({
          method: "post",
          url: "/group/students/together/",
          params: {
            courseId: this.courseId
          },
          data: usernameList

        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.getSingleStu()
            } else {
              this.util.returnErr.call(this, "操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      createTeam() {
        let usernameList = this.util.getPropFormListObj(this.selection, "username")
        this.axios({
          method: "post",
          url: "/group/students/single/",
          params: {
            courseId: this.courseId
          },
          data: usernameList
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.getSingleStu()
            } else {
              this.util.returnErr.call(this, "操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      searchSingleStu() {
        this.select = "3"
        this.show = !this.show
      },
      filterSth(checkCode) {
        if (this.show && checkCode === 1 && (this.select === "1" || this.select === "2")) {
          this.show = false
          return
        }
        if (this.show && checkCode === 2 && this.select === "3") {
          this.show = false
          return
        }

        if (checkCode === 1) {
          this.select = "1"
          this.show = true
        } else {
          this.select = "3"
          this.show = true
        }
      },
      ...mapMutations(["updateCurrentStatus"]),

    },

    mounted() {
      this.getCourseList()
    }
  }
</script>

<style >

</style>
