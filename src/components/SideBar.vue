<template>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#2a3f54"
             text-color="#fff"
             active-text-color="#ffd04b">

      <el-menu-item index="1">
          <div @click="isCollapse=!isCollapse">
            <i class="el-icon-d-arrow-right" ></i>
            <span slot="title">展开/关闭菜单</span>
          </div>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-custom"></i>
        <span slot="title">我的</span>
      </el-menu-item>
      <el-menu-item index="6" @click="logOut">
        <i class="el-icon-circle-close"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    name: "SideBar",
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toogleCollapse(event){
      },
      logOut(){
        localStorage.token="";
        localStorage.teamleader=""
        // location.href="#/login"
        history.go(0)
      }
    }
  }
</script>

<style >
  .el-menu {
    border-right-width: 0;
  }
  el-menu {
    border-right-width: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
