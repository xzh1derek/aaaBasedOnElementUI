<!--院班管理 菜单中操作按键下 '子按键' 的详细内容dialog-->
<template>
  <el-dialog
    :title=title
    :visible.sync="dialogVisible"
    width="30%">

    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=onConfirmFunc>确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "OperationDialog",
    data() {
      return {
        dialogVisible: false,
        title: "",    //动态绑定Dialog的title
        btnType: "",  // 1-->newSchool   2-->editSchoolName    3-->newClass
        input: "",    //和el-input框双向绑定
        onConfirmFunc:{},//动态绑定点击确定按钮时,执行什么操作.是函数人柱力
      }
    },
    props: ['schoolId', "schoolName"],
    watch: {
      dialogVisible(newVal) {
        if (newVal === false) {
          console.log("it changed")
          this.input = ""
        }
      }
    },
    methods: {

      newSchool() {
        this.axios({
          url: "/school",
          method: "put",
          params: {
            name: this.input
          }
        })
          .then(response => {
            this.dialogVisible = false
            this.util.feedbackInfo(this, response.data)
            this.$emit('freshList');
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },

      editSchoolName() {
        this.axios({
          url: "/school",
          method: "post",
          params: {
            name: this.input,
            id: this.schoolId
          }
        })
          .then(response => {
            this.dialogVisible = false
            this.util.feedbackInfo(this, response.data);
            this.$emit('freshList');
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },

      newClass() {
        this.axios({
          url: "/class",
          method: "put",
          params: {
            classId: this.input,
            schoolId: this.schoolId
          }
        })
          .then(response => {
            this.dialogVisible = false
            this.util.feedbackInfo(this, response.data);
            this.$emit('freshList');
          })
          .catch(err => {
            console.log(err)
          })
      },

    },

    beforeUpdate() {
      switch (this.btnType) {
        case "1":
          this.title = "请输入新学院名称";
          this.onConfirmFunc = this.newSchool;
          break;
        case "2":
          this.title = "请输入学院新名称";
          this.onConfirmFunc = this.editSchoolName;
          break;
        case "3":
          this.title = "请输入新班级编号";
          this.onConfirmFunc = this.newClass;
          break;
      }
    }

  }


</script>

<style scoped>

</style>
