<template>
    <div>
        <!-- 面包屑导航栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">商城首页</el-breadcrumb-item>
  <el-breadcrumb-item>毛绒玩具</el-breadcrumb-item>
</el-breadcrumb>
<!-- banner栏 -->
    <div class="banner">
        <img src="./../assets/banner/banner2.jpg" alt="">
    </div>
    <!-- 商品区 -->
    <div class="product">
    <!-- 价格控制 -->
    <div class="price">
        <div class="price-control">
            <a>排序方式：</a>
            <a href="javascript:avoid(0)">默认</a>
            <a href="javascript:avoid(0)">升序</a>
        </div>
    </div>
    <!-- 价格区间选择 -->
    <div class="price-select">
        <a>价格</a>
    </div>
    <!-- 商品信息 -->
    <div class="product-msg">
        <ul>
            <li>
                <a href="">
                    <img src="./../assets/doll/doll1.jpg" alt="">
                </a>
                <h3>黑人夫妇</h3>
                <p>￥1110</p>
            </li>
            <li><a href="">
                    <img src="./../assets/doll/doll2.jpg" alt="">
                </a>
                <h3>黑人夫妇</h3>
                <p>￥1110</p></li>
            <li><a href="">
                    <img src="./../assets/doll/doll3.jpg" alt="">
                </a>
                <h3>黑人夫妇</h3>
                <p>￥1110</p></li>
            <li><a href="">
                    <img src="./../assets/doll/doll4.jpg" alt="">
                </a>
                <h3>黑人夫妇</h3>
                <p>￥1110</p></li>
                <li><a href="">
                    <img src="./../assets/doll/doll5.jpg" alt="">
                </a>
                <h3>黑人夫妇</h3>
                <p>￥1110</p></li>
                <li><a href="">
                    <img src="./../assets/doll/doll7.jpg" alt="">
                </a>
                <h3>黑人夫妇</h3>
                <p>￥1110</p></li>
        </ul>
    </div>
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
.el-breadcrumb{
    height: 30px;
    padding-top:20px;
    padding-left:50px;
    background-color:#F0F0F0;
}
/* banner栏 */
.banner{
    height:200px;
}
.banner img{
    height:197px;
    width:100%;
}
/* 商品区 */
.product{
    height:900px;
    background-color:#F5F7FC;
}
/* 价格控制 */
.price{
    height:100px;
    position: relative;
}
.price-control{
    position: absolute;
    height:50px;
    width:85%;
    background-color:white;
    left:90px;
    top:10px;
}
.price-control a{
    color:black;
    line-height:50px;
    padding-left:20px;
}
/* 价格区间选择 */
.price-select{
    width:200px;
    height:300px;
    background-color:white;
    position: absolute;
    left:85px;
}
/* 商品信息 */
.product-msg{
    width:70%;
    position: absolute;
    top:450px;
    right:70px;
}
.product ul{
    display:flex;
    flex-wrap: wrap;
}
.product ul li{
    width:33;
    margin-left:20px;
    margin-top:20px;
}
.product ul li img{
    width:300px;
    height:300px;
}
.roduct ul li h3{
    font-weight:bold ;
}
</style>