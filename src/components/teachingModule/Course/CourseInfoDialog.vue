<template>
  <el-dialog title="填写课程详细信息:" :visible.sync="dialogFormVisible" width="30%">
    <NewCourseDialog @submitSuccess="closeDialog"></NewCourseDialog>
  </el-dialog>
</template>

<script>
  import NewCourseDialog from "./NewCourseDialog";

  export default {
    name: "CourseInfoDialog",
    data() {
      return {
        dialogFormVisible: false,//控制当前dialog是否显示
      }
    },
    components: {NewCourseDialog},
    methods:{
      closeDialog(){
        this.dialogFormVisible=false
      }
    }
  }
</script>

<style scoped>

</style>
