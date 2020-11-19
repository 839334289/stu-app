<template>
  <div class="login">
    <video src="http://chst.vip:8081/stu2/media/bg_video.d2d602a9.mp4" class="background" playsinline="" autoplay muted loop=""></video>
    <div class="left"></div>
    <div class="loginContainer">
      <h1>武林管理系统</h1>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
  <el-form-item label="用户名" prop="username">
    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
  </el-form-item>
</el-form>
    </div>
 
  </div>
</template>

<script>
  //引入login接口发送数据
  import { login } from "@/api"
  import { mapMutations } from "vuex"

  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        //用户名正则，3到10位（字母，数字，下划线，减号）
          var uPattern = /^[a-zA-Z0-9_-]{3,10}$/;
        if (!uPattern.test(value)){
          callback('请输入3到10位(字母，数字，下划线，减号)')
        }else{
          callback()
        }
      };
      var validatePassword = (rule, value, callback) => {
        // //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        //   var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        // if (!pPattern.test(value)){
        //   callback('请输入密码')
        // }else{
        //   callback()
        // }

        //为了方便测试，省略正则
        if(value){
          callback()
        }else{callback('请输入密码')}

      };
      return {
        loginForm: {
          username: '',
          password: '',
          age: ''
        },
        rules: { 
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapMutations(['SET_USERINFO']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//代表本地校验通过

          //加载登入动画
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });

            login(this.loginForm.username,this.loginForm.password)
            .then(res=>{
              //服务器响应，关闭登入动画
              loading.close();
             
              if(res.data.state){
                this.$message.success("登入成功")
                //用户名密码正确，将token以及用户名和密码存入本地,并跳转主页
                localStorage.setItem("wulin",res.data.token)
                localStorage.setItem("wulin-userInfo",JSON.stringify(res.data.userInfo))
                //更改vuex中state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo)

                this.$router.push("/")
              }else{
                //用户名密码错误
                this.$message.error("用户名或密码不正确")
              }
            }).catch(err =>{
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login{
    position: relative;
  }
  .left {
    position: absolute;
  }
  .loginContainer{
    width: 450px;
    height: 500px;
    position: absolute;
    top: 95px;
    right: 150px;
    border-radius: 10px;
    background: rgba(0,0,0,.1);
    text-align: center;
  }
  h1{
    text-align: center;
    color: #fff;
    font-size: 34px;
    margin: 80px 0 50px 0;
    }

  .el-form {
    width: 400px;
  }
  .el-button--primary{
    width: 85%;
    background: linear-gradient(50deg,#48adfa,#002dff);
}
.background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  background-size: cover;
}
</style>