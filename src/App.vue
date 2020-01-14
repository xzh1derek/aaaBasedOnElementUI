<template>
  <div>
    <div id="container" style="background-color: #d1f1ee">
      <SideBar v-if="this.loginUser"></SideBar>
      <div id="rightSide" style="overflow: hidden">
        <div id="header" v-if="this.loginUser">
          <MainNavBar></MainNavBar>
        </div>
        <div id="content" style="padding-left: 20px;padding-right: 20px;padding-top: 20px;" >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  import navbar from "./components/teamModule/navbar";
  import userInfo from "./components/userInfo";
  import teamOperate from "./components/teamModule/teamOperate";
  import store from './store/store'
  import {mapState, mapMutations} from 'vuex'
  import MainNavBar from "./components/MainNavBar";
  import SideBar from "./components/SideBar";
  import Login from "./components/Login";

  export default {
    name: 'App',
    components: {navbar, userInfo, teamOperate, MainNavBar, SideBar, Login},
    store,
    data() {
      return {
        userInfoToOpe: null,//传给组件的值,通过create钩子函数初始化,这里要写成null,不能写成{},否则会被判为true
        loginUser: "",

      }
    },
    // watch: {
    //   loginUser() {
    //     var self = this;
    //
    //     function getUserInfo() {
    //       return self.axios({
    //         method: "post",
    //         url: "/userInfo",
    //         params: {
    //           userId: self.loginUser//得改
    //           // userId: "1601"//得改
    //         }
    //       })
    //     }
    //
    //     function getTeamInfo() {
    //       return self.axios({
    //         method: "get",
    //         url: "/search",
    //         params: {
    //           leader: self.loginUser//得改
    //         }
    //       })
    //     }
    //
    //     self.axios.all([getUserInfo()])
    //       .then(self.axios.spread(function (acct) {
    //         //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
    //         self.initUserInfo(acct.data);
    //
    //         self.userInfoToOpe = self.userInfoData
    //       }))
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   }
    // },
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      ...mapMutations(['initUserInfo', "updateTeam"])
    },
    mounted() {
      this.loginUser = localStorage.token
      var self = this

      //当用户登陆后
      if (this.loginUser) {

        function getUserInfo() {
          return self.axios({
            method: "post",
            url: "/userInfo",
            params: {
              userId: self.loginUser
            }
          })
        }

        self.axios.all([getUserInfo()])
          .then(self.axios.spread(function (acct) {
            //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
            self.initUserInfo(acct.data);
          }))
          .catch(err => {
            console.log(err)
          })
      } else {
        //如果用户没有登录,那么直接返回登录界面
        location.href = "#/login"
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }


  #app {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  #info {
    background-color: #5b5a57;
    width: 240px;
    padding: 20px;
  }

  #right {
    overflow: hidden;
    flex: 1;
  }

  #nav {
    /*background-color: #0bfffc;*/
    /*height: 50px;*/
  }

  /*#view {*/
  /*  overflow: auto;*/
  /*}*/

  .formInput {
    margin-bottom: 10px;
  }

  thead {
    font-weight: bold;
  }

  #container {
    display: flex;
    flex-direction: row;
  }

  #sidebar {
    max-width: 250px;
  }

  #rightSide {
    flex: 1;
    height: 850px;
  }
</style>
