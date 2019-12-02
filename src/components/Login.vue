<template>
  <div>
    <div id="nav">
      <a href="">
      <img src="../../static/image/login.png" alt="logo">
      </a>
    </div>
    <div id="container">
      <div id="side"></div>
      <div id="login">
        <div style="text-align:center;margin:10px 0;">
          <el-input v-model="form.username" placeholder="请输入学号" style="width:50%;margin:10px 0"></el-input>
          <el-input placeholder="请输入密码" v-model="form.password" show-password
                    style="width:50%;margin:10px 0 "></el-input>
          <br>
          <div style="margin: 10px 0">
            <el-radio-group v-model="form.radio" size="medium">
              <el-radio-button label="学生"></el-radio-button>
              <el-radio-button label="老师"></el-radio-button>
              <el-radio-button label="管理员"></el-radio-button>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="loginSys">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "login",
    data() {
      return {
        form: {
          username: "",
          password: "",
          radio: "学生"
        }
      }
    },
    methods: {
      initInformation() {
        var self = this

        function getUserInfo() {
          return self.axios({
            method: "post",
            url: "/userInfo",
            params: {
              userId: localStorage.token//得改
            }
          })
        }

        function getTeamInfo() {
          return self.axios({
            method: "get",
            url: "/search",
            params: {
              leader: localStorage.token//得改
            }
          })
        }

        self.axios.all([getUserInfo(), getTeamInfo()])
          .then(self.axios.spread(function (acct, perms) {
            //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
            self.initUserInfo(acct.data);
            if (perms.data) {
              self.updateTeam(perms.data);
            }
            // localStorage.teamleader= self.userInfoData.teamleader
            self.userInfoToOpe = self.userInfoData//更改vuex里面的数据据
          }))
          .catch(err => {
            localStorage.token = ""
          })
      },
      loginSys() {
        let self = this
        this.axios({
          method: "post",
          url: "/login",
          params: {
            username: this.form.username,
            password: this.form.password,
            // identify: this.radio
          }
        })
          .then((response) => {
            localStorage.token = self.form.username//先把用户账号存起来
            console.log("self.form.username:" + self.form.username)
            console.log("localStorage.token:" + localStorage.token)

            if (response.data === "r") {
              self.$message({
                message: "验证成功!请先完善个人信息",
                type: "waring",
                duration: 1500,
                showClose: true
              })
              self.initInformation();
              console.log("请完善信息")
              location.href = "http://localhost:8081/#/complete"
            } else if (response.data === "i") {
              console.log("验证通过")
              location.href = ""//登录成功后跳转
            } else if (response.data === "n") {
              self.$message({
                message: "用户不存在",
                type: "error",
                duration: 1500,
                showClose: true
              })
              localStorage.token=""
            } else if (response.data === "f") {
              self.$message({
                message: "密码错误",
                type: "error",
                duration: 1500,
                showClose: true
              })
              localStorage.token=""
            }

            //验证通过后获取用户信息
            self.axios({
              method: "post",
              url: "/userInfo",
              params: {
                userId: localStorage.token//得改
              }
            })



            // "n":学号不存在
            // "f":密码错误
            // "i":登录成功
            // "r":登录成功,转入信息完善界面
          })
          .then(response => {
            console.log("获取队长id")
            localStorage.teamleader = self.userInfoData.teamleader

            self.axios({
              method: "get",
              url: "/search",
              params: {
                leader: localStorage.teamleader//得改
              }
            })



            location.href = "http://localhost:8081/#/"

          })
          .catch((err) => {
          })
          .catch(err => {
          })
      }
    }
  }
</script>

<style scoped>

  #nav {
    width: 100%;
    height: 70px;
    padding: 10px 100px;
    /*background-color: #bce8f1;*/
    box-sizing: border-box;
    /*border: 1px solid black;*/
  }

  #container {
    /*border: 1px solid black;*/
    background-image:url("../../static/image/bg.jpg") ;
    display: flex;
    flex-direction: row;
  }

  #side {
    /*border: 1px solid black;*/
    width: 800px;
    height: 600px;
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    /*background-image: url("../../static/image/welcome.jpg");*/
    background-repeat: no-repeat;
    background-size: cover;
  }

  #login {
    /*border: 2px solid black;*/
    flex: 1;
    margin: auto;
    padding: 30px;
  }
</style>
