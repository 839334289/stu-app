import axios from "axios";

//不在vue组件，未引入element-ui,需要引入
import ElementUI from "element-ui";

//需要跳转页面，但js里无$router,所以引入
import router from "../router";

axios.defaults.baseURL = process.env.NODE_ENV ==='development' ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true; //允许请求携带认证

//创建请求拦截器，可以给每个请求都携带上想要传递的内容

axios.interceptors.request.use(config =>{
    //登入或注册不需要携带token
    if(config.url == "/users/login"){
        return config
    }else{
        let token = localStorage.getItem("wulin")
        //config值是每个请求对象
        config.headers['authorization'] = token;
        return config
    }
})

//响应拦截，再次验证token
axios.interceptors.response.use(config => {
    console.log(config);
    let { data } = config ;
    // 1004代表token校验失败，10022代表session过期，所以提示错误并跳转到登录页面（其中1004与10022是后端商定的，可变，只用于当前） 
    if( data.code == "1004" || data.code == "10022" ){
        ElementUI.Message.error("登陆失效")
        router.push("./login")
        
    }
    return config

})

axios.create({
    timeout : 3000
})

export default axios