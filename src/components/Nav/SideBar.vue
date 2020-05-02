<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#2a3f54"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    style="height: 100vh;">
    <el-menu-item>
      <img src="/static/image/logo_tran@50px.png" alt="西安电子科技大学" @click="toHomepage" style="width: 100%;height: 70%">
    </el-menu-item>

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

    <div style="position: fixed;bottom: 0;width: 200px">
      <el-menu-item @click="logOut" index="/login">
        <i class="el-icon-circle-close"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </div>
  </el-menu>

</template>

<script>
  import routes from "../../router/routes";
  import {mapState, mapMutations} from "vuex";
  import store from '../../store/store'

  export default {
    name: "SideBar",
    store,
    data() {
      return {
        isCollapse: false,
        childRoute: routes.filter(item => item.meta.nav === true),
      };
    },
    computed: {
      ...mapState(["activeRoute"])
    },
    methods: {
      logOut() {
        this.axios({
          method: "post",
          url: "/logout",
        })
          .then(response => {
            if (response.data === 0) {
              localStorage.clear()
              history.go(0)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      toHomepage() {
        this.$router.push("/user/info/")
      }
    },
    beforeCreate() {
      this.childRoute = this.routes
    },
    mounted() {
      console.log(this)
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
