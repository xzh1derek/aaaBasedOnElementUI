<template>
  <div>
    <template v-if=isLogin>
      <el-container style="height: 100vh;width: 100vw;">
        <el-aside width="200px">
          <SideBar ></SideBar>
        </el-aside>
        <el-container style="min-width: 730px">
          <el-header style="padding: 0;">
            <MainNavBar></MainNavBar>
          </el-header>
          <el-main style="position: relative;min-width: 730px" >
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </template>

    <template v-else>
      <Login @loginSuccessful="isLogin=true"></Login>
    </template>
  </div>
</template>


<script>

  import navbar from "./components/teamModule/navbar";
  import store from './store/store'
  import MainNavBar from "./components/Nav/MainNavBar";
  import SideBar from "./components/Nav/SideBar";
  import Login from "./components/Login";

  export default {
    name: 'App',
    components: {navbar,  MainNavBar, SideBar, Login},
    store,
    data() {
      return {
        userInfoToOpe: null,//传给组件的值,通过create钩子函数初始化,这里要写成null,不能写成{},否则会被判为true
        loginUser: "",
        isLogin:false
      }
    },
    watch: {

    },
    computed: {
      // isLogin() {
      //   if (localStorage.token1) {
      //     return true
      //   } else {
      //     return false
      //   }
      // },
    },

    beforeMount() {
      this.loginUser = localStorage.token1
      }
    }

</script>

<style>

  html, body {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
  }

  .el-container {
    background-color: #ffffff
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
    height: 5000px;
  }


  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-main {
    padding: 20px;
    margin-bottom: 20px;
  }
</style>
