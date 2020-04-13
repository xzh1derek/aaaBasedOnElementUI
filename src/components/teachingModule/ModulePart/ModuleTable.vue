<!--显示project下module相关详细信息-->

<template>
  <div>
    <el-table :data=moduleListInfo.modules size="mini"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :cell-style="cellStyle"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="ModuleID" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180"></el-table-column>
      <el-table-column prop="location" label="地点" width="180"></el-table-column>
      <el-table-column prop="class1" label="绑定班级1" width="180"></el-table-column>
      <el-table-column prop="class2" label="绑定班级2" width="180"></el-table-column>
      <el-table-column prop="cur_num" label="已选课人数" width="180"></el-table-column>
      <el-table-column prop="stu_num" label="学生数" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click.native.prevent="" type="text" size="small">导出学生名单</el-button>
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
    computed: {
      ...mapState(["innerMultipleSelection"])
    },
    methods: {
      cellStyle(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色
        return 'background:floralwhite'
      },
      handleSelectionChange(data) {
        //如果选择了相应的课程,就修改Vuex里的 multipleSelection 内容
        let payload = {
          targetKey:"innerMultipleSelection",
          targetVal:data
        }
        this.updateCurrentStatus(payload)
      },
      getModuleId(row) {
        console.log(row)
        this.moduleId = row.id;
        this.dialogVisible=true
      },
      ...mapMutations(["updateCurrentStatus"])
    },
  }
</script>

<style scoped>

</style>
