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
            <el-button slot="append" icon="el-icon-search" @click="searchG"></el-button>
          </el-input>
           <el-button type="primary" @click="addG">添加</el-button>
   </div>
   <!-- 用户信息列表 -->
       <el-table
      :data="tableData"
     :default-sort = "{prop: 'productId', order: 'ascending'}"
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
        <template slot-scope="scope">
          <el-button type="primary"  @click="getG(scope.row.productId)">修改</el-button>
          <el-button type="danger"  @click="deleteG(scope.row.productId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 <!-- 分页 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 3, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
        <!-- 添加商品 -->
  <el-dialog title="添加商品" :visible.sync="addGVisible">
  <el-form :model="add">
     <el-form-item label="商品id" :label-width="formLabelWidth">
      <el-input v-model="add.productId" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="add.productName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="商品售价" :label-width="formLabelWidth">
      <el-input v-model="add.salePrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品种类" :label-width="formLabelWidth" >
      <!-- <el-input v-model="add.productType" autocomplete="off"></el-input> -->
      <el-select v-model="add.productType" placeholder="请选择商品种类" style="padding-left:20px; width:280px" >
        <el-option label="雕塑手办" value="hand"></el-option>
        <el-option label="毛绒玩具" value="doll"></el-option>
        <el-option label="男女服饰" value="clothes"></el-option>
        <el-option label="其他" value="others"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品图片" :label-width="formLabelWidth">
      <el-input v-model="add.productImage" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addGVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGs">确 定</el-button>
  </div>
         </el-dialog>
          <!-- 修改框 -->
          <el-dialog title="修改商品信息" :visible.sync="changeVisible">
  <el-form :model="nowG">
     <el-form-item label="商品id" :label-width="formLabelWidth">
      <el-input v-model="nowG.productId" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="nowG.productName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="商品售价" :label-width="formLabelWidth">
      <el-input v-model="nowG.salePrice" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changeVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeGs">确 定</el-button>
  </div>
         </el-dialog>
    <!-- 确认删除 -->
    <el-dialog
  title="提示"
  :visible.sync="deleteVisible"
  width="30%"
  :before-close="handleClose">
  <span>您确定要删除这个商品吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="danger" @click="deleteGs">确 定</el-button>
  </span>
</el-dialog>
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
            total:0,
            add:{},
            nowG:[],
            addGVisible:false,
            changeVisible:false,
            deleteVisible:false,
            formLabelWidth:'120px'
        }
    },
    mounted(){
      this.getAllGoods();
      this.getTotal();
    },
    methods:{
      getTotal(){
        axios.get('/goods/allGoods').then((response)=>{
          let res =response.data;
          if(res.status="0"){
              this.total=res.result.count;
          }
        })
      },
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
              this.getTotal()
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
    //添加商品
    addG(){
      this.addGVisible=true;
    },
    addGs(){
       axios.post('/goods/addG',{
        productId:this.add.productId,
        productName:this.add.productName,
        salePrice:this.add.salePrice,
        productImage:this.add.productImage,
        productType:this.add.productType
      }).then((response)=>{
        let res= response.data;
        if(res.status=="0"){
          this.$message.success("添加成功！")
          this.addGVisible=false
          this.getAllGoods()
        }else{
          this.$message.error("添加失败！")
        }
      })
    },
    //修改商品
    changeGs(){
      axios.post('/goods/changeG',{
       productId:this.nowG.productId,
        productName:this.nowG.productName,
        salePrice:this.nowG.salePrice
      }).then((response)=>{
        let res= response.data;
        if(res.status=="0"){
          this.$message.success("修改成功！")
          this.changeVisible=false
          this.getAllGoods()
        }else{
          this.$message.error("修改失败！")
        }
      })
    },
    //删除商品
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    deleteG(productId){
      this.deleteVisible=true
    },
    deleteGs(productId){
      axios.post('/goods/deleteG',{
        productId:this.nowG.productId
      }).then((response)=>{
         let res= response.data;
         console.log(res)
        if(res.status=="0"){
          this.$message.success("删除成功！")
          this.deleteVisible=false
          this.getAllGoods()
        }else{
          this.$message.error("删除失败！")
        }
      })
    },
       //获取当前用户
    getG(productId){
      var param = {
        productId:productId
      }
      console.log(productId);
      axios.get('/goods/getG',{params:param}).then((response)=>{
        let res=response.data;
        console.log(res);
        if(res.status="0"){
          this.nowG=res.result
          this.changeVisible=true
        }
      })
    },
    //查找
    searchG(){
      var param = {
        searchG:this.search
      }
      axios.get('/goods/searchG',{params:param}).then((response)=>{
        let res=response.data;
        if(res.status="0"){
          this.$message.success("搜索成功")
          this.tableData=res.result;
          this.search=''
        }
      })
    }
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