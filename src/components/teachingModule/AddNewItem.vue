<template>
  <div>
<!--    <el-button :disabled="isDisabled" @click="showDiagram" >添加Module</el-button>-->
    <el-button @click="showDiagram">{{btnText}}</el-button>
    <DialogForm ref="dialogVisible"></DialogForm>
    <StuInfoDialog :ref="targetDia"></StuInfoDialog>
  </div>
</template>

<script>
  import DialogForm from "./DialogForm";
  import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";
  import StuInfoDialog from "../Administration/StuInfoDialog";

  export default {
    name: "AddNewItem",
    store,
    data() {
      return {
        outerVisible: false,
        isDisabled: true,
        btnText:"",//决定要在按钮上显示什么字
        targetDia:""//决定要显示哪个dialog
      }
    },
    props:['btnVal'],
    components: {DialogForm,StuInfoDialog},
    computed: {
      ...mapState(["multipleSelection","btnFamily"])
    },
    methods: {
      showDiagram() {
        // this.$refs.dialogVisible.outerVisible = true;
        // console.log(this.multipleSelection)
        this.$refs[this.targetDia].dialogFormVisible = true;
      },
      ...mapMutations(["updateCurrentStatus"])
    },
    beforeMount() {
      switch (this.btnFamily) {
        case 0 : this.btnText = "添加学生";this.targetDia = "stu" ;break;
        case 2 : this.btnText = "添加学生";break;
        case 3 : this.btnText = "添加学生";break;

      }
    }
  }
</script>

<style scoped>

</style>
