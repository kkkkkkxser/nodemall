<template>
  <div>
    <el-backtop></el-backtop>
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
          <li>
            <a>价格</a>
          </li>
          <li>
            <a>数量</a>
          </li>
          <li>
            <a>小计</a>
          </li>
          <li>
            <a>操作</a>
          </li>
        </ul>
      </div>
      <!-- 购物车列表 -->
      <div class="cart-list">
        <ul>
          <li v-for="item in cartList" :key="item.productId">
            <div class="select">
              <div class="sle-img">
                <el-checkbox  v-model="item.checked" size="medium" @change="((checked)=>{change(checked,item.productId)})"></el-checkbox>
              </div>
            </div>
            <div class="image">
              <div class="t-image">   
                <img v-lazy="require(`./../assets/${item.productType}/${item.productImage}`)" alt="">
              </div>
            </div>
            <div class="msg">
              <a>{{item.productName}}</a>
            </div>
            <div class="price">
              <a>${{item.salePrice}}</a>
            </div>
            <div class="number">
              <div class="number-de">
              <el-input-number v-model="item.productNum" @change="((productNum)=>{change1(productNum,item.productId)})" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            </div>
            <div class="all">
              <a>${{(item.productNum)*(item.salePrice)}}</a>
            </div>
            <div class="edit">
              <div class="edit-p">
              <el-button type="danger" @click="showDelete(item.productId)">删除</el-button>
            </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 购物车尾部 -->
      <div class="foot">
        <div class="foot-select">
          <el-checkbox v-model="checkAll " size="medium" @change="((check)=>{change2(check)})"></el-checkbox>
          <a>全选</a>
        </div>
        <div class="pay">
          <div class="pay-b">
          <el-button type="info" @click="toAddr" style="height:35px;width:150px;margin-top:2px;">去结算</el-button>
        </div>
        </div>
        <div class="foot-text">
          <a>总价:</a>
          <a>{{totalPrice}}</a>
        </div>
      </div>
    </div>
    <!-- 删除框 -->
    <el-dialog
  title="提示"
  :visible.sync="deleteDialogVisible"
  width="30%"
  >
  <span>您确定要删除这个商品吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="danger" @click="deleteList">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // 商品数量
      num: 5,
      // 商品id
      productId:'',
      productNum:'',
      // 删除商品弹出框
      deleteDialogVisible:false,
      // 购物车
      cartList: [],
      checkAll:false,
      checked:false
    };
  },
  created(){
     this.getCartList();
  },
  mounted() {
    // 获取商品数据
    // this.getCartList();
  },
  //未完成的全选自动判断
  // watch:{
  //   checkAll(){
  //     var b= this.checkAll==this.cartList.length;
  //     return checkAll=b;
  //   }
  // },
    //  computed:{
    //   checks(){
    //      var b=(this.checkAll == this.cartList.length);
    //      console.log("b"+b)
    //      return this.checkAll=b;
    //   }
      // checkOut(){
      //   var i =0;
      //   this.cartList.forEach((item)=>{
      //     if(item.checked=='1')i++;
      //   })
      //   return i;
      // }
    // },
    computed:{
      totalPrice(){
        var money=0;
        this.cartList.forEach((item)=>{
          if(item.checked==true){
            money+=parseFloat(item.salePrice)*parseInt(item.productNum)
          }
        })
        return money;
      }
    },
  methods: {
    // 获取商品数据
    getCartList() {
      // console.log("链接")
      axios.get("/users/cart").then(response => {
        let res = response.data;
        if(res.status=="0"){
        // console.log("里面")
        let res = response.data;
        this.cartList = res.result;
        console.log(res.result);
        console.log(res);
        // if(res.result.checked=="1"){
        //   this.checked=true
        // }else{
        //   this.checked=false
        // }
        }else{
             this.$message.error(res.msg)
        }
      });
    },
    // 获取数量的变化
    change1(productNum,productId,checked){
      console.log(productNum)
      console.log(productId)
      console.log(checked)
      this.productId=productId;
      this.productNum=productNum;
      // this.checked=checked;
      axios.post("/users/cartEdit",{
        productId:this.productId,
        productNum:this.productNum,
        // checked:this.checked
      }).then((response)=>{
        let res= response.data;
      })
    },
    // 商品选中
    change(checked,productId){
      console.log(checked);
      this.checked=checked;
      this.productId=productId;
      console.log(productId)
     axios.post("/users/cartsEdit",{
        productId:this.productId,
        checked:this.checked
      }).then((response)=>{
        let res= response.data;
      })
    }
    ,
    // 全选
    change2(checkAll){
      console.log(checkAll);
      // if(this.checkAll==true){
      //   this.cartList.forEach((item)=>{
      //     item.checked=true;
      //     console.log("t")
      //   })
      // }else{
      //   this.cartList.forEach((item)=>{
      //     item.checked=false;
      //     console.log("f")
      //      })
      // }
      axios.post("/users/allEdit",{
        checkAll:this.checkAll
      }).then((response)=>{
        let res =response.data;
        if(res.status=="0"){
          this.getCartList();
          console.log("suc")
        }
      })
    },
    // 删除按钮
    showDelete(productId){
      this.productId=productId;
      this.deleteDialogVisible=true
    },
    // 删除商品
    deleteList(){
      console.log("lianjie")
      axios.post("/users/cartDel",{
        productId:this.productId
      }).then((response)=>{
        console.log("limain")
        let res = response.data;
        if(res.status=="0"){
          console.log("why")
          this.deleteDialogVisible=false;
          this.getCartList()
          this.$message.success("删除成功")
        }
        else(
          this.$message.error("删除失败")
        )
        this.deleteDialogVisible=false
      })
    },
    // 地址页面
    toAddr(){
      this.$router.push('/address')
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
/* 头部文字 */
.text {
  height: 70px;
}
.text a {
  padding-left: 100px;
  font-size: 35px;
  line-height: 60px;
}
/* 购物车 */
.cart {
  background-color: #f5f7fc;
}
/* 购物车头部 */
.cart-head {
  height: 40px;
  width: 85%;
  margin-left: 90px;
}
.cart-head ul {
  display: flex;
}
.cart-head ul li {
  width: 235px;
  height: 40px;
  background-color: #605f5f;
  text-align: center;
  font-size: 20px;
  color: white;
}
.cart-head ul li a {
  line-height: 40px;
}
/* 购物车列表 */
.cart-list {
  width: 85%;
  margin-left: 90px;
  background-color: white;
}
.cart-list li {
  height: 150px;
  display: flex;
  border-left:1px grey solid;
  border-right:1px grey solid;
  border-bottom:1px grey solid;
}
.select {
  width: 5%;
  height: 150px;
  border-right:1px grey solid;
}
.sle-img{
  width:30px;
  height:30px;
  margin-top:40px;
  margin-left:30px;
}
.image {
  width: 10%;
  height: 150px;
  border-right:1px grey solid;
}
.msg {
  width: 20%;
  height: 150px;
  line-height:120px;
  text-align:center;
  font-weight:bold;
  font-size:20px;
  border-right:1px grey solid;
}
.t-image {
  width: 70%;
  height: 60%;
  border: 1px grey solid;
  margin-left:20px;
  margin-top:20px;
}
.t-image img {
  width: 100%;
  height: 100%;
}
.price {
  width: 15%;
  height: 150px;
  line-height:120px;
  text-align:center;
  font-weight:bold;
  font-size:20px;
  border-right:1px grey solid;
}
.number {
  width: 15%;
  height: 150px;
  border-right:1px grey solid;
}
.number-de{
  margin-top:40px;
  margin-left:5px;
}
.all {
  width: 15%;
  height: 150px;
  line-height:120px;
  text-align:center;
  font-weight:bold;
  font-size:20px;
  border-right:1px grey solid;
}
.edit {
  width: 20%;
  height: 150px;
}
.edit-p{
  margin-left:40px;
  margin-top:40px;
}
.el-button{
  width:180px;
  height:40px;
}
/* 购物车尾部 */
.foot {
  height: 40px;
  width: 85%;
  margin-left: 90px;
  margin-top: 20px;
  background-color: white;
  border:1px grey solid;
  position: relative;
}
.foot-select {
  width: 12%;
  height: 40px;
  position: absolute;
  left:40px;
  top:10px;
}
.foot-text {
  width: 16%;
  height: 40px;
   position: absolute;
   right:50px;
    top:10px;
}
.pay {
  width: 12%;
  height: 40px;
   position: absolute;
   right:10px;
   z-index: 999;
}
</style>