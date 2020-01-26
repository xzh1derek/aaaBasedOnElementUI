<!--module 菜单的母组件,是菜单下所有模块的容器-->
<template>
  <div>
    <ModuleList></ModuleList>
  </div>
</template>

<script>

  import ModuleList from "./ModuleList"
  import CommonOperation from "../common/CommonOperation";
  import {mapMutations} from 'vuex'

  export default {
    name: "ModuleLibrary",
    components: {ModuleList, CommonOperation},
    methods: {
      ...mapMutations(['updateCurrentStatus'])
    },
    beforeMount() {
      let payload={
        targetKey:"btnFamily",
        targetVal:5
      };
      this.updateCurrentStatus(payload);
    }
  }
</script>

<style scoped>

</style>
