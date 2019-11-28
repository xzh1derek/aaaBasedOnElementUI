<template>
  <div>
    <dl>
      <dt><h1>{{userInfoProp.name}}</h1></dt>
      <el-divider></el-divider>
      <dd>学号:{{userInfoProp.username}}</dd>
      <dd>学院:{{userInfoProp.school}}</dd>
      <dd>组长:{{userInfoProp.teamleader}}</dd>
    </dl>
  </div>
</template>

<script>
  import store from '../store/store'
  import {mapState, mapMutations} from 'vuex'
  import teamOperate from './teamOperate'
  import test from './test'

  export default {
    name: "userInfo",
    props: ['userInfoProp'],
    store,
    data() {
      return {}
    },
    components: {teamOperate, test},
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      ...mapMutations(['initUserInfo', "updateTeam"])
    },
    mounted() {
      this.util.hello()
    }
  }
</script>

<style scoped>
  dt {
    text-align: center;
  }

  dd {
    color: #ffffff;
    border-bottom: 1px solid white;
    margin-bottom: 10px;
  }
</style>
