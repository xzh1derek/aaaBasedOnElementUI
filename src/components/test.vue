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
  // watch: {
  //   arr: { //监听的对象
  //     deep: true, //深度监听设置为 true
  //     handler: function (newV) {
  //       console.log(newV.age)
  //     }
  //   }
  // },
  props: ["userInfoProp"],
    computed
  :
  {
    // doLoop()
    // {
    //   let self = this;
    //   while (self.arr !== 0) {
    //     console.log(self.arr)
    //     self.arr = this.arr
    //   }
    // }
  // ,
  ...
    mapState(["userInfoData"])
  }
  ,
  mounted()
  {
    // this.doLoop();
  }
  }
</script>

<style scoped>

</style>
