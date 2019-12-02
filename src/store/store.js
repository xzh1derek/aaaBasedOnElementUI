import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfoData: {
      username: "请先登录",
      name: "unknown",
      school: "通信",//学院
      qq: "---",
      teamleader: "",//队长学号
      applicationStatus: 0,//application_status为"0"时显示“申请未处理”，为其他非空字符串时显示“申请未通过：”+该字符串。（为空时不显示）
      invitation_id: 0,
      leader: false,
      available: true,
      display:false
    },

    searchTeamInfo:{
      leader:"init",
 }
  },
  mutations: {
    initUserInfo(state,payload) {
      for (var key in payload){
        state.userInfoData[key]=payload[key]
      }
    },
    updateTeam(state,payload){
      state.userInfoData.display=payload[0].is_display;
      state.userInfoData.available=payload[0].available;
    },
    teamInfo(state,payload){
      for (var key in payload){
        state.searchTeamInfo[key]=payload[key]
      }
    },
    beingLeader(state){
      state.userInfoData.teamleader=state.userInfoData.username;
      state.userInfoData.leader=true;
    },
    updateStatus(state){
      state.userInfoData.applicationStatus=0
    },
    updateInvitationId(state){
      state.userInfoData.invitation_id=0
    }
  }
})
