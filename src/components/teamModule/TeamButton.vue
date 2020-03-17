<template>
  <div>

    <el-button type="primary" @click="showWindow('MyApplication')">我的申请</el-button>
    <el-button type="success" @click="showWindow('CreateTeam')">需要组队的课程</el-button>
    <!--    用来展示点击结果-->
    <el-collapse-transition>
      <div v-show="show" class="transition-box">
        <MyApplication v-if="buttonKey===2"></MyApplication>
        <CreateTeam v-if="buttonKey===1"></CreateTeam>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
  import CreateTeam from "./CreateTeam";
  import MyApplication from "./MyApplication";

  export default {
    name: "TeamButton",
    data() {
      return {
        show: false,
        show3: false,
        buttonKey: 0
      }
    },
    components: {MyApplication, CreateTeam},

    methods: {
      /**
       *在showWindow中展示用户点击按钮后查询到的信息
       * @param compName:对应的组件名
       */
      showWindow(compName) {
        let currentButtonKey = 10;
        //根据按钮传进来的参数,判断 buttonKey的值
        currentButtonKey = compName === "CreateTeam" ? 1 : 2;
        if (currentButtonKey === this.buttonKey) {
          this.show = !this.show;
        } else {
          this.buttonKey = currentButtonKey;
          this.show = true
        }
      },
    },
  }
</script>

<style scoped>
  .transition-box {
    border-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 20px 20px;
    box-sizing: border-box;
    margin: auto;
  }
</style>
