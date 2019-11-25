<template>
  <div id="app">
    <!--    侧边栏-->
    <div id="info">
      <userInfo></userInfo>
<!--      <teamOperate></teamOperate>-->
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
  </div>
</template>


<script>
  import navbar from "./components/navbar";
  import userInfo from "./components/userInfo";
  import teamOperate from "./components/teamOperate";
  import store from './store/store'

  export default {
    name: 'App',
    components: {navbar, userInfo, teamOperate},
    store,
    data() {
      return {
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
    background-color: #a4e6e9;
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
