<template>
 <div>
   <router-view></router-view>
 </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        form: {
          name: '',
          password:""
      }}
      },
  props: ["userInfoProp"],

  }
</script>

<style scoped>

</style>
