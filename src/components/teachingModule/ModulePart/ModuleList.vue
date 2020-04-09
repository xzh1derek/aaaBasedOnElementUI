<!--显示project信息列表和相关操作按键  (module信息通过moduleTable组件显示)-->
<template>
  <div>

    <CommonOperation></CommonOperation>

    <el-table :data=moduleListInfo
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column type="selection" fixed></el-table-column>

      <!--可展开的部分-->
      <el-table-column type="expand" label="Module相关" width="180">
        <template slot-scope="scope">
          <ModuleTable :moduleListInfo="moduleListInfo[scope.$index]"></ModuleTable>
        </template>
      </el-table-column>
      <el-table-column prop="project_index" label="Project索引" width="180"></el-table-column>
      <el-table-column prop="project_name" label="Project名称" width="180"></el-table-column>
      <el-table-column prop="hours" label="Project学时" width="180"></el-table-column>
      <el-table-column prop="is_fixed" :formatter="formatBoolean" label="固定排课?" width="180"></el-table-column>
      <el-table-column prop="course.course_code" label="相关课程编号" width="180"></el-table-column>
      <el-table-column prop="course.course_name" label="相关课程名称" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ModuleTable from "./ModuleTable";
  import CommonOperation from "../../common/CommonOperation";
  import store from '../../../store/store'
  import {mapMutations} from "vuex";

  export default {
    name: "ModuleList",
    store,
    data() {
      return {
        moduleListInfo: [],//通过mounted获得
      }
    },
    components: {ModuleTable, CommonOperation},
    methods: {
      //获取所有的module
      getModuleList() {
        this.axios({
          method: "get",
          url: "/module",
          params: {}
        })
          .then(response => {
            //把获取到的值赋值给组件的 moduleListInfo
            this.moduleListInfo = response.data
          })
          .catch(err => {
            console.log(err)
          })
      },

      handleSelectionChange(data) {
        //如果选择了相应的课程,就修改Vuex里的 multipleSelection 内容
        this.updateSelection(data);
      },

      //格式化bool显示
      formatBoolean() {
        //arguments的第三个元素就是本行显示的内容
        return arguments[2] === true ? "是" : "否"
      },


      ...mapMutations(['updateSelection'])
    },
    mounted() {
      this.getModuleList()
    }
  }
</script>

<style scoped>

</style>
