<template>
    <div>
          <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商城首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单确认</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部文字 -->
    <div class="text">
        <a>订单确认</a>
    </div>
    <!-- 详细的 -->
    <div class="detail">
        <div class="addr">
            <a>收货地址</a>
        </div>
        <div class="addr-detail"></div>
        <div class="product"></div>
        <div class="send-way"></div>
        <div class="total"></div>
        <div class="buttons"></div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
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
/* 详细的 */
.detail{
    height:850px;
    background-color:yellow;
    width:85%;
    margin-left:90px;
}
.addr{
    height:5%;

}
.addr-detail{
     height:15%;

}
.product{
 height:20%;

}
.send-way{
 height:20%;

}
.total{
 height:20%;

}
.buttons    {
 height:20%;

}
</style>