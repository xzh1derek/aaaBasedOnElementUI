<!--填写  module 相关信息的dialog  包括填写module相关信息和为module绑定班级-->
<template>
  <el-dialog title="填写课程详细信息:" :visible.sync="dialogFormVisible" width="30%">
    <NewModuleDialog @showInner="updateInner" @closeOuter="updateOuter"></NewModuleDialog>
    <el-dialog width="30%" title="添加班级" :visible.sync="innerVisible" append-to-body>
      <BindClasses :bind-id="moduleId" url-target="/module/bind"></BindClasses>
    </el-dialog>
  </el-dialog>

</template>

<script>
  import NewModuleDialog from "./NewModuleDialog";
  import BindClasses from "../../common/Btn/BindClasses";
  import store from '../../../store/store'
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "DialogForm",
    store,
    data() {
      return {
        dialogFormVisible: false,
        innerVisible: false,
        moduleId: ""
      }
    },
    components: {NewModuleDialog, BindClasses},
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      updateInner(data) {
        this.moduleId = data;
        this.innerVisible = true
      },
      updateOuter() {
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>

</style>
