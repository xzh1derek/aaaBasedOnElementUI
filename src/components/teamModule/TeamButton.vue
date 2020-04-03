<template>
  <div>

    <!--    <el-button type="primary" @click="showWindow('MyApplication')">我的申请</el-button>-->
    <!--    <el-button type="success" @click="showWindow('CreateTeam')">需要组队的课程</el-button>-->

    <el-button type="primary" @click="changeCompName('MyApplication')">我的申请</el-button>
    <el-button type="success" @click="changeCompName('CreateTeam')">需要组队的课程</el-button>
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
        buttonKey: 0,
        throttleFunc: "",//用来保存截留函数
        compName: ""//用来记录当前显示那个组件
      }
    },
    components: {MyApplication, CreateTeam},

    methods: {
      /**
       *在showWindow中展示用户点击按钮后查询到的信息
       */
      showWindow() {
        let currentButtonKey = 10;
        //根据按钮传进来的参数,判断 buttonKey的值
        currentButtonKey = this.compName === "CreateTeam" ? 1 : 2;
        if (currentButtonKey === this.buttonKey) {
          this.show = !this.show;
        } else {
          this.buttonKey = currentButtonKey;
          this.show = true
        }
      },

      /**
       * 确定当前点击要显示的组件名
       * @param targetCompName:要显示的组件名
       */
      changeCompName(targetCompName) {
        this.compName = targetCompName
        this.throttleFunc()
      }
    },
    mounted() {
      //初始化节流函数
      //注意:把带参数的函数当成参数传递时,要使用bind
      this.throttleFunc = this.util.throttle.call(this, this.showWindow.bind(this), 1000)
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
