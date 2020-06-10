<template>
  <div>
    <el-backtop></el-backtop>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商城首页</el-breadcrumb-item>
      <el-breadcrumb-item>雕塑手办</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- banner栏 -->
    <div class="banner">
      <img src="./../assets/banner/banner4.jpg" alt />
    </div>
    <!-- 商品区 -->
    <div class="product">
      <!-- 价格控制 -->
      <div class="price">
        <div class="price-control">
          <a>排序方式：</a>
          <a href="javascript:avoid(0)">默认</a>
          <a href="javascript:avoid(0)" @click="sortGoods()">升/降序</a>
        </div>
      </div>
       <!-- 价格区间选择 -->
      <div class="price-select">
        <a>价格</a>
        <ul>
          <li>
            <a href="javascript:void(0)" @click="gettmpGoodsList">全部</a>
          </li>
          <li v-for="price in priceFilter" :key="price.id">
                <a href="javascript:void(0)"  @click="priceselect(price.startPrice,price.endPrice)">{{price.startPrice}}-{{price.endPrice}}</a>
                </li>
               </ul>
      </div>
      <!-- 商品信息 -->
      <div class="product-msg">
        <ul>
          <!-- 渲染商品信息 -->
          <li v-for="item in goodsList" :key="item.id">
            <div class="detail-mg">
            <a href="javascript:avoid(0)" @click="detail(item.productId)">
              <img v-lazy="require(`./../assets/${item.productType}/${item.productImage}`)" alt />
            </a>
            </div>
            <h3>{{item.productName}}</h3>
            <p>${{item.salePrice}}</p>
            <div class="add-mg">
            <a href="javascript:" @click="addCart(item.productId)"><img src="./../assets/cart1.svg" alt="" style="margin-left:40px;width:25px;height:25px;"></a>
            </div>
          </li>
        </ul>
        <!-- 无限滚动 -->
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
          class="infinite"
        ></div>
      </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // 商品列表
      goodsList: [],
       tmpGoodsList:[],
      // 排序顺序
      sortFlag: true,
      // 分页
      page: 1,
      pageSize: 3,
      // 滚动
      busy:true,
      detId:'',
       priceFilter: [
        {
          startPrice: 0.0,
          endPrice: 150.0
        },
        {
          startPrice: 150.0,
          endPrice: 200.0
        },
        {
          startPrice: 200.0,
          endPrice: 250.0
        },
        {
          startPrice: 250.0,
          endPrice: 1000.0
        }
      ]
    };
  },
  mounted() {
    // 获取商品列表
    this.getGoodList();
  },
  created(){
      this.$bus.$off('info')
      this.$bus.$on('info',data =>{
      this.search=data;
      this.goodsList=this.newList;
      if(this.goodsList==''){
        this.$message.error("没有该商品")
      }
    })
    },
    computed:{
      newList(){
        var newL=[];
        var i=0;
        var f = this.search;  
        const reg = new RegExp(f);
        if(!f==''){
        this.goodsList.forEach((item)=>{
          if(reg.test(item.productName)){
            newL[i]=item;
            i++;
          }
        })
        }else{
          newL=this.goodsList
        }
        // console.log(newL);
        return newL;
      }
    },
  methods: {
    // 获取商品列表
    getGoodList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1
      };
      axios.get("/goods/others", { params: param }).then(response => {
        let res = response.data;
       console.log(res);
        if (res.status == "0") {
         if (flag) {
            this.goodsList = this.goodsList.concat(res.result.list);
            this.tmpGoodsList=this.goodsList;
            if (res.result.count == 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.goodsList = res.result.list;
            this.tmpGoodsList=this.goodsList;
            this.busy = false;
          }
        } else {
          this.goodsList = [];
        }
      });
    },
    // 排序功能
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodList();
    },
    // 无限滚动
      loadMore(){
      this.busy=true;
      setTimeout(() => {
      this.page++;
      this.getGoodList(true);
      }, 500)},
    
 addCart(productId){
      axios.post("/users/addCart",{
        productId:productId
      }).then((response)=>{
        console.log(response);
        if(response.data.status == "0"){
          this.$message.success("添加成功")
      }else{
         this.$message.error(response.data.msg)
      }
      })
    },
    detail(productId){
      this.$router.push('/detail/'+productId)
    },
     priceselect(startPrice,endPrice){
      var param={
        startPrice:startPrice,
        endPrice:endPrice
      };
      console.log(startPrice);
      console.log(endPrice);
       axios.get("/goods/othersselect", { params: param }).then(response => {
        let res = response.data;
        this.goodsList=res.result.list;
         if(this.goodsList==''){
          this.$message.error("该价格区间没有商品")
        }
      });
    },
    // 返回全部列表
    gettmpGoodsList(){
      this.goodsList=this.tmpGoodsList;
    }
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
/* banner栏 */
.banner {
  height: 200px;
}
.banner img {
  height: 197px;
  width: 100%;
}
/* 商品区 */
.product {
  height: 1250px;
  background-color: #f5f7fc;
}
/* 价格控制 */
.price {
  height: 100px;
  position: relative;
}
.price-control {
  position: absolute;
  height: 50px;
  width: 85%;
  background-color: white;
  left: 90px;
  top: 10px;
}
.price-control a {
  color: black;
  line-height: 50px;
  padding-left: 20px;
}
/* 价格区间选择 */
.price-select {
  width: 200px;
  height: 360px;
  background-color: white;
  position: absolute;
  left: 85px;
}
/* 商品信息 */
.product-msg {
  width: 70%;
  position: absolute;
  top: 450px;
  right: 70px;
}
.detail-mg img:hover{
  transform: translateY(-5px);
  box-shadow: 0 0 10px #999;
  /* transition: all .5s ease-out; */
  border:3px grey solid;
}
.add-mg{
  margin-top:-40px;
  margin-left:210px;
}
.product-msg h3{
  text-align:center;
  line-height:40px;
}
.product-msg p{
  text-align:center;
  color:red;
  line-height:20px;
}
.product-msg ul {
  display: flex;
  flex-wrap: wrap;
}
.product-msg ul li {
  width: 33;
  margin-left: 20px;
  margin-top: 20px;
}
.product-msg ul li img {
  width: 300px;
  height: 300px;
}
.product-msg ul li h3 {
  font-weight: bold;
}
/* 无限滚动 */
.infinite {
  height: 100px;
  overflow-y: auto;
}
/* 价格区间 */
.price-select a{
  font-size:18px;
  line-height:60px;
  padding-left:40px;
}
.price-select ul li a{
  color:grey;
}
.price-select ul li:hover{
  border:1px grey solid;
}
</style>