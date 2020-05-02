<template>
  <div>
    <CommonOperation></CommonOperation>
    <div>
      <ProjectList ></ProjectList>
    </div>
  </div>
</template>

<script>
  import ProjectList from "./ProjectList";
  import {mapMutations} from 'vuex'
  import CommonOperation from "../../common/CommonOperation";

  export default {
    name: "CourseLibrary",
    data() {
      return {};
    },
    components: {ProjectList, CommonOperation},
    methods: {
      ...mapMutations(["updateVerification", "updateCurrentStatus"])
    },
    beforeMount() {
      // 初始化按键组,15表示当前的页面是project相关
      let payload = {
        targetKey: "btnFamily",
        targetVal: 15
      };
      this.updateCurrentStatus(payload);
      this.updateVerification("2");
    }
  }
</script>

<style scoped>
</style>
