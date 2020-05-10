<template>
    <div>
        <!-- 整体 -->
        <div class="all">
            <!-- 左部分 -->
            <div class="left">
                <!-- 图片 -->
                <div class="pic">
                    <img v-lazy="require(`./../assets/${proMsg.productType}/${proMsg.productImage}`)" alt="">
                </div>
            </div>
            <!-- 右部分 -->
            <div class="right">
                <!-- 名字 -->
                <div class="name">
                    <a>{{proMsg.productName}}</a>
                    <p>精美的玩意儿，世界究极限量款，全球仅一个</p>
                    </div>
                <!-- 简介 -->
                <!-- <a href="">{{proMsg.productType}}</a> -->
                <!-- 价格 -->
                <div class="price">
                    <p>仅售:${{proMsg.salePrice}}</p>
                    <p style="color:grey">原价:$<s>9999</s></p>
                    </div>
                <!-- 大小 -->
                <div class="size">
                    <a style="font-weight:bold">选择大小</a>
                    <div class="size-cho">
                        <a>模拟真人1:1</a>
                    </div>
                </div>
                <!-- 颜色 -->
                <div class="color">
                     <a style="font-weight:bold">选择颜色</a>
                    <div class="color-cho">
                        <a>原色</a>
                    </div>
                </div>
                <!-- 加入购物车 -->
                <div class="add">
                    <el-button type="info" round @click="addCart(productId)">加入购物车</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            productId:this.$route.params.productId,
            proMsg:[]
        }
    },
    mounted(){
        this.getproMsg()
    },
    methods:{
        getproMsg(){
            var param = {
                productId:this.productId
            };
        axios.get('/goods/detail',{params:param}).then(response=>{
            let res = response.data;
            if(res.status=="0"){
                console.log(res);
                this.proMsg=res.result;
            }   
        })
        },
          addCart(productId){
      axios.post("/goods/addCart",{
        productId:productId
      }).then((response)=>{
        console.log(response);
        if(response.data.status == "0"){
          this.$message.success("添加成功")
      }else{
        this.$message.error("添加失败")
      }
      })
    }
    }
}
</script>
<style scoped>
/* 整体 */
.all{
    width:80%;
    height:700px;
    margin:0  auto;
}
/* 左部分 */
.left{
    width:50%;
    height:100%;
    float:left;
}
/* 图片 */
.pic img{
    width:80%;
    height:80%;
    border:1px grey solid;
    margin-top:60px;
}
/* 右部分 */
.right{
    width:50%;
    height:100%;
    float:right;
}
/* 名字 */
.name{
      width:100%;
    height:20%;
}
.name a{
    font-size:30px;
    line-height:100px;
    font-weight: bold;
}
/* 价格 */
.price{
    width:100%;
    height:20%;
    font-size:18px;
    line-height:30px;
    color:red;
}
/* 大小 */
.size{
    width:100%;
    height:20%;
    font-size:15px;

}
.size-cho{
    width:50%;
    height:48%;
    margin-top:20px;
    border:1px grey solid;
        text-align: center;
        line-height:60px;
        color:grey;
}
/* 颜色 */
.color{
    width:100%;
    height:20%;
        font-size:15px;

    
}
.color-cho{
     width:50%;
    height:48%;
    margin-top:20px;
    border:1px grey solid;
        text-align: center;
        line-height:60px;
        color:grey;

}
/* 加入购物车 */
.add{
    width:100%;
    height:20%;
}
.el-button{
    width:230px;
    height:50px;
    margin-left:30px;
}
</style>