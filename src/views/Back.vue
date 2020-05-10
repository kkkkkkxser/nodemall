<template>
  <div>
    <el-container>
      <!-- 头部 -->
   <el-header height="113px">
        <!-- 头部图标 -->
        <div class="head">
          <a href="javascript:avoid(0)" class="head-image">
          </a>
        </div>
        <div class="text">
          <a href="javascript:avoid(0)" >后台管理系统</a>
        </div>
        <div class="exit">
          <el-button type="info" style="width:120px;height:50px;" @click="toBack">退出</el-button>
        </div>
      </el-header>
  </el-container>
      <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="toIndex">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" @click="toUser">
        <i class="el-icon-user"></i>
        <span slot="title">用户信息</span>
      </el-menu-item>
      <el-menu-item index="3" @click="toGoods">
        <i class="el-icon-goods"></i>
        <span slot="title">商品信息</span>
      </el-menu-item>
       <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">其他</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
  
      <!-- 主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container> 
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
  methods:{
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 去首页
      toIndex(){
        this.$router.push('/backindex')
      },
      // 用户
      toUser(){
        this.$router.push('/backuser')
      },
      // 商品
      toGoods(){
        this.$router.push('/backgoods')
      },
      toBack(){
        this.$router.push('/backLogin')
      }
  }
}
</script>
<style scoped>
/* 全局清空 */
*{
  margin:0;
  padding:0;
  list-style: none;
}
/* 布局的样式 */
/* 调整头部图标位置 */
.el-header{
  background-color:#090909;
  position: relative;
}
.head {
  position: absolute;
  top:30px;
  left:50px;
}
.text{
  margin-left:350px;
  margin-top:29px;
}
.text a{
  color:white;
  font-weight: bold;
  font-size:34px;
}
.exit{
  float:right;
  margin-top:-40px;
  margin-right:20px;
}
.head-image{
    display:block;
    width: 297px;
    height: 39px;
    z-index: 99;
    background:url(./../assets/spirit.jpg);
    background-position: -2px -147px;
}
/* 侧边栏 */
.el-aside{
  height:665px;
  background-color:#545C64;
}
.el-menu-item{
  width:200px !important;
}
</style>