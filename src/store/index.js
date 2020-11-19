import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//刷新页面会丢失用户信息，所以要从localstorage中取
let userInfo = localStorage.getItem("wulin-userInfo") || {}

//防止本地没有"wulin-userInfo"， 给个{}防止JSON.parse解析出错
userInfo = JSON.parse(userInfo)
 
export default new Vuex.Store({
  state: {
    userInfo
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo = payload
    }
  },
  actions: {},
  modules: {}
});
