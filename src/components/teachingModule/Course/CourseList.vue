<template>
  <div style="overflow: auto">
    <el-table :data=courseListInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)
              stripe style="width: 100%"
              border
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" fixed></el-table-column>
      <el-table-column prop="course_code" label="课程代码" sortable width="180"></el-table-column>
      <el-table-column prop="course_name" label="课程名称" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="credit" label="学分"  width="180"></el-table-column>
      <el-table-column prop="hours" label="学时" width="180"></el-table-column>
      <el-table-column prop="is_published" label="是否发布" :formatter="formatBoolean" width="180"></el-table-column>
      <el-table-column prop="teachers" :formatter="formatTeacherName" label="教师" width="180"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="max_num" label="组队最大人数" width="180"></el-table-column>
      <el-table-column prop="stu_num" label="总人数" width="180"></el-table-column>
      <el-table-column prop="project_num" label="项目数" width="180"></el-table-column>
      <el-table-column prop="template" label="模板" width="180"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      width="150px">
        <template slot-scope="scope">
          <el-button @click="editCourse(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="openStuListDia(scope.row)" type="text" size="small">学生名单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationClass">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40]"
        :page-size="pagesize"
        :background='true'
        :pager-count="pagerCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="courseListInfo.length" class="pageControl">
      </el-pagination>
    </div>
    <FormInDialog :origin-data="editBefore" target-url="/course/update" ref="openFormDialog"></FormInDialog>
    <StuOfCourse ref="stuList" ></StuOfCourse>

  </div>
</template>

<script>
  import CommonOperation from "../../common/CommonOperation";
  import FormInDialog from "../../common/FormInDialog";
  import {mapState, mapMutations} from "vuex";
  import StuOfCourse from "./StuOfCourse";

  export default {
    name: "CourseList",
    data() {
      return {
        courseListInfo: [],
        search: "",
        currentPage: 1,//初始页
        pagesize: 10,//每一页的数量,
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
        editBefore: {},//未改动之前的数据,预填入form中
      }
    },
    components: {CommonOperation, FormInDialog,StuOfCourse},
    computed: {
      isReadyForRenovate() {
        return this.readyForRenovate
      },
      ...mapState(["readyForRenovate", "btnFamily"])
    },
    methods: {

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


      handleSelectionChange(val) {
        let payload = {
          targetKey: "multipleSelection",
          targetVal: val
        }
        this.updateCurrentStatus(payload)
      },


      initCourseList() {
        this.axios({
          method: "get",
          url: "/course",
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            this.courseListInfo = res.data;
          })
          .catch(error => {
            this.$message({
              message: '信息加载失败,请稍后再试!',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          })
      },
      editCourse(row) {
        this.editBefore = this.util.deepClone(row)
        this.$refs.openFormDialog.diaVisible = true
      },

      /**
       * 打开学生列表对话框
       */
      openStuListDia(row){
        let payload = {
          targetKey: "multipleSelection",
          targetVal: [row]
        }
        this.updateCurrentStatus(payload)
        this.$refs.stuList.dialogVisible = true
        this.$refs.stuList.courseId = row.id
      },

      //格式化老师姓名显示
      formatTeacherName() {
        //arguments的第三个元素就是本行显示的内容
        return arguments[2].join("　")
      },
      //格式化bool显示
      formatBoolean() {
        //arguments的第三个元素就是本行显示的内容
        return arguments[2] === true ?"是":"否"
      },
      ...mapMutations(["updateCurrentStatus"])
    }
    ,
    watch: {
      isReadyForRenovate() {//如果btnFamily=10 并且readyForRenovate改变了,就更新页面
        if (this.btnFamily == 10)
          this.initCourseList()
      }
      ,

    }
    ,
    mounted() {
      //加载页面时,发送请求,获取所有队伍信息
      //初始化时,要先把数据存在数组中
      this.initCourseList()
    }
  }
</script>

<style scoped>

</style>
