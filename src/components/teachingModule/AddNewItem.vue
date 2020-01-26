<template>
  <div>
    <!--    <el-button :disabled="isDisabled" @click="showDiagram" >添加Module</el-button>-->
    <el-button @click="showDiagram">{{btnText}}</el-button>

    <!--    与添加Course相关的dialog-->
    <CourseInfoDialog ref="newCourseDialog"></CourseInfoDialog>

    <!--    与添加module相关的dialog-->
    <ModuleInfoDialog ref="newModuleDialog"></ModuleInfoDialog>

    <!--    与添加学生相关的dialog-->
    <StuInfoDialog ref="newStuDialog"></StuInfoDialog>


  </div>
</template>

<script>
  import ModuleInfoDialog from "./ModuleInfoDialog";
  import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";
  import StuInfoDialog from "../Administration/StuInfoDialog";
  import CourseInfoDialog from "./CourseInfoDialog";

  export default {
    name: "AddNewItem",
    store,
    data() {
      return {
        outerVisible: false,
        isDisabled: true,
        btnText: "",//决定要在按钮上显示什么字
        targetDia: ""//决定要显示哪个dialog
      }
    },
    props: ['btnVal'],
    components: {ModuleInfoDialog, StuInfoDialog,CourseInfoDialog},
    computed: {
      ...mapState(["multipleSelection", "btnFamily"])
    },
    methods: {
      showDiagram() {
        // this.$refs.dialogVisible.outerVisible = true;
        // console.log(this.multipleSelection)
        if (this.btnFamily === 5 && !this.multipleSelection) {//这个后面要改
          this.$message({
            message: "请选择要添加module的project",
            type: "error",
            duration: 1500,
            showClose: true
          });
          return
        }
        this.$refs[this.targetDia].dialogFormVisible = true;
      },
      ...mapMutations(["updateCurrentStatus"])
    },
    beforeMount() {
      switch (this.btnFamily) {
        case 0 :
          this.btnText = "添加学生";
          this.targetDia = "newStuDialog";
          break;
        case 5 :
          this.btnText = "添加Module";
          this.targetDia = "newModuleDialog";
          break;
        case 10 :
          this.btnText = "添加课程";
          this.targetDia = "newCourseDialog";
          break;

      }
    }
  }
</script>

<style scoped>

</style>
