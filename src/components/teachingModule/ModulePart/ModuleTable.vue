<!--显示project下module相关详细信息-->

<template>
  <div>
    <el-table :data=moduleListInfo.modules size="mini"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :cell-style="cellStyle"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="ModuleID" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180"></el-table-column>
      <el-table-column prop="location" label="地点" width="180"></el-table-column>
      <el-table-column prop="stu_num" label="学生数" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click.native.prevent="" type="text" size="small">导出学生名单</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="getModuleId(scope.row)" type="text" size="small">绑定班级</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <BindClasses :bind-id="moduleId"   structure-url="/module/classes" limit="1"></BindClasses>
    </el-dialog>

  </div>
</template>

<script>
  import BindClasses from "../../common/Btn/BindClasses";
  // import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";
  export default {
    name: "ModuleTable",
    // store,
    props: ['moduleListInfo'],
    data() {
      return {
        moduleId: "",
        dialogVisible:false
      }
    },
    components: {BindClasses},
    methods: {
      cellStyle(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色
        return 'background:floralwhite'
      },
      handleSelectionChange(data) {
        //如果选择了相应的课程,就修改Vuex里的 multipleSelection 内容
        this.updateTrunk(data[0])
        console.log(data[0])
      },
      getModuleId(row) {
        console.log(row)
        this.moduleId = row.id;
        this.dialogVisible=true
      },
      ...mapMutations(["updateTrunk"])
    },
  }
</script>

<style scoped>

</style>
