<template>
  <el-dialog title="填写课程详细信息:" :visible.sync="outerVisible" width="30%">
    <NewCourseForm @showInner="updateInner" @closeOuter="updateOuter"></NewCourseForm>


    <el-dialog width="30%" title="添加班级" :visible.sync="innerVisible" append-to-body>
      <BindClasses :bind-id="moduleId" url-target="/module/bind"></BindClasses>
    </el-dialog>
  </el-dialog>

</template>

<script>
  import NewCourseForm from "./NewCourseForm";
  import BindClasses from "./BindClasses";
  import store from '../../store/store'
  import {mapState,mapMutations} from "vuex";

  export default {
    name: "DialogForm",
    store,
    data(){
      return{
        outerVisible:false,
        innerVisible:false,
        moduleId:""
      }
    },
    components: {NewCourseForm, BindClasses},
    computed:{
      ...mapState(["multipleSelection"])
    },
    methods: {
      updateInner(data){
        this.moduleId =data;
        this.innerVisible = true
      },
      updateOuter(){
        this.outerVisible =false
      }
    }
  }
</script>

<style scoped>

</style>
