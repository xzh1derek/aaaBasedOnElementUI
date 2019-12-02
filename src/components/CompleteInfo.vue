<template>
  <div style="text-align:center;margin:10px 0 10px 0">
    <el-input v-model="username" placeholder="请输入学号" style="width:30%;margin:10px 0 10px 0" readonly ></el-input>
    <br>
    <el-input v-model="password" placeholder="请输入密码" style="width:30%;margin:10px 0 10px 0"></el-input>
    <br>
    <el-input v-model="name" placeholder="请输入姓名" style="width:30%;margin:10px 0 10px 0"></el-input>
    <br>
    <el-input v-model="qq" placeholder="请输入QQ" style="width:30%;margin:10px 0 10px 0"></el-input>
    <br>
    <template>
      <el-select v-model="school" placeholder="请选择学院信息" style="width:30%;margin:10px 0 10px 0">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </template>
    <br>
    <el-button type="primary" @click="completeInfoInsert">完成</el-button>
  </div>
</template>

<script>
  export default {
    name: "CompleteInfo",
    data() {
      return {
        username: localStorage.token,
        password: "",
        name: "",
        qq: "",
        school: "",
        options: [{
          value: '通信工程学院',
          label: '通信工程学院'
        }, {
          value: '电子工程学院',
          label: '电子工程学院'
        }, {
          value: '计算机科学与技术学院',
          label: '计算机科学与技术学院'
        }],
      }
    },
    methods: {
      completeInfoInsert() {
        this.axios({
          method: "post",
          url: "/registry",
          params: {
            "username": parseInt(this.username),
            "name": this.name,
            "password": this.password,
            "school": this.school,
            "qq": this.qq,
          }
        })
          .then((response) => {
            let self = this
            //缺个跳转
            self.$message({
              message: "操作成功,请重新登录",
              type: "successful",
              duration: 1500,
              showClose: true
            })
            location.href="#/login"
          })
          .catch((err) => {
            self.$message({
              message: "操作失败!请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
