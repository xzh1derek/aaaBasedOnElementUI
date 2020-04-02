<template>
  <div>
    <!--    <el-button :disabled="isDisabled" @click="showDiagram" >添加Module</el-button>-->
    <el-button @click="showDiagram" :disabled="isDisabled">{{btnText}}</el-button>

    <!--    与添加Course相关的dialog-->
    <CourseInfoDialog ref="newCourseDialog"></CourseInfoDialog>

    <!--    与添加Project相关的dialog-->
    <ProjectInfoDialog ref="newProjectDialog"></ProjectInfoDialog>

    <!--    与添加module相关的dialog-->
    <ModuleInfoDialog ref="newModuleDialog"></ModuleInfoDialog>

    <!--    与添加学生相关的dialog-->
    <StuInfoDialog ref="newStuDialog"></StuInfoDialog>


  </div>
</template>

<script>
  import ModuleInfoDialog from "../../teachingModule/ModulePart/ModuleInfoDialog";
  import store from '../../../store/store'
  import {mapState, mapMutations} from "vuex";
  import StuInfoDialog from "../../Administration/StuInfoDialog";
  import CourseInfoDialog from "../../teachingModule/Course/CourseInfoDialog";
  import ProjectInfoDialog from "../../teachingModule/ProjectPart/ProjectInfoDialog";

  export default {
    name: "AddNewItem",
    store,
    data() {
      return {
        outerVisible: false,
        isDisabled: false,
        btnText: "",//决定要在按钮上显示什么字
        targetDia: ""//决定要显示哪个dialog
      }
    },
    props: ['btnVal'],
    components: {ModuleInfoDialog, StuInfoDialog, CourseInfoDialog, ProjectInfoDialog},
    watch: {
      multipleSelectionComp(val) {
        if (location.pathname === "/teaching/plan" || location.pathname === "/teaching/schedule") {
          console.log(val)
          this.isDisabled = val.length !== 1
        }
      }
    },
    computed: {
      multipleSelectionComp() {
        return this.multipleSelection
      },
      ...mapState(["btnFamily", "multipleSelection"])
    },
    methods: {
      showDiagram() {
        this.$refs[this.targetDia].dialogFormVisible = true;
      },
      ...mapMutations(["updateCurrentStatus"])
    },
    beforeMount() {
      // 在渲染时,初始化每个按键上的文字和目标dialog
      //一定要用beforeMount 或更早的钩子函数,因为mounted时,页面已经被渲染

      console.log(location.pathname)
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
        case 15 :
          this.btnText = "添加project";
          this.targetDia = "newProjectDialog";
          break;
      }

      if (location.pathname === "/teaching/plan" || location.pathname === "/teaching/schedule") {
        this.isDisabled = true
      }
    }
  }
</script>

<style scoped>

</style>
