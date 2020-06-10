<template>
  <div>
    <el-backtop></el-backtop>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商城首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部文字 -->
    <div class="text">
      <a>我的订单</a>
    </div>
    <!-- 订单列表 -->
    <div class="order">
        <ul>
            <li class="li1" v-for="(order,index) in orderList" :key="index">
                <div class="Order">
                    <div class="top">
                      <div class="top-font">
                        <li v-for="(addr,index) in order.addressInfo" :key="index" class="font">
                        <a>{{addr.userName}}</a>
                        <a>{{addr.streetName}}</a>
                        <a>{{addr.tel}}</a>
                        </li>
                        </div>
                        <div class="buttons">
                          <el-button size="mini" type="danger" icon="el-icon-close" circle @click="showD(order.orderTotal)"></el-button>
                        </div>
                          <div class="total">
                          <a>商品总价:</a>  
                          <a>{{order.orderTotal}}</a>
                        </div>
                    </div>
                    <div class="middle">
                    <li v-for="(goods,index) in order.goodsList" :key="index">
                      <div class="middles">
                      <div class="imgs">
                       <img class="img" v-lazy="require(`./../assets/${goods.productType}/${goods.productImage}`)" alt />
                      </div>
                      <div class="detail">
                        <a>{{goods.productName}}</a>*<a>{{goods.productNum}}</a>
                        <div class="tag">
                          <a class="price">${{goods.salePrice}}</a>
                        <el-tag type="info" class="tag-d">未支付</el-tag>
                        </div>
                        </div>
                        </div>
                        </li>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- 确认删除 -->
      <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" :before-close="handleClose">
        <span>您确定要删除这个订单吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="danger" @click="deleteOrder()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
        // 订单列表
        orderList:[],
        deleteVisible:false,
        tmpTotal:0
    };
  },
  created(){
       this.getAllOrders();
  },
  mounted() {
     
  },
  methods:{
    //   获取订单
      getAllOrders(){
          axios.get("users/myOrder").then((response)=>{
             let res = response.data;
             if(res.status=="0"){
        console.log(res);
              this.orderList=res.result;
              console.log(this.orderList)
          }else{
            this.$message.error(res.msg)
          }
             
             
          })
      },
      //删除订单
    showD(orderTotal){
        this.tmpTotal=orderTotal;
        this.deleteVisible=true;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      deleteOrder(){
        console.log(this.tmpTotal)
        axios.post("/users/deleteOrder",{
          orderTotal:this.tmpTotal
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.$message.success("删除成功")
            this.deleteVisible=false;
            this.getAllOrders();
          }else{
            this.$message.error("删除失败")
          }
        })
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
/* 订单列表 */
.order{
  width:85%;
  margin:0 auto;
}
.li1{
  margin-top:25px;
}
.top-font{
  width:500px;
  float:left;
  padding-left:20px;
  font-size:18px;
}
.top-font a{
  padding-left:20px;
}
.font{
  padding-left:20px;
  line-height:50px;
}
.top{
  height:50px;
  background-color:#605F5F;
  color:white;
}
.total{
  float:right;
  width:200px;
  margin-right:40px;
  margin-top:15px;
  font-size:24px;
}
.buttons{
  float:right;
    width:50px;
    margin-left:50px;
    margin-top:10px;
}
.middle{
  border:1px solid;
}
.middles{
  display: flex;
}
.imgs{
    width:20%;
    padding:4px;
}
.img{
  width:100px;
  height:100px;
  margin-left:70px;
}
.detail{
    width:80%;
    line-height:100px;
     font-weight:bold;
     font-size:20px;
}
.tag{
  float:right;
  margin-right:50px;
}
.tag-d{
  width:80px;
  height:40px;
  font-size:15px;
  line-height:40px;
  text-align: center;
  background-color:lightgrey;
}
.price{
  margin-right:390px;
}
</style>