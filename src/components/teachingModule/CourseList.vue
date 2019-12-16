<template>
  <div style="overflow: auto">
    <el-table :data=courseListInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)
              stripe style="width: 100%"
              border
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" fixed></el-table-column>
      <el-table-column prop="course_code" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="course_name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="credit" label="学分" width="180"></el-table-column>
      <el-table-column prop="hours" label="学时" width="180"></el-table-column>
      <el-table-column prop="teachers" label="教师" width="180"></el-table-column>
      <el-table-column prop="is_team" label="是否组队" width="180"></el-table-column>
      <el-table-column prop="max_num" label="组队最大人数" width="180"></el-table-column>
      <el-table-column prop="stu_num" label="学生人数" width="180"></el-table-column>
      <el-table-column prop="project_num" label="项目数" width="180"></el-table-column>
      <el-table-column prop="template" label="模板" width="180"></el-table-column>
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
  </div>
</template>

<script>
  export default {
    name: "CourseList",
    data() {
      return {
        courseListInfo: [],
        search: "",
        currentPage: 1,//初始页
        pagesize: 10,//每一页的数量,
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
      }
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
        // this.multipleSelection = val;
        this.$emit('deleteCourseList',val)
      },
      initCourseList(){
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
      }
    },
    mounted() {
      //加载页面时,发送请求,获取所有队伍信息
      //初始化时,要先把数据存在数组中
      this.initCourseList()
    }
  }
</script>

<style scoped>

</style>
