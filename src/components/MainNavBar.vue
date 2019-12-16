<template>
  <el-menu
    :default-active="mainActiveIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#2a3f54"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>

    <!--        <el-menu-item-->
    <!--          :index=routerInfo.path-->
    <!--          v-for="(routerInfo,index) in mainRouterSet"-->
    <!--          :key="index"-->
    <!--          v-if="!routerInfo.children"-->
    <!--        @click="sout">-->
    <!--          {{routerInfo.meta.text}}-->
    <!--        </el-menu-item>-->


    <el-menu-item
      :index=routerInfo.path
      v-for="(routerInfo,index) in mainRouterSet"
      :key="index"
      :activeRoute="index"
      @click="sout($event)">
      {{routerInfo.meta.text}}
    </el-menu-item>


    <!--    加载子菜单-->
    <!--    <template-->
    <!--      v-if="routerInfo.children"-->
    <!--      v-for="(routerInfo) in mainRouterSet">-->
    <!--      <el-submenu index="">-->
    <!--        <template slot="title">{{routerInfo.meta.text}}</template>-->
    <!--        <el-menu-item-->
    <!--          :index="child.path"-->
    <!--          v-for="(child,index) in routerInfo.children"-->
    <!--          :key="index">-->
    <!--          {{child.meta.text}}-->
    <!--        </el-menu-item>-->
    <!--      </el-submenu>-->
    <!--    </template>-->

  </el-menu>
</template>

<script>
  import routes from "../router/routes";
  import {mapMutations} from "vuex";
  import store from '../store/store'

  export default {
    name: "MainNavBar",
    store,
    data() {
      return {
        mainRouterSet: routes,
        mainActiveIndex: ""
      }
    },
    methods: {
      sout(event) {
        this.newActiveRoute(event.$attrs.activeRoute)
      },
      ...mapMutations(["newActiveRoute"])
    },
    created() {
      // this.mainActiveIndex = window.location.hash.substring(1);
      this.mainActiveIndex = window.location.pathname;
      console.log(this.mainActiveIndex)
    }
  }
</script>

<style scoped>

  el-menu {
    border-right-width: 0;
  }
</style>
