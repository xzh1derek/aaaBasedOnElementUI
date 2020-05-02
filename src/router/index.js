import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import axios from '../http/http'


Vue.use(Router)


let router = new Router({
  routes,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
   if (localStorage.token1){
     next("/user/info/")
   }
  }else {
    next()
  }
  // if (to.matched.some(record => record.meta.clearAll)) {
  //   // 如果点击到"我的消息",那么就向服务器发送请求,重新更新
  //   axios({
  //     url:"/userInfo",
  //     params:{
  //       userId:localStorage.token
  //     }
  //   })
  //     .then(response=>{
  //       localStorage.setItem("userInfo", JSON.stringify(response.data));
  //
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  //   next()
  // }else {
  //   next()
  // }

});


export default router
