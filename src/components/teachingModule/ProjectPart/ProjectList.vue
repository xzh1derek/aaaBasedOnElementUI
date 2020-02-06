<template>
  <div style="overflow: auto">
    <el-table :data=projectListInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)
              style=" width: 100% "
              @selection-change=handleSelectionChange
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column type="selection" fixed></el-table-column>



      <el-table-column type="expand" label="Project相关" width="180">

        <template slot-scope="scope" >
          <el-table :data=projectListInfo[scope.$index].projects size="mini" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="project_index" label="Project索引" width="180"></el-table-column>
            <el-table-column prop="project_name" label="Project名称" width="180"></el-table-column>
            <el-table-column prop="hours" label="Project学时" width="180"></el-table-column>
            <el-table-column prop="teacher" label="老师" width="180"></el-table-column>
          </el-table>
        </template>


      </el-table-column>





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
        :total="projectListInfo.length" class="pageControl">
      </el-pagination>


    </div>
  </div>
</template>

<script>
  export default {
    name: "ProjectList",
    data(){
      return{
        projectListInfo: [],
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
        this.currentChangePage(this.projectListInfo, currentPage)
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
      getProjectList(){
        this.axios({
          method:"get",
          url:"/project",
          params: {
          }
        })
          .then(response=>{
            this.projectListInfo=response.data
          })
          .catch(err=>{
            console.log(err)
          })
      },
      handleSelectionChange(val) {
        // this.multipleSelection = val;
        this.$emit('deleteCourseList',val)
      },
    },
    mounted() {
      this.getProjectList()
    }
  }
</script>

<style scoped>

</style>
