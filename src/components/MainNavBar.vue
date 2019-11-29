<template>
  <el-menu
    :default-active="mainActiveIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item :index=routerInfo.path v-for="routerInfo in mainRouterSet" :key="routerInfo.meta.key">
      {{routerInfo.meta.text}}
    </el-menu-item>
  </el-menu>
</template>

<script>
  import routes from "../router/routes";
  export default {
    name: "MainNavBar",
    data() {
      return {
        mainRouterSet: routes,
        mainActiveIndex: ""
      }
    },
    created() {
      this.mainActiveIndex = window.location.hash.substring(1);
    }
  }
</script>

<style scoped>

</style>
