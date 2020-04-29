<template>
  <div>
    <!-- 脚部 -->
    <div class="foot">
      <!-- 维修 -->
      <div class="foot-fix">
        <ul>
          <li>
            <a href>
              <img src="./../assets/right2.jpg" alt class="logo" />
              7天无理由退货
            </a>
          </li>
          <li>
            <a href>
              <img src="./../assets/right1.png" alt class="logo" />
              100%官方正品
              <li></li>
            </a>
          </li>
          <li>
            <a href>
              <img src="./../assets/right3.jpg" alt class="logo" />
              全场满200包邮
            </a>
          </li>
        </ul>
      </div>
      <!-- 其他信息 -->
      <div class="foot-show">
          <ul>
              <li>
                  <h3>购物指南</h3>
                  <a>账号注册与购买</a>
                  <a>购买流程介绍</a>
                  <a>支付方式</a>
                  <a>常见问题</a>
              </li>
              <li> <h3>购物指南</h3>
                  <a>账号注册与购买</a>
                  <a>购买流程介绍</a>
                  <a>支付方式</a>
                  <a>常见问题</a></li>
              <li> <h3>购物指南</h3>
                  <a>账号注册与购买</a>
                  <a>购买流程介绍</a>
                  <a>支付方式</a>
                  <a>常见问题</a></li>
              <li> <h3>购物指南</h3>
                  <a>账号注册与购买</a>
                  <a>购买流程介绍</a>
                  <a>支付方式</a>
                  <a>常见问题</a></li>
          </ul>
      </div>
      <!-- 商城相关 -->
      <div class="about">
          <div class="about-text">
              <ul><li>关于商城</li>
              <li>服务条款</li>
              <li>合作伙伴</li>
              <li>法律声明</li></ul>
              </div>
      </div>
      <!-- copy -->
      <div class="right">
          <div class="right-left">
              <div class="right-left-logo"></div>
          </div>
          <div class="right-right">
              <a href="">深圳市合泰文化发展有限公司提供客服支持 |  客服邮箱：</a>
                <br>
            <a href="">Copyright (C) 1998 – 2018 Tencent. All Rights Reserved.</a>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./../css/clear.css";
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
/* 维修样式 */
.foot-fix {
  height: 100px;
}
.logo {
  height: 30px;
  width: 30px;
}
.foot-fix ul{
    display: flex;
}
.foot-fix li{
    width:270px;
    padding-top:40px;
    padding-left:180px;
}
.foot-fix ul li a{
    color:black;
}
/* 其他信息 */
.foot-show{
    height:200px;
    background-color:#F6F6F6;
}
.foot-show ul{
    display: flex;
}
.foot-show ul li{
    width:200px;
    padding-top:40px;
    padding-left:170px;
}
.foot-show ul li a{
    margin-top:10px;
    display: block;
    font-size:13px;
    color:#666666;
}
/* 商城相关 */
.about{
    height:60px;
    position: relative;
}
.about-text{
    width:70%; 
    position: absolute;
    left:200px;
    height:40px;
    top:10px;
    border-top:#e9e9e9 solid 1px;
    border-bottom:#e9e9e9 solid 1px;
}
.about-text ul{
    display: flex;
}
.about-text ul li{
    padding-left:200px;
    font-size:14px;
    color:#666666;
    line-height:40px;
}
/* copy */
.right{
    height:100px;
}
.right-left{
    width:45%;
    height:100px;
    float:left;
}
.right-left-logo{
    float:right;   
    background: url(./../assets/spirit.jpg) no-repeat 0px -58px;
    width: 246px;
    height: 46px;
    border-right: #e9e9e9 solid 1px;
}
.right-right{
    width:55%;
    height:100px;
    float:right;
}
.right-right a{
    padding-left:15px;
    padding-top:10px;
    line-height:20px;
    font-size:14px;
    color:#666666;
}
</style>