<template>
  <div style="display: inline;">
    <el-popover
      placement="bottom"
      title="请选择操作:"
      width="100"
      trigger="click">
      <div style="text-align: center">
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<!--        <el-button slot="reference" type="text" @click="newSchool">添加新学院</el-button>-->
        <el-button slot="reference" type="text" @click="openDialog('1')">添加新学院</el-button>
<!--        <el-button slot="reference" type="text" @click="editSchoolName">修改学院名称</el-button>-->
        <el-button slot="reference" type="text" @click="openDialog('2')">修改学院名称</el-button>
<!--        <el-button slot="reference" type="text" @click="newClass">添加新班级</el-button>-->
        <el-button slot="reference" type="text" @click="openDialog('3')">添加新班级</el-button>
        <br/>
        <el-popconfirm
          confirmButtonText='确定'
          cancelButtonText='取消'
          icon="el-icon-info"
          iconColor="red"
          title="确定删除整个学院吗？"
          @onConfirm="removeSchool">
          <el-button slot="reference" type="text">删除学院</el-button>
        </el-popconfirm>
      </div>
      <el-button slot="reference" style="float: right; padding: 3px 0" type="text">操作</el-button>

    </el-popover>
    <OperationDialog ref="dialog" :school-id="schoolId" :school-name="schoolName" @freshList="emitEvent"></OperationDialog>
  </div>
</template>

<script>
  import OperationDialog from "./OperationDialog";

  export default {
    name: "SchoolOperation",
    data() {
      return {
        visible: false,
      }
    },
    props: ['schoolId', "schoolName"],
    components: {OperationDialog},
    methods: {

      emitEvent(){
        this.$emit('freshList');
      },

      newSchool() {
        this.axios({
          url: "/school",
          method: "put",
          params: {
            name: "newSchoolName"
          }
        })
          .then(response => {

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
            name: "newSchool",
            id: this.schoolId
          }
        })
          .then(response => {
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
            classId: "1601088",
            schoolId: this.schoolId
          }
        })
          .then(response => {
            console.log(response)
            this.util.feedbackInfo(this, response.data);
            this.$emit('freshList');
          })
          .catch(err => {
            console.log(err)
          })
      },

      removeSchool() {
        this.axios({
          url: "/school",
          method: "delete",
          params: {
            id: this.schoolId
          }
        })
          .then(response => {
            this.util.feedbackInfo(this, response.data);
            this.$emit('freshList');
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },

      openDialog(code){
        this.$refs.dialog.btnType=code;
        this.$refs.dialog.dialogVisible=true
      }
    }
  }
</script>

<style scoped>

</style>
