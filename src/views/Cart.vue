<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商城首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部文字 -->
    <div class="text">
        <a>我的购物车</a>
    </div>
    <!-- 购物车 -->
    <div class="cart">
    <!-- 购物车头部 -->
    <div class="cart-head">
      <ul>
        <li style="width:400px">
          <a>商品</a>
        </li>
        <li><a>价格</a></li>
        <li><a>数量</a></li>
        <li><a>小计</a></li>
        <li><a>操作</a></li>
      </ul>
    </div>
    <!-- 购物车列表 -->
    <div class="cart-list">
      <ul>
        <li>
          <div class="select">
            <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
          </div>
          <div class="image">
            <div class="t-image">
              <img src="./../assets//hand/hand1.jpg" alt="">
            </div>
          </div>
          <div class="msg">
            <a>黑人夫妇</a>
          </div>
          <div class="price">
            <a>$500</a>
          </div>
          <div class="number">
           <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="all">
            <a>500</a>
          </div>
          <div class="edit">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </li>
        <li>
          <div class="select">
            <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
          </div>
          <div class="image">
            <div class="t-image">
              <img src="./../assets//hand/hand1.jpg" alt="">
            </div>
          </div>
          <div class="msg">
            <a>黑人夫妇</a>
          </div>
          <div class="price">
            <a>$500</a>
          </div>
          <div class="number">
           <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="all">
            <a>500</a>
          </div>
          <div class="edit">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 购物车尾部 -->
    <div class="foot">
      <div class="foot-select">
                    <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
                    <a>全选</a>
      </div>
      <div class="pay">
        <a href="">去结算</a>
      </div>
            <div class="foot-text">
              <a>总价</a>
              <a>500</a>
            </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num:5
    };
  }
};
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
/* 购物车 */
.cart{
  background-color:#F5F7FC;
}
/* 购物车头部 */
.cart-head{
    height:40px;
    width:85%;
    margin-left:90px;
}
.cart-head ul{
  display: flex;
}
.cart-head ul li{
  width:235px;
  height:40px;
  background-color:#605F5F;
  text-align:center;
  font-size:20px;
  color:white;
}
.cart-head ul li a{
  line-height:40px;
}
/* 购物车列表 */
.cart-list{
  width:85%;
   margin-left:90px;
   background-color:white;
}
.cart-list li{
  height:150px;
  display: flex;
}
.select{
  width:5%;
  height:150px;
  border:1px red solid;
}
.image{
  width:10%;
  height:150px;
    border:1px red solid;
}
.msg{
  width:20%;
  height:150px;
  border:1px red solid;

}
.t-image{
  width:70%;
  height:60%;
  border:1px green solid;
}
.t-image img{
  width:100%;
  height:100%;
}
.price{
  width:15%;
  height:150px;
  border:1px red solid;
}
.number{
  width:15%;
  height:150px;
  border:1px red solid;
}
.all{
  width:15%;
  height:150px;
  border:1px red solid;
}
.edit{
  width:20%;
  height:150px;
  border:1px red solid;
}
/* 购物车尾部 */
.foot{
  height:40px;
  width:85%;
  margin-left:90px;
  margin-top:20px;
  background-color:white;
}
.foot-select{
  width:12%;
  height:40px;

    float:left;
}
.foot-text{
  width:16%;
    height:40px;

    float:right;
}
.pay{
    width:12%;
  height:40px;

    float:right;
}
</style>