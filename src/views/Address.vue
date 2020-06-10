<template>
  <div>
    <el-backtop></el-backtop>
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
      <!-- 文字 -->
      <div class="addr">
        <a>收货地址</a>
      </div>
      <!-- 地址列表 -->
      <div class="addr-detail">
        <ul>
          <li
            v-for="(item,index) in addressListFilter"
            :key="item.id"
            v-bind:class="{'check':checkIndex==index}"
            @click="checkIndex=index"
          >
            <dl>
               <dd>&nbsp;</dd>          
              <dd>{{item.userName}}</dd>
              <dd>{{item.streetName}}</dd>
              <dd>{{item.tel}}</dd>
              <el-button
                type="danger"
                @click="deleteA(item.userName)"
                 icon="el-icon-close" circle
                 class="button-close"
                 size="small"
              ></el-button>
            </dl>
          </li>
          <li>
            <a href="javascript:avoid(0)" @click="addA">
              <img src="./../assets/add.svg" class="add-p" />
            </a>
            <p>添加新地址</p>
          </li>
        </ul>
        <a href="javascript:avoid(0)" @click="expand()" class="addr-a">展开/恢复</a>
      </div>
      <!-- 商品信息 -->
      <div class="product">
        <div class="product-text">
          <a>商品</a>
        </div>
        <div class="product-msg">
          <ul>
            <li v-for="(item,index) in payList" :key="item.id">
              <div class="pro-img">
                <img v-lazy="require(`./../assets/${item.productType}/${item.productImage}`)" alt />
                <div class="pro-img-tx">
                  <a>{{item.productName}}</a>
                </div>
              </div>
              <div class="pro-msg"></div>
              <div class="pro-price">
                <a>{{item.salePrice}}元x{{item.productNum}}</a>
              </div>
              <div class="pro-total">
                <a>{{totalEach[index]}}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 配送方式 -->
      <div class="send-way">
        <a class="big">配送方式</a>
        <a class="small">包邮</a>
        <br />
        <a class="big">发票</a>
        <a class="small-1">电子发票 个人</a>
      </div>
      <!-- 总价 -->
      <div class="total">
        <div class="total-text">
          <a class="total-left">商品件数:</a>
          <a class="total-right">{{totalNum}}</a>
          <br />
          <a class="total-left">商品总价:</a>
          <a class="total-right">{{total}}</a>
          <br />
          <a class="total-left">优惠活动:</a>
          <a class="total-right">0</a>
          <br />
          <a class="total-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运费:</a>
          <a class="total-right">0</a>
          <br />
          <a class="total-left">应付总额:</a>
          <a class="total-right">{{total}}</a>
          <br />
        </div>
      </div>
      <!-- 结算 -->
      <div class="buttons">
        <div class="but">
          <el-button type="info" @click="goBack">返回购物车</el-button>
          <el-button type="danger" @click="goPay">去结算</el-button>
        </div>
      </div>
      <!-- 地址 -->
      <el-dialog title="添加地址" :visible.sync="dialogFormVisible">
        <el-form :model="addressA">
          <el-form-item label="用户名" :label-width="formLabelWidth" class="regist-form">
            <el-input v-model="addressA.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" class="regist-form">
            <el-input v-model="addressA.streetName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" class="regist-form">
            <el-input v-model="addressA.tel" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toAdda">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 确认删除 -->
      <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" :before-close="handleClose">
        <span>您确定要删除这个地址吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="danger" @click="deleteAdd()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // 地址列表
      addrList: [],
      // 地址数
      limit: 2,
      checkIndex: 0,
      cartList: [],
      payList: [],
      tmpUserName:"",
      // 添加地址
      dialogFormVisible: false,
      deleteVisible:false,
      formLabelWidth: "120px",
      addressA: {
        userName: "",
        streetName: "",
        tel: ""
      }
    };
  },
  mounted() {
    // 初始化
    this.init();
    // 获取商品数据
    this.getCartList();
  },
  computed: {
    // 更多地址
    addressListFilter() {
      return this.addrList.slice(0, this.limit);
    },
    //订单列表
    // payList(){
    //     var payL=[];
    //     var i=0;
    //     this.cartList.forEach((item)=>{
    //         if(item.checked==true){
    //             payL[i]=item
    //         }
    //         i++;
    //     })
    // },
    //每个
    totalEach() {
      var totalE = [];
      var i = 0;
      this.payList.forEach(item => {
        totalE[i] = parseFloat(item.salePrice) * parseInt(item.productNum);
        i++;
      });
      return totalE;
    },
    // 总金额
    total() {
      var totalP = 0;
      this.payList.forEach(item => {
        totalP += parseFloat(item.salePrice) * parseInt(item.productNum);
      });
      return totalP;
    },
    // 商品总件数
    totalNum() {
      var totalN = 0;
      this.payList.forEach(item => {
        totalN += parseInt(item.productNum);
      });
      return totalN;
    },
    //当前地址
    nowAdd(){
      var now=[];
      var i=0;
      this.addrList.forEach(item=>{
        item.index=i
        if(this.checkIndex==item.index){
          now.push(item)
        }
        i++;
      })
      return now;
    }
  },
  methods: {
    // 获取地址
    init() {
      axios.get("/users/addr").then(response => {
        let res = response.data;
        this.addrList = res.result;
      });
    },
    expand() {
      if (this.limit == 2) {
        this.limit = this.addrList.length;
      } else {
        this.limit = 2;
      }
    },
    // 获取商品数据
    getCartList() {
      // console.log("链接")
      axios.get("/users/cart").then(response => {
        // console.log("里面")
        let res = response.data;
        this.cartList = res.result;
        console.log(res.result);
        console.log(res);
        let payL = [];
        let i = 0;
        res.result.forEach(item => {
          if (item.checked == true) {
            payL[i] = item;
            i++;
          }
        });
        this.payList = payL;
        // if(res.result.checked=="1"){
        //   this.checked=true
        // }else{
        //   this.checked=false
        // }
        console.log(payL);
      });
    },
    // 返回购物车
    goBack() {
      this.$router.push("/cart");
    },
    // 去结算
    goPay() {
      console.log(this.total)
      console.log(this.payList)
      console.log(this.nowAdd)
      console.log(this.checkIndex)
      axios.post("users/addOrder",{
         total:this.total,
         payList:this.payList,
         nowAdd:this.nowAdd
      }).then((response)=>{
       let res = response.data;
          if (res.status == "0") {
            this.$message.success("下单成功");
            this.init();
          } else {
            this.$message.error("下单失败!");
          }
      })
      this.$router.push("/pay");
    },
    addA() {
      this.dialogFormVisible = true;
    },
    toAdda() {
      this.dialogFormVisible = false;
      axios
        .post("/users/addAdress", {
          userName: this.addressA.userName,
          streetName: this.addressA.streetName,
          tel: this.addressA.tel
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.$message.success("添加成功");
            this.init();
          } else {
            this.$message.error("添加失败!");
          }
        });
    },
    //删除地址
    deleteA(userName){
        this.deleteVisible=true;
        this.tmpUserName=userName
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    deleteAdd() {
      axios
        .post("/users/deleteAdd", {
          userName:this.tmpUserName
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.$message.success("删除成功");
            this.deleteVisible=false;
            this.init();
          } else {
            this.$message.error("删除失败!");
          }
        });
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
/* 详细的 */
.detail {
  width: 85%;
  margin-left: 90px;
}
/* 文字 */
.addr {
  height: 40px;
  font-weight: bold;
}
/* 地址列表 */
.addr-detail {
  height: 220px;
}
.add-p {
  width: 50px;
  height: 50px;
  margin-left: 80px;
  margin-top: 50px;
}
.addr-a {
  color: grey;
  line-height: 30px;
  padding-left: 600px;
  font-weight: bold;
}
.addr-detail p {
  padding-left: 70px;
  line-height: 40px;
}
.addr-detail ul {
  display: flex;
}
.addr-detail ul li {
  width: 220px;
  height: 180px;
  border: 1px grey solid;
  margin-left: 20px;
}
.addr-detail ul li:hover {
  border: 2px grey solid;
}
.addr-detail ul li dl dd {
  line-height: 40px;
  padding-left: 40px;
}
.check {
  border: 2px grey solid;
  color: red;
}
.button-close{
  float:right;
  margin-top:-150px;
  margin-right:15px;
}
/* 商品信息 */
.product {
}
.product-text {
  height: 40px;
  width: 100%;
}
.product-text a {
  line-height: 20px;
  font-weight: bold;
}
.product-msg {
}
.product-msg li {
  height: 110px;
  display: flex;
  border-top: 1px grey solid;
}
.pro-img {
  width: 30%;
}
.pro-img img {
  width: 100;
  height: 100px;
  margin-left: 20px;
  margin-top: 5px;
}
.pro-img-tx {
  float: right;
  line-height: 120px;
}
.pro-img-tx a {
  color: grey;
  font-weight: bold;
}
.pro-msg {
  width: 40%;
}
.pro-price {
  width: 15%;
}
.pro-price a {
  color: grey;
  font-weight: bold;
  line-height: 100px;
  font-size: 20px;
}
.pro-total {
  width: 15%;
}
.pro-total a {
  color: grey;
  font-weight: bold;
  line-height: 100px;
  font-size: 20px;
}
/* 配送方式 */
.send-way {
  height: 160px;
}
.big {
  font-size: 25px;
  padding-left: 30px;
  line-height: 60px;
  font-weight: bold;
}
.small {
  color: grey;
  padding-left: 80px;
  font-weight: bold;
}
.small-1 {
  color: grey;
  padding-left: 130px;
  font-weight: bold;
}
/* 总价 */
.total {
  height: 160px;
}
.total-text {
  float: right;
}
.total-left {
  font-size: 17px;
  margin-right: 150px;
  line-height: 25px;
}
.total-right {
  font-size: 15px;
  color: grey;
  margin-right: 20px;
}
/* 结算 */
.buttons {
  height: 120px;
}
.but {
  float: right;
  top: 30px;
}
</style>