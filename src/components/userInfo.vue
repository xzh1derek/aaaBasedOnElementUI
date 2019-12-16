<template>
  <div>
    <dl>
      <dt><h1>{{info.name}}</h1></dt>
      <el-divider></el-divider>
      <dd>学号:{{info.username}}</dd>
      <dd>学院:{{info.school}}</dd>
      <dd>班级:{{info.class_id}}</dd>
      <dd>qq:{{info.qq}}</dd>
      <dd><a href="javascript:void(0)">修改密码</a></dd>
      <dd><a href="javascript:void(0)">完善QQ</a></dd>
    </dl>
<!--<template v-if="false">-->
    <MyApplication></MyApplication>
<!--</template>-->
<!--    <finalTest></finalTest>-->
  </div>
</template>


<script>
  import store from '../store/store'
  import {mapState, mapMutations} from 'vuex'
  import teamOperate from './teamModule/teamOperate'
  import PersonalCenter from './teamModule/PersonalCenter'
  import MyApplication from "./teamModule/MyApplication";
  import finalTest from "./teamModule/finalTest";

  export default {
    name: "userInfo",
    store,
    data() {
      return {
        info: JSON.parse(localStorage.getItem("userInfo"))
      }
    },
    components: {teamOperate, PersonalCenter,MyApplication,finalTest},
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      ...mapMutations(['initUserInfo', "updateTeam"])
    },
    mounted() {
    }
  }
</script>

<style scoped>
  dt {
    text-align: center;
  }

  dd {
    color: #090909;
    border-bottom: 1px solid #5b5a57;
    margin-bottom: 10px;
  }
</style>
