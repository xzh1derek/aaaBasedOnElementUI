<template>
  <div  style="display: inline;">
    <el-popover
      placement="bottom"
      title="请选择操作:"
      width="100"
      trigger="click">

      <div style="text-align: center">
        <!--        <el-button slot="reference" type="text" @click="newSchool">添加新学院</el-button>-->
        <div>
          <el-button slot="reference" type="text" @click="dialogVisible = true">添加教师</el-button>
        </div>
        <!--        <el-button slot="reference" type="text" @click="editSchoolName">修改学院名称</el-button>-->
        <div>
          <el-button slot="reference" type="text" @click="openDialog(2)">设为管理员</el-button>
        </div>
        <!--        <el-button slot="reference" type="text" @click="newClass">添加新班级</el-button>-->
        <div>
          <el-button slot="reference" type="text" @click="openDialog(3)">删除</el-button>
        </div>
        <br/>
      </div>
      <el-button slot="reference" style="float: right; padding: 3px 0" type="text">操作</el-button>

    </el-popover>

    <el-dialog
      title="请填写教师信息"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="teacherInfo" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="teacherInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="teacherInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="teacherInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="checkPass"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="confirmDiaVisible"
      width="30%">

      <span>{{confirmMessage}}</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDiaVisible = false">取 消</el-button>
        <el-button type="primary" @click="operationFunc">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TeacherOperation",
    props: ["teacherId"],
    data() {
      return {
        operationFunc: {},
        dialogVisible: false,
        teacherInfo: {
          username: "",
          name: "",
          password: ""
        },
        checkPass: "",
        confirmDiaVisible: false,
        confirmMessage: ""
      }
    },
    methods: {
      addTeacher() {
        if (!this.teacherInfo.password || this.teacherInfo.password !== this.checkPass) {
          console.log(this.teacherInfo.password)

          this.util.returnErr.call(this, "密码不可为空,且两次输入要一致")
          return
        }
        this.axios({
          method: "post",
          url: "/teachers/add/",
          params: this.teacherInfo
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.dialogVisible = false
              this.$emit("freshList")
            }else {
              this.util.returnErr.call(this,"操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      deleteTeacher() {
        this.axios({
          method: "delete",
          url: "/teachers/delete/",
          params: {
            id: this.teacherId
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.confirmDiaVisible = false
              this.$emit("freshList")
            }else {
              this.util.returnErr.call(this,"操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      authorizeTeacher() {
        this.axios({
          method: "post",
          url: "/teachers/authorize/",
          params: {
            id: this.teacherId
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.confirmDiaVisible = false
              this.$emit("freshList")
            }else {
              this.util.returnErr.call(this,"操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },


      openDialog(checkCode) {
        switch (checkCode) {
          case 1:
            this.operationFunc = this.addTeacher;
            break;
          case 2:
            this.confirmDiaVisible = true
            this.confirmMessage = "确定要授权为管理员吗?";
            this.operationFunc = this.authorizeTeacher
            break;
          case 3:
            this.confirmDiaVisible = true
            this.confirmMessage = "确定要删除该教师吗?";
            this.operationFunc = this.deleteTeacher
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
