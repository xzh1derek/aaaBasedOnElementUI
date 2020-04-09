<template>
  <div style="overflow: auto">
    <el-table :data=projectListInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)
              style=" width: 100% "
              @selection-change=handleSelectionChange
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <!--      选择框列-->
      <el-table-column type="selection" fixed></el-table-column>
      <!--      嵌套的表格-->
      <el-table-column type="expand" label="Project相关" width="180">
        <template slot-scope="scope">
          <el-table :data=projectListInfo[scope.$index].projects size="mini"
                    @selection-change=handleInnerSelectionChange
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                    :cell-style="cellStyle"
          >
            <el-table-column type="selection" fixed></el-table-column>
            <el-table-column prop="project_index" label="Project索引" width="180"></el-table-column>
            <el-table-column prop="project_name" label="Project名称" width="180"></el-table-column>
            <el-table-column prop="hours" label="Project学时" width="180"></el-table-column>
            <el-table-column prop="is_fixed" label="固定排课?" :formatter="formatBoolean" width="180"></el-table-column>
            <el-table-column prop="is_published" label="已发布?" :formatter="formatBoolean" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button @click.native.prevent="editProject(scope.row)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!--      表格主体-->
      <el-table-column prop="course_code" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="course_name" label="课程名称" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="credit" label="学分" width="180"></el-table-column>
      <el-table-column prop="hours" label="学时" width="180"></el-table-column>
      <el-table-column prop="teachers" label="教师" width="180" :formatter="formatTeacherName"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="is_team" label="是否组队" width="180"></el-table-column>
      <el-table-column prop="max_num" label="组队最大人数" width="180"></el-table-column>
      <el-table-column prop="stu_num" label="学生人数" width="180"></el-table-column>
      <el-table-column prop="project_num" label="项目数" width="180"></el-table-column>
      <el-table-column prop="template" label="模板" width="180"></el-table-column>
    </el-table>
    <div class="paginationClass">
      <!--      分页部分-->
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

    <FormInDialog :origin-data="editBefore" target-url="/project/update" ref="openFormDialog"></FormInDialog>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import FormInDialog from "../../common/FormInDialog";

  export default {
    name: "ProjectList",
    components: {FormInDialog},
    data() {
      return {
        projectListInfo: [],
        currentPage: 1,//初始页
        pagesize: 10,//每一页的数量,
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
        editBefore:{}
      }
    },
    watch: {
      /**
       * 状态改变,跟新project列表
       */
      readyForRenovateComp() {
        this.getProjectList()
      }
    },
    computed: {
      readyForRenovateComp() {
        return this.readyForRenovate
      },
      ...mapState(["multipleSelection", "readyForRenovate"])
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


      cellStyle(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色
        return 'background:floralwhite'
      },
      /**
       * 获取project列表
       */
      getProjectList() {
        this.axios({
          method: "get",
          url: "/project",
          params: {}
        })
          .then(response => {
            this.projectListInfo = response.data
          })
          .catch(err => {
            console.log(err)
          })
      },

      /**
       * 当选择表格的内容时,跟新vuex中 multipleSelection 的值
       * @param val
       */
      handleSelectionChange(val) {
        let payload = {
          targetKey: "multipleSelection",
          targetVal: val
        }
        this.updateCurrentStatus(payload)
      },

      handleInnerSelectionChange(val) {
        let payload = {
          targetKey: "innerMultipleSelection",
          targetVal: val
        }
        this.updateCurrentStatus(payload)
      },

      //格式化老师姓名显示
      formatTeacherName() {
        //arguments的第三个元素就是本行显示的内容
        return arguments[2].join("　")
      },

      /**
       *
       * @param row
       */
      editProject(row) {
        this.editBefore = this.util.deepClone(row)
        this.$refs.openFormDialog.diaVisible = true
      },
      //格式化bool显示
      formatBoolean() {
        //arguments的第三个元素就是本行显示的内容
        return arguments[2] === true ?"是":"否"
      },

      ...mapMutations(["updateCurrentStatus"])
    },
    mounted() {
      this.getProjectList()
    }
  }
</script>

<style scoped>

</style>
