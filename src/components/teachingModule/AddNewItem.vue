<template>
  <div>
    <el-button :disabled="isDisabled" @click="showDiagram" >添加Module</el-button>
    <DialogForm ref="dialogVisible"></DialogForm>
  </div>
</template>

<script>
  import DialogForm from "./DialogForm";
  import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "AddNewItem",
    store,
    data() {
      return {
        outerVisible: false,
        isDisabled: true
      }
    },
    components: {DialogForm},
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      showDiagram() {
        this.$refs.dialogVisible.outerVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
