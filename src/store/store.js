import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfoData: {
      username: "请先登录",
      name: "unknown",
      school: "通信",//学院
      qq: "---",
      teamleader: "",//队长学号
      applicationStatus: "",//application_status为"0"时显示“申请未处理”，为其他非空字符串时显示“申请未通过：”+该字符串。（为空时不显示）
      invitation_id: 0,
      new_message:"",
      leader: false,
      available: true,
      display: false,
    },
    searchTeamInfo: {
      leader: "init",
    },
    newMessages: 0,
    activeRoute: 0,//用于主导航和侧边导航联动
    multipleSelection: [],
    innerMultipleSelection:[],//记录嵌套内表格被选择的数据
    // verificationCode: "",//用于表示当前进入的是哪个路由,以此来控制显示的按键组
    btnFamily: 10000,//用来控制CommonOperation显示哪些键盘组   0-->stuManagement   5-->module相关  10-->course相关   15-->project相关
    readyForRenovate:false,//分页组件通过监听这个变量.确定什么时候获取新的页面数据
    regExpLibrary:{
       schoolIdReg : /^[12]\d[012]\d{8}$/ //验证学号的正则表达式
    },
    identity:"student"
  },

  mutations: {
    /**
     * 改变State里的键值
     * @param state
     * @param payload 需要一个对象.至少包含两个属性.
     *        payload:{
     *        targetKey-->要改变键值名
     *        targetVal-->对应的键值
     *        }
     */
    updateCurrentStatus(state, payload) {
      state[payload.targetKey] = payload.targetVal
    },

    updateVerification(state, payload) {
      state.verificationCode = payload;
    },

    updateSelection(state, payload) {
      state.multipleSelection = payload
      console.log(state.multipleSelection)
    },


    initUserInfo(state, payload) {
      for (var key in payload) {
        state.userInfoData[key] = payload[key]
      }
    },

    updateMessage(state) {
      state.newMessages = 0
    },

    newActiveRoute(state, payload) {
      state.activeRoute = payload
    },

    updateTeam(state, payload) {
      state.userInfoData.display = payload[0].is_display;
      state.userInfoData.available = payload[0].available;
    },
    teamInfo(state, payload) {
      for (var key in payload) {
        state.searchTeamInfo[key] = payload[key]
      }
    },
    beingLeader(state) {
      state.userInfoData.teamleader = state.userInfoData.username;
      state.userInfoData.leader = true;
    },
    updateStatus(state) {
      state.userInfoData.applicationStatus = 0
    },
    updateInvitationId(state) {
      state.userInfoData.invitation_id = 0
    },
    updateData(state) {
      state.applicationStatus = "0"
    }
  },
  actions:{
    getUserInfo(content){
      axios({
        method: "get",
        url: "/userInfo/",
      })
        .then(response => {
          content.commit("initUserInfo",response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
