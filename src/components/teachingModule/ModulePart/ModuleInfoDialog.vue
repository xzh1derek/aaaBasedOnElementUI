<!--填写  module 相关信息的dialog  包括填写module相关信息和为module绑定班级-->
<template>
  <el-dialog title="填写课程详细信息:" :visible.sync="dialogFormVisible" width="30%">
    <NewModuleDialog @closeOuter="updateOuter" @hasChanged="readyForFresh"></NewModuleDialog>
  </el-dialog>

</template>

<script>
  import NewModuleDialog from "./NewModuleDialog";
  import store from '../../../store/store'
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "DialogForm",
    store,
    data() {
      return {
        dialogFormVisible: false,
        moduleId: ""
      }
    },
    components: {NewModuleDialog },
    computed: {
      ...mapState(["multipleSelection", "readyForRenovate"])
    },
    methods: {
      updateOuter() {
        this.dialogFormVisible = false
      },
      readyForFresh() {
        let payload = {
          targetKey: "readyForRenovate",
          targetVal: !this.readyForRenovate
        }
        console.log("need fresh")
        this.updateCurrentStatus(payload)
      },
      ...mapMutations(["updateCurrentStatus"]),

    }
  }
</script>

<style scoped>

</style>
