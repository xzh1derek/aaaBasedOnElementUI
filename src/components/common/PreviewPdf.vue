<template>
  <div>
    <div v-if="isShow">
      <button style="position:absolute;right:20px;top:50%;z-index: 2000" @click="showNext">下一篇</button>
      <label>
        <input type="text"
               style="position:absolute;right:300px;top:5px;z-index: 2000"
               placeholder="请输入分数"
               v-model="score">
      </label>
      <button style="position:absolute;right:250px;top:5px;z-index: 2000"
              @click="gradeWork">提交
      </button>
      <button
        style="position:absolute;right:150px;top:5px;z-index: 2000"
        @click="isShow=false"
        title="关闭pdf预览">关闭
      </button>
    </div>
    <embed id="pdfPlayer" :src=url v-if="isShow"
           type="application/pdf" width="100%" height="100%"
           style="position:absolute;

             left: 0;
             top: 0;
             z-index: 1000">
  </div>
</template>

<script>

  export default {

    name: "PreviewPdf",
    props: [],
    data() {
      return {
        isShow: false,
        score: "",
        courseId: "",
        userId: "",
        stuList: [],
        url:""
      }
    },
    watch:{
      isShow(val){
        if (val === true){
          this.getStuList()
        }
      }
    },
    methods: {
      gradeWork() {
        if (isNaN(this.score)) {
          return;
        }
        if (this.score < 0 || this.score > 100) {
          this.util.returnErr.call(this, "请输入合法的数字,介于0-100")
          return;
        }
        this.axios({
          method: "post",
          url: "/task/homework/mark/",
          params: {
            courseId: this.courseId,
            userId: this.userId,
            score: this.score,
            teacherId: 1
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
            } else {
              this.util.returnErr.call(this, "操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getStuList() {
        this.axios({
          method: "get",
          url: "/task/homework/userList/",
          params: {
            courseId: this.courseId
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.stuList = response.data
            } else {
              this.util.returnErr.call(this, "获取数据失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      showNext() {
        let index = this.stuList.indexOf(this.userId)
        console.log(index)
        console.log(this.stuList.length)
        if (index === this.stuList.length - 1 || index === -1) {
          index = -1
          this.util.returnErr.call(this, "将从头循环学生列表")
        }
        this.userId = this.stuList[++index]
        this.url = "/api/task/homework/check/?courseId="+this.courseId+"&userId="+this.userId
      }
    },
  }
</script>

<style scoped>

</style>
