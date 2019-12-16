<template>
  <div >
<!--    <BindClasses></BindClasses>-->
    <router-view></router-view>
  </div>
</template>

<script>
    import BindClasses from "./BindClasses";

    export default {
        name: "TeachingManagement",
      components:{BindClasses}
    }
</script>

<style scoped>

</style>
