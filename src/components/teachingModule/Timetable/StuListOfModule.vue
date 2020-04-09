<!--查看某个Module已经通过教师筛选的学生列表-->
<template>
  <el-dialog
    title="选择的学生名单"
    :visible.sync="dialogVisible"
    width="60%">
    <el-table :data="stuInfo" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="username" label="学号" width="180"></el-table-column>
      <el-table-column prop="class_id" label="班级" width="180"></el-table-column>
      <el-table-column prop="qq" label="qq"></el-table-column>
      <el-table-column prop="school" label="学院" show-overflow-tooltip></el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <ExportStuList :stu-info="stuInfo" :time-for-class="timeForClass" :date="date"></ExportStuList>
  </span>
  </el-dialog>
</template>


<script>
  import ExportStuList from "./ExportStuList";

  export default {
    name: "StuListOfModule",
    components: {ExportStuList},
    data() {
      return {
        stuInfo: [],
        dialogVisible: false
      }
    },
    props: ["moduleId", "timeForClass", "date"],
    computed: {
      getModuleId() {
        return this.moduleId;
      }
    },
    methods: {
      getStuInfoOfModule() {
        this.axios({
          method: "get",
          url: "/curriculum/students/",
          params: {
            moduleId: this.moduleId
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.stuInfo = response.data
              this.dialogVisible = true
              this.$emit("initModuleId")
            } else {
              this.util.returnErr.bind(this, response.data)
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    },
    watch: {
      getModuleId(newVal, oldVal) {
        if (newVal === -2) {
          return
        }
        this.getStuInfoOfModule()
      }
    },
    mounted() {
      this.getStuInfoOfModule()
    }
  }
</script>

<style scoped>

</style>
