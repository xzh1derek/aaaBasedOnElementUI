<template>
  <div id="container">
    <div id="side">
      <userInfo :user-info-prop=this.userInfoProp v-if="userInfoProp"></userInfo>
      <teamOperate :user-info-prop=this.userInfoProp v-if="userInfoProp"></teamOperate>
    </div>
    <div id="view">
      <!--      <router-view style="margin: 0 auto"></router-view>-->
      <template v-if="userInfoProp">

        <template v-if="userInfoProp.teamleader">
          <h2>我的队伍</h2>
          <myTeam :user-info-prop=this.userInfoProp></myTeam>
          <el-divider></el-divider>
        </template>

        <template v-if="!userInfoProp.teamleader">
          <h2>队伍大厅</h2>
          <teamList :user-info-prop=this.userInfoProp></teamList>
          <el-divider></el-divider>
        </template>

        <template v-if="userInfoProp.leader">
          <h2>入队申请</h2>
          <newRequest :user-info-prop=this.userInfoProp></newRequest>
        </template>

      </template>
    </div>
  </div>
</template>


<script>

  import teamOperate from "./teamModule/teamOperate";
  import myTeam from "./teamModule/my-team";
  import newRequest from "./teamModule/new-request";
  import teamList from "./teamModule/team-list";
  import userInfo from "./userInfo";
  import {mapState} from "vuex"
  import store from "../store/store";

  export default {
    name: 'Team',
    data() {
      return {
        userInfoProp: null

      }
    },
    store,
    components: {
      teamOperate,
      userInfo,
      myTeam,
      newRequest,
      teamList

    },
    computed: {
      ...mapState(['userInfoData'])
    },
    mounted() {
      this.userInfoProp = this.userInfoData
      console.log(this.userInfoProp)
    }
  }
</script>

<style scoped>
  #container {
    padding-left: 50px;
    display: flex;
    flex-direction: row;
  }

  #side {
    width: 250px;
  }

  #view {
    flex: 1;
  }
</style>
