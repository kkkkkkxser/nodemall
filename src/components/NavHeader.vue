<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <!-- 头部的上部分 -->
      <div class="header">
        <!-- 头部logo -->
        <div class="header-image"></div>
        <!-- 头部登录购物车 -->
        <div class="header-right">
          <span v-if="usname">{{usname}}</span>
          <a href="javascript:avoid(0)" @click="toLogin" v-if="!usname">你好，请登录</a>
          <a href="javascript:avoid(0)" @click="logout" style="padding-left:12px;">退出</a>
          <a href="javascript:avoid(0)">
            <img src="./../assets/cart.png" class="car" />
          </a>
          <a href="javascript:avoid(0)" @click="toCart">我的购物车</a>
          <a href="javascript:avoid(0)">
            <img src="./../assets/list.png" class="car" />
          </a>
          <a href="javascript:avoid(0)" @click="toOrder">我的订单</a>
          
        </div>
      </div>
      <!-- 头部导航 -->
      <div class="nav">
          <!-- 导航 -->
        <ul>
          <li>
            <a href="javascript:avoid(0)" @click="toIndex()">商城首页</a>
          </li>
          <li>
            <a href="javascript:avoid(0)" @click="toHand()">雕塑手办</a>
          </li>
          <li>
            <a href="javascript:avoid(0)" @click="toDoll()">毛绒玩偶</a>
          </li>
          <li>
            <a href="javascript:avoid(0)" @click="toClothes()">男女服饰</a>
          </li>
          <li>
            <a href="javascript:avoid(0)" @click="toOthes()">其他</a>
          </li>
        </ul>
        <!-- 搜索 -->
        <div class="search">
          <el-input placeholder="请输入内容" class="input" v-model="search" clearable>
            <el-button slot="append" icon="el-icon-search" @click="clicks"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 清除浏览器自带样式
import "./../css/clear.css";
import axios from 'axios'
export default {
  data() {
    return {
      usname:"",
      search:""
    };
  },
  created(){
    this.getusername();
  },
  methods:{
    // 搜索
    clicks(){
      this.$bus.$emit('info',this.search);
      this.search=""
    },
    toLogin(){
      this.$router.push('/login')
    },
    toIndex(){
      this.$router.push('/index')
    },
    toHand(){
      this.$router.push('/hand')
    },
    toDoll(){
      this.$router.push('/doll')
    }, toClothes(){
      this.$router.push('/clothes')
    },
     toOthes(){
      this.$router.push('/others')
    },
    toCart(){
      this.$router.push('/cart')
    },
    toOrder(){
      this.$router.push('/order')
    },
    logout(){
      axios.post('/users/logout').then((response)=>{
          let res = response.data;
          if(res.status=="0"){
             this.$message({
            duration:1000,
            message:"退出成功",
            type:'success'
          })
            this.usname='';
          }
      })
    },
    getusername(){
      axios.get('/users/username').then((response)=>{
        let res = response.data;
        if(res.status=="0"){
          this.usname=res.result;
        }
      })
    }
  }
};
</script>
<style scoped>
/* 头部样式 */
.head {
  height: 120px;
  position: relative;
  width: 100%;
}
/* 头部的上部分样式 */
.header {
  height: 75px;
  background-color: #090909;
}
/* 头部logo样式 */
.header-image {
  display: block;
  width: 297px;
  height: 39px;
  z-index: 99;
  background: url(./../assets/spirit.jpg);
  background-position: -2px -147px;
  position: absolute;
  top: 20px;
  left: 40px;
}
/* 头部登录购物车 */
.header-right {
  position: absolute;
  right: 250px;
  top: 28px;
}
.header-right span{
  color:white;
}
.header-right a {
  color: white;
}
.car {
  margin-left: 30px;
  height: 25px;
  width: 25px;
}
/* 头部导航样式 */
.nav {
  height: 45px;
  width: 100%;
  background-color: #202020;
  position: relative;
}
/* 导航 */
.nav ul {
  display: flex;
}
.nav ul li {
  padding-left: 50px;
  padding-top: 13px;
}
.nav ul a {
  color: white;
  font-size: 18px;
}
.nav ul a:hover {
  color: #fa4f17;
}
/* 搜索 */
.search{
    width:300px;
    position: absolute;
    right:30px;
    top:1px;
}
</style>