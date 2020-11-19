<template>
  <div class="home">
   <el-container>
     <!-- 侧边栏 -->
  <el-aside width="200px">
     <el-avatar :size="180"
        fit="fit"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=372069519,3734643653&fm=15&gp=0.jpg"></el-avatar>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">门派管理</span>
    </template>
    <!-- <el-menu-item-group>
      <span slot="title">逍遥派</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu> -->
  </el-submenu>
  
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">武功秘籍</span>
  </el-menu-item>
  <!-- <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item> -->
</el-menu>
  </el-aside>

  <el-container>
    <!-- 顶栏布局 -->
    <el-header>
      <el-row type="flex"
                  class="row-bg"
                  justify="space-between">
            <el-col :span="6">
              <div class="grid-content">
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                武林管理系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar :size="40"
                  fit="fit"
                  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=372069519,3734643653&fm=15&gp=0.jpg"></el-avatar>
                <span class="wel">欢迎您:</span>
                <b class="nickname">{{userInfo.nickname}}</b>
                <span class="quit"
                      @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
       <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
  import { getLoginLog } from "@/api"
  import { mapState } from "vuex"

  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
      getLoginLog().then(res => {
        console.log(res);
      })
    },
    methods: {
      // 展开，收起功能
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      quit(){
        //退出登录，需要清除token和userInfo,然后跳转到登入页
        localStorage.removeItem("wulin")
        localStorage.removeItem("wulin-userInfo")

        this.$router.push("/login")
      }
    }
  }
</script>

<style scoped>
 .quit {
    cursor: pointer;
    color: #fff;
    vertical-align: middle;
  }
  .wel {
    vertical-align: middle;
  }

  /* 修改avatar的样式 */
  .el-avatar{
    vertical-align: middle;
    margin-right: 10px;
  }
  /* layout顶栏样式 */
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
  .row-bg {
    background-color: #41b883;
  }

  /* container样式 */
  .el-header {
    background-color: #41b883;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  /* 侧边栏样式 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>



