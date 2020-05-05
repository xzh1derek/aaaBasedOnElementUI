// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from './http/http'
import util from './util/util'
import ElementUI from 'element-ui'
import md5 from "js-md5"
import 'element-ui/lib/theme-chalk/index.css';
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'


Vue.use(Vuex);
Vue.use(ElementUI);


Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.util = util;
Vue.prototype.$md5 = md5;
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  methods:{
    updateUserInfo(e){
      this.axios({
        url:"/userInfo",
        params:{
          userId:localStorage.token
        }
      })
        .then(response=>{
          localStorage.setItem("userInfo", JSON.stringify(response.data));

        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  mounted(){
    window.addEventListener('load', e => this.updateUserInfo())
  }
});
