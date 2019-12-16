<template>
  <el-menu
    :default-active="mainActiveIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#2a3f54"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>


    <el-menu-item>
      <div @click="isCollapse=!isCollapse">
        <i class="el-icon-d-arrow-right"></i>
        <span slot="title">展开/关闭菜单</span>
      </div>
    </el-menu-item>

    <!--    <template v-for="(operation,index) in childRoute" v-if="index === activeRoute">-->
    <template v-for="(operation,index) in childRoute" v-if="index === activeRoute &&　operation.children">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">{{operation.meta.text}}</span>
        </template>
        <el-menu-item-group>
          <span slot="title">操作菜单</span>
          <el-menu-item :index=child.path :key=index v-for="(child,index) in operation.children">{{child.meta.text}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>


    <el-menu-item  @click="logOut" index="/login">
      <i class="el-icon-circle-close"></i>
      <span slot="title">退出登录</span>
    </el-menu-item>
  </el-menu>

</template>

<script>
  import routes from "../router/routes";
  import {mapState, mapMutations} from "vuex";
  import store from '../store/store'

  export default {
    name: "SideBar",
    store,
    data() {
      return {
        isCollapse: false,
        childRoute: routes,
        mainActiveIndex: ""
      };
    },
    computed: {
      ...mapState(["activeRoute"])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toogleCollapse(event) {
      },
      logOut() {
        // localStorage.token = "";
        // localStorage.teamleader = ""
        localStorage.clear()
        history.go(0)
      },

    },
    beforeCreate() {
      this.childRoute = this.routes
    },

    mounted() {

    },
    created() {
      // this.mainActiveIndex = window.location.hash.substring(1);
      this.mainActiveIndex = window.location.pathname;
      console.log(this.mainActiveIndex)
    }
  }
</script>

<style>
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
