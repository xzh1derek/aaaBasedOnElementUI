<template>
  <div>
    <el-table :data=moduleListInfo.modules size="mini"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :cell-style="cellStyle"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="id" label="ModuleID" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180"></el-table-column>
      <el-table-column prop="location" label="地点" width="180"></el-table-column>
      <el-table-column prop="stu_num" label="学生数" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click.native.prevent="" type="text" size="small">导出学生名单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ModuleTable",
    props: ['moduleListInfo'],
    methods: {
      cellStyle(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色
        return 'background:floralwhite'
      },
      handleSelectionChange(data) {
        //如果选择了相应的课程,就修改Vuex里的 multipleSelection 内容
        // this.updateSelection(data);
      },
    },
    destroyed() {
      console.log("溜了 886~~~")
    }
  }
</script>

<style scoped>

</style>
