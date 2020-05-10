<template>
    <div class="alll">
          <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商城首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单支付</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部文字 -->
    <div class="text">
        <a>订单支付</a>
    </div>
    <!-- 支付提示 -->
    <div class="tip">
        <img src="./../assets/yes.svg" alt="">
        <a>下单成功，请尽快付款</a>
    </div>
    <!-- 支付方式 -->
    <div class="way">
        <div class="choose">
            <a>
                请选择以下的方式付款
                </a>
                       </div>
            <div class="plat">
            <div class="ali">
                <a href="javascript:avoid(0)">
                    <img src="./../assets/ali.png" alt="">
                </a>
            </div>
            <div class="wech">
                <a href="javascript:avoid(0)">
                    <img src="./../assets/wech.png" alt="">
                </a>
            </div>
            </div>
 
    </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{}
    },
    methods:{
    }
}
</script>
<style scoped>
.alll{
    background-color:#F5F5F5;
}
/* 面包屑导航栏 */
.el-breadcrumb {
  height: 30px;
  padding-top: 20px;
  padding-left: 50px;
  background-color: #f0f0f0;
}
/* 头部文字 */
.text{
    height:70px;
}
.text a{
  padding-left:100px;
  font-size:35px;
  line-height:60px;
}
/* 支付提示 */
.tip{
    width:80%;
    height:150px;
    margin:0 auto;
    background-color:white;
}
.tip img{
    width:100px;
    height:100px;
    margin-left:50px;
    margin-top:10px;
}
.tip a{
    font-size:30px;
    color:grey;
    padding-left:30px;
}
/* 支付方式 */
.way{
    width:80%;
    height:220px;   
    margin:0 auto;
    margin-top:10px;
        background-color:white;
}
.choose{
    width:80%;
    height:50px;
    margin-left:40px;
    border-bottom:1px grey solid;
}
.choose a{
    line-height:50px;
    font-size:18px;
}
.plat{
     width:80%;
    height:110px;
     margin-left:40px;
    
}
.ali{
     width:20%;
    height:80px;
    margin-left:40px;
    margin-top:10px;
    float:left;
}
.ali img{
    width:140px;
    height:60px;
    margin-left:10px;
    margin-top:20px;
}
.wech{
     width:20%;
    height:80px;
    margin-left:40px;
     margin-top:10px;
    float:left;
}
.wech img{
        width:140px;
    height:60px;
    margin-left:10px;
    margin-top:20px;
}
</style>