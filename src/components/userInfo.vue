<template>
  <div>
    <dl>
      <dt><h1>{{userInfoData.name}}</h1></dt>
      <hr>
      <dd>学号:{{userInfoData.username}}</dd>
      <dd>学院:{{userInfoData.school}}</dd>
      <dd>组长:{{userInfoData.teamleader}}</dd>
    </dl>
    <button class="btn-primary" answer="1" @click="answerInvite($event)">同意邀请</button>
    <button class="btn-primary" answer="0" @click="answerInvite($event)">拒绝邀请</button>
    <button @click="count">count</button>
<!--<test :user-info-prop=this.userInfoToOpe></test>-->
    <teamOperate :user-info-prop=this.userInfoToOpe></teamOperate>
  </div>
</template>

<script>
  import store from '../store/store'
  import {mapState, mapMutations} from 'vuex'
  import teamOperate from './teamOperate'
  import test from './test'

  export default {
    name: "userInfo",
    store,
    data() {
      return {
        loginUser:"16010410028",
        userInfoToOpe:0
      }
    },
    components:{teamOperate,test},
    computed: {
      ...mapState( ['userInfoData'])

    },
    methods: {
      answerInvite(event){
        this.axios({
          url:'/answerInvite',
          params:{
            userId:this.userInfoData.username,
            answer:event.target.getAttribute("answer")
          }
        })
          .then((res)=>{
            console.log(res)
          })
          .catch(err=>{
            console.log(err)
          })
      },
      count(){
        var self = this
        setInterval(function () {
          console.log(self.userInfoToOpe++)
        },1000)
      },
      ...mapMutations(['initUserInfo',"updateTeam"])
    },
    created() {
      var self = this
      console.log(this.userInfoToOpe)
      // function getUserInfo(){
      //   return self.axios({
      //       method: "post",
      //       url: "/userInfo",
      //       params: {
      //         // userId: self.loginUser//得改
      //         userId: "16010410028"//得改
      //       }
      //     })
      // }
      //
      // function getTeamInfo(){
      //   return  self.axios({
      //     method: "get",
      //     url: "/search",
      //     params: {
      //       leader: "16010410028"//得改
      //     }
      //   })
      // }
      //
      // self.axios.all([getUserInfo(),getTeamInfo()])
      //   .then(self.axios.spread(function(acct,perms){
      //     //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
      //     self.initUserInfo(acct.data);
      //     self.updateTeam(perms.data);
          // this.userInfoToOpe = this.userInfoData
      //   }))
      //   .catch(err=>{
      //     console.log(err)
      //   })
    },

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
