<!--<template>-->

<!--<div>-->
<!--<div id="header">-->
<!--<MainNavBar></MainNavBar>-->
<!--</div>-->
<!--<div id="content">-->
<!--  <userInfo ></userInfo>-->
<!--&lt;!&ndash;  <userInfo :user-info-prop=this.userInfoToOpe v-if="userInfoToOpe"></userInfo>&ndash;&gt;-->
<!--&lt;!&ndash;  <router-view></router-view>&ndash;&gt;-->


<!--</div>-->
<!--<div id="footer"></div>-->
<!--</div>-->


<!--</template>-->


<template xmlns="http://www.w3.org/1999/html">
  <div id="app">
    <!--    侧边栏-->
    <template v-if="userInfoToOpe">
      <div id="info">
        <userInfo :user-info-prop=this.userInfoToOpe></userInfo>
        <teamOperate :user-info-prop=this.userInfoToOpe></teamOperate>
        <el-input
          placeholder="请输入内容"
          v-model.lazy="loginUser"
          clearable>
        </el-input>
      </div>
      <!--    right = nav + view-->
      <div id="right">
        <!--      导航栏-->
        <div id="nav">

          <navbar></navbar>
        </div>
        <!--      信息显示栏-->
        <div id="view">
          <router-view></router-view>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

  import navbar from "./components/teamModule/navbar";
  import userInfo from "./components/userInfo";
  import teamOperate from "./components/teamModule/teamOperate";
  import store from './store/store'
  import {mapState, mapMutations} from 'vuex'
  import MainNavBar from "./components/MainNavBar";

  export default {
    name: 'App',
    components: {navbar, userInfo, teamOperate,MainNavBar},
    store,
    data() {
      return {
        userInfoToOpe: null,//传给组件的值,通过create钩子函数初始化,这里要写成null,不能写成{},否则会被判为true
        loginUser: "16010410030",
      }
    },
    watch:{
      loginUser(){
        var self = this

        function getUserInfo() {
          return self.axios({
            method: "post",
            url: "/userInfo",
            params: {
              userId: self.loginUser//得改
              // userId: "1601"//得改
            }
          })
        }

        function getTeamInfo() {
          return self.axios({
            method: "get",
            url: "/search",
            params: {
              leader: self.loginUser//得改
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
            console.log(perms.data)
            self.userInfoToOpe = self.userInfoData
          }))
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      ...mapMutations(['initUserInfo', "updateTeam"])
    },
    mounted() {
      var self = this

      function getUserInfo() {
        return self.axios({
          method: "post",
          url: "/userInfo",
          params: {
            userId: self.loginUser//得改
            // userId: "1601"//得改
          }
        })
      }

      function getTeamInfo() {
        return self.axios({
          method: "get",
          url: "/search",
          params: {
            leader: self.loginUser//得改
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
          self.userInfoToOpe = self.userInfoData
        }))
        .catch(err => {
          console.log(err)
        })
    },
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

  #view {
    overflow: auto;
  }

  .formInput {
    margin-bottom: 10px;
  }

  thead {
    font-weight: bold;
  }
</style>
