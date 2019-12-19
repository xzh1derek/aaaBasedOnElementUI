<template>
  <div>
    <ModuleList></ModuleList>
  </div>
</template>

<script>

  import ModuleList from "./ModuleList"
  import CommonOperation from "./CommonOperation";

  export default {
    name: "ModuleLibrary",
    components: {ModuleList,CommonOperation}
  }
</script>

<style scoped>

</style>
