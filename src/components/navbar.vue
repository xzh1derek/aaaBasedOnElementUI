<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item :index=routerInfo.path v-for="routerInfo in routerSet" :key=routerInfo.component>{{routerInfo.meta.text}}</el-menu-item>
    </el-menu>
</template>
<script>
  import routes from "../router/routes";
    export default {
        name: "navbar",
      data() {
        return {
          routerSet: routes
        }
      }

    }
</script>

<style scoped>

</style>
