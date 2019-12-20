<template>
  <div>
    <el-button type="danger" @click="showForm" :disabled="isDisabled">编辑</el-button>
    <EditForm ref="editForm"></EditForm>
  </div>
</template>

<script>
  import EditForm from "./EditForm";

  export default {
    name: "EditItem",
    data(){
      return{
        isDisabled:false
      }
    },
    components: {EditForm},
    methods: {
      editItem() {
        this.axios({
          method: "post",
          url: "module/update",
          params: {}
        })
          .then(response => {

          })
          .catch(err => {

          })
      },
      showForm() {
        this.$refs.editForm.outerVisible = true
      }

    }
  }
</script>

<style scoped>

</style>
