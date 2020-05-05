<template>
  <div>
    <div id="nav">
      <a href="">
        <img src="../../static/image/login.png" alt="logo ">
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

          <el-button type="primary" @click="loginSystem">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode === 13) { // 按 Esc

    }
  };

  export default {
    name: "login",
    data() {
      return {
        form: {
          username: "",
          password: "",
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
            self.userInfoToOpe = self.userInfoData//更改vuex里面的数据据
          }))
          .catch(err => {
            localStorage.token = ""
          })
      },


      loginSystem() {
        let self = this
        this.axios({
          method: "post",
          url: "/login",
          params: {
            username: this.form.username,
            // password: this.$md5(this.form.password),
            password: this.form.password,
          }
        })
          .then((response) => {
            console.log("登录成功")
            console.log(response)
            localStorage.token = self.form.username//先把用户账号存起来

            if (response.data === "f" || response.data === "n") {
              localStorage.token = "";
              self.$message({
                message: "登录失败,账号或密码错误",
                type: "error",
                duration: 1500,
                showClose: true
              })
              return;
            }

            console.log(response)
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            // localStorage.userInfo = response.data
            location.href = "/user/info/"//登录成功后跳转

          })
          .catch(err => {
            console.log("有错误")
            console.log(err)
          })
      },

    },
    // created: function() {//监听回车事件
    //   let self = this;
    //   document.onkeydown = function(e) {
    //     let key = window.event.keyCode;
    //     if (key === 13) {
    //       self.loginSystem();
    //     }
    //   };
    // },

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
    background-image: url("../../static/image/bg.jpg");
    display: flex;
    flex-direction: row;
  }

  #side {
    /*border: 1px solid black;*/
    width: 50px;
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
