<template>
<div>
  {{userInfoProp}}
</div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    props:["userInfoProp"],
    computed: {
      ...mapState(["userInfoData"])
    }
  }
</script>

<style scoped>

</style>
