<template>
    <div>
        <el-backtop></el-backtop>
        <div class="slider">
              <!-- 轮播图 -->
      <el-carousel :interval="4000" height="600px">
        <el-carousel-item v-for="item in imagesbox" :key="item.id">
          <img :src="item.path" class="image" />
        </el-carousel-item>
      </el-carousel>
        </div>
        <!-- 商品 -->
        <div class="product">
            <ul>
                <li>
                    <a href="javascript:avoid(0)"><img src="./../assets/product/product1.jpg" /></a>
                    <a href="" class="text">柯基毛绒</a>
                </li>
                <li><a href="javascript:avoid(0)"><img src="./../assets/product/product2.jpg" /></a><a href="" class="text" >FPX冠军周边</a></li>
                <li><a href="javascript:avoid(0)"><img src="./../assets/product/product3.jpg" /></a><a href="" class="text" >愚人节迷你手办套装</a></li>
                <li><a href="javascript:avoid(0)"><img src="./../assets/product/product4.jpg" /></a><a href="" class="text" >2020LPL台历</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
             imagesbox: [
        { id: 1, path: require("./../assets/slider/slider1.jpg") },
        { id: 2, path: require("./../assets/slider/slider2.jpg") },
        { id: 3, path: require("./../assets/slider/slider3.jpg") },
        { id: 4, path: require("./../assets/slider/slider4.jpg") }
      ]
    }
    }
}
</script>
<style scoped>
/* 轮播图 */
.image{
    height:636px;
    width:100%;
}
/* 商品 */
.product{
    height:300px;
}
.product ul{
    display:flex;
}
.product ul li{
    width:25%;
}
.product ul li img{
    width:380px;
    height:238px;
}
.text{
    color:black;
    font-size:20px;
    font-weight: bold;
    padding-left:100px;
    line-height:50px;
}
</style>