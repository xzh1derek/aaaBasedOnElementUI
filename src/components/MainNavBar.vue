<template>
  <el-menu
    :default-active="mainActiveIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#2a3f54"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>

    <el-menu-item
      :index=routerInfo.path
      v-for="routerInfo in mainRouterSet"
      :key="routerInfo.meta.key"
      v-if="!routerInfo.children">
      {{routerInfo.meta.text}}
    </el-menu-item>

    <template
      v-if="routerInfo.children"
      v-for="routerInfo in mainRouterSet">
      <el-submenu index="">
        <template slot="title">{{routerInfo.meta.text}}</template>
        <el-menu-item
          :index="child.path"
          v-for="child in routerInfo.children">
            {{child.meta.text}}
        </el-menu-item>
      </el-submenu>
    </template>


    <!--    <el-menu-item :index=routerInfo.path v-for="routerInfo in mainRouterSet" :key="routerInfo.meta.key">-->
    <!--&lt;!&ndash;      如果当前路由有子路由&ndash;&gt;-->
    <!--      <template slot="title" v-if="!routerInfo.children">{{routerInfo.meta.text}}</template>-->
    <!--&lt;!&ndash;      如果当前路由没有子路由&ndash;&gt;-->
    <!--      <template v-if="routerInfo.children">-->
    <!--              <el-submenu>-->
    <!--                <template slot="title">{{routerInfo.meta.text}}</template>-->
    <!--                      <el-menu-item v-if="routerInfo.children" :index=children.path v-for="children in routerInfo.children" :key="children.meta.key" >-->
    <!--&lt;!&ndash;                        {{children.meta.text}}&ndash;&gt;12346-->
    <!--                      </el-menu-item>-->
    <!--              </el-submenu>-->
    <!--      </template>-->
    <!--    </el-menu-item>-->
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

  el-menu {
    border-right-width: 0;
  }
</style>
