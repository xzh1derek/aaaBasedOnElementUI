<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="密　码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="">立即创建</el-button>
    </el-form-item>
  </el-form>
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
    console.log(this.arr)
  }
  }
</script>

<style scoped>

</style>
