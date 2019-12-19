<template>
  <el-button type="danger" @click="" :disabled="isDisabled">删除</el-button>
</template>

<script>
  export default {
    name: "DeleteItem",
    data(){
      return{
        isDisabled: true,

      }
    },
    props:['targetUrl'],
    methods:{
      deleteItem() {
        let self = this
        this.axios({
          method: "delete",
          url: this.targetUrl,
          params: {
            courseId: this.multipleSelection[0].id
          }
        })
          .then(response => {
            this.$refs.CourseList.initCourseList();
            this.util.feedbackInfo(self, response.data)
          })
          .catch(err => {
            console.log(err)
          })
      },

    }
  }
</script>

<style scoped>

</style>
