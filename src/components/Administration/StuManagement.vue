<template>
  <div>
    <el-table :data="stuList"
              style=" width: 100% "
              stripe
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
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
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination @rewriteList="getListData" target-url1="/students" target-url2="/students/pages"></Pagination>
  </div>
</template>

<script>
  import Pagination from "../teachingModule/Pagination";

  export default {
    name: "StuManagement",
    data() {
      return {
        stuList: [],
      }
    },
    components: {Pagination},
    methods: {
      getListData(data) {
        this.stuList = data
      }
    },
  }
</script>

<style scoped>

</style>
