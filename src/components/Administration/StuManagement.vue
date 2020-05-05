<template>
  <div>
    <CommonOperation></CommonOperation>
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

    <Pagination @rewriteList="getListData" target-url1="/students" target-url2="/students/pages"></Pagination>

    <FormInDialog ref="openFormDialog" :origin-data=editBefore target-url="/students/update"></FormInDialog>

  </div>
</template>

<script>
  import Pagination from "../common/Pagination";
  import CommonOperation from "../common/CommonOperation";
  import {mapMutations} from 'vuex'
  import FormInDialog from "../common/FormInDialog";

  export default {
    name: "StuManagement",
    data() {
      return {
        stuList: [],//用来保存从pagination里传来的用来渲染表格的数据
        editBefore: {}
      }
    },
    components: {Pagination, CommonOperation, FormInDialog},
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
        this.editBefore = row
        this.$refs.openFormDialog.editStuDiaVisible=true
        // console.log(row)
      },
      ...mapMutations(["updateCurrentStatus"])
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

</style>
