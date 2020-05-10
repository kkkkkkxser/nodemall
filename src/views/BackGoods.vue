<template>
    <div>
                <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品信息</el-breadcrumb-item>
   </el-breadcrumb>
   <!-- 搜索 -->
   <div class="search">
          <el-input placeholder="请输入内容" class="input" v-model="search" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
   </div>
   <!-- 用户信息列表 -->
       <el-table
      :data="tableData"
      border="">
      <el-table-column
        prop="productId"
        label="商品Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品名字"
        width="180">
      </el-table-column>
      <el-table-column
        label="商品图片"
        width="180">
        <template slot-scope="scope">
        <img v-lazy="require(`./../assets/${scope.row.productType}/${scope.row.productImage}`)" style="width:50px;height:50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="salePrice"
        label="商品价格">
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="slot">
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 <!-- 分页 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
          search:'',
            // 用户信息列表假数据
            tableData: [],
              page:1,
            pageSize:6,
            total:0
        }
    },
    mounted(){
      this.getAllGoods();
    },
    methods:{
      getAllGoods(){
        var param ={
          page:this.page,
          pageSize:this.pageSize
        }
        axios.get('/goods/allGoods',{
          params:param
        }).then((response)=>{
          let res =response.data;
          if(res.status="0"){
              this.tableData=res.result.list;
              this.total=res.result.count;
          }
          console.log(this.tableData)
        })
      },
      // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize)
      this.pageSize = newSize
      this.getAllGoods()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.page = newPage
      this.getAllGoods()
    },
    }
}
</script>
<style scoped>
/* 面包屑导航 */
.el-breadcrumb {
  height:50px;
  line-height:50px;
  font-size:22px;
  padding-left:30px;
}
/* 用户 信息列表 */
.el-table{
    border:1px grey solid;
    width:90%;
    margin-top:10px;
    margin-left:20px;
}
/* 搜索 */
.el-input{
  width:280px;
  height:40px;
  margin-left:20px;
}
</style>