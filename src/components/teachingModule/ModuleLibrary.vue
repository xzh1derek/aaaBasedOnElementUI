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
      ...mapMutations(['updateVerification'])
    },
    mounted() {
      this.updateVerification("3");
    }
  }
</script>

<style scoped>

</style>
