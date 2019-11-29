<template>
  <div style="text-align:center;margin:10px 0 10px 0">
    <el-input v-model="username" placeholder="请输入学号" style="width:50%;margin:10px 0 10px 0"></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password style="width:50%;margin:10px 0 10px 0"></el-input>
    <br>
    <el-button type="primary" @click="loginSys">登录</el-button>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      loginSys() {
        this.axios({
          method: "post",
          url: "/login",
          params: {
            username: this.username,
            password: this.password
          }
        })
          .then((response) => {
            let self = this
            // "n":学号不存在
            // "f":密码错误
            // "i":登录成功
            // "r":登录成功,转入信息完善界面
            localStorage.token = this.username
            if (response.data === "r") {
              self.$message({
                message: "验证成功!请先完善个人信息",
                type: "waring",
                duration: 1500,
                showClose: true
              })
              location.href = "http://localhost:8081/complete#/complete"
            } else if (response.data === "i") {
              location.href=""//登录成功后跳转
            } else if (response.data === "n") {
              self.$message({
                message: "用户不存在",
                type: "error",
                duration: 1500,
                showClose: true
              })
            } else if (response.data === "f") {
              self.$message({
                message: "密码错误",
                type: "error",
                duration: 1500,
                showClose: true
              })
            }
            console.log(response)
          })
          .catch((err) => {
          })
      }
    }
  }
</script>

<style scoped>

</style>
