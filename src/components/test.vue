<template>
  <div>
    <input type="text" v-model="arr">
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        arr: 0
      }
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
    computed: {
      doLoop() {
        let self = this;
        while (self.arr !== 0) {
          console.log(self.arr)
          self.arr=this.arr
        }
      },
      ...mapState(["userInfoData"])
    },
    mounted() {
      // this.doLoop();
      console.log(this.arr)
    }
  }
</script>

<style scoped>

</style>
