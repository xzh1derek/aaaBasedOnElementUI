<template>
  <div>
    <div id="outer">
      <CommonOperation></CommonOperation>
      <ResetPassword></ResetPassword>
      <div>
        <el-button @click="showSearchForm" type="primary">搜索学生</el-button>
      </div>
    </div>
    <SearchStu ref="searchForm" @getRequiredList="searchStu" @showAll="showAll"></SearchStu>


    <el-table :data="stuList"
              style=" width: 100% "
              stripe
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" fixed></el-table-column>
      <el-table-column prop="username" label="学号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="school" label="学院"></el-table-column>
      <el-table-column prop="class_id" label="班级" width="220"></el-table-column>
      <el-table-column prop="qq" label="QQ" width="220"></el-table-column>
      <el-table-column prop="year" label="年级" width="180"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editStu(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-if="showPagination" @rewriteList="getListData" target-url1="/students" target-url2="/students/pages"></Pagination>

<template v-if="!showPagination">
    <Pagination @rewriteList="getListData" :second-params="stuInfo" target-url1="/students/search/"
                target-url2="/students/search/pages"
                ref="searchPagination"
    ></Pagination>
</template>
    <FormInDialog ref="openFormDialog" :origin-data=editBefore target-url="/students/update"></FormInDialog>

  </div>
</template>

<script>
  import Pagination from "../common/Pagination";
  import CommonOperation from "../common/CommonOperation";
  import {mapState, mapMutations} from 'vuex'
  import FormInDialog from "../common/FormInDialog";
  import SearchStu from "./Btn/SearchStu";
  import ResetPassword from "./Btn/ResetPassword";

  export default {
    name: "StuManagement",
    data() {
      return {
        stuList: [],//用来保存从pagination里传来的用来渲染表格的数据
        editBefore: {},
        dialogVisible: false,
        show: false,
        showPagination:true,
        stuInfo: {
          name: '',
          username: '',
          class_id: '',
          school: '',
          year: '',
        }
      }
    },
    components: {Pagination, CommonOperation, FormInDialog, SearchStu, ResetPassword},
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      /**
       * 获取从pagination组件提交来的数据,赋值给 stuList,用来渲染表格
       * @param data : pagination 组件提交来的数据
       */
      getListData(data) {
        this.stuList = data
      },

      handleSelectionChange(val) {
        let payload = {
          targetKey: "multipleSelection",
          targetVal: val
        };
        this.updateCurrentStatus(payload)
        console.log(val)
      },

      editStu(row) {
        this.editBefore = Object.assign({},row)
        // this.$refs.openFormDialog.editStuDiaVisible = true
        this.$refs.openFormDialog.diaVisible = true
      },


      resetPassWord() {
        this.axios({
          method: "post",
          url: "/students/resetPassword/",
          params: {
            userId: this.multipleSelection[0].username
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.dialogVisible = false
              this.util.feedbackInfo(this, 0)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      ...mapMutations(["updateCurrentStatus"]),
      showSearchForm() {
        this.$refs.searchForm.show = !this.$refs.searchForm.show
      },
      searchStu(data) {
        this.stuInfo = data
        if (this.showPagination){
          this.showPagination= false
        }else {
          this.$refs.searchPagination.freshList()
        }
      },
      showAll() {
        this.showPagination = true
      }
    },
    beforeMount() {
      let payload = {
        targetKey: "btnFamily",
        targetVal: 0
      };
      this.updateCurrentStatus(payload)
    }
  }
</script>

<style scoped>
  #outer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
</style>
