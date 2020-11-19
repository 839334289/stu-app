import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入全局样式
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

//路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  //用户登录之后，localstorage中有token
  
  let token = localStorage.getItem("wulin")
  if(token){//如果有，直接放行
    next()
  }else{
    if(to.path === "/login"){
      //如果没有token但路径为登入页，放行
      next()
    }else{//不是登入页就直接跳转到登入页
      next({ path:"/login" })

    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
