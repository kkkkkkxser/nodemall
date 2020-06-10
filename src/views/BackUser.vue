<template>
    <div>
                <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户信息</el-breadcrumb-item>
   </el-breadcrumb>
   <!-- 搜索 -->
   <div class="search">
          <el-input placeholder="请输入内容" class="input" v-model="search" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchU"></el-button>
          </el-input>
          <el-button type="primary" @click="addU">添加</el-button>
   </div>
   <!-- 用户信息列表 -->
       <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="userId"
        label="用户Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userPwd"
        label="密码"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="getU(scope.row.userId)">修改</el-button>
           <el-button type="danger" @click="deleteU(scope.row.userId)">删除</el-button>  
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
         <!-- 修改框 -->
         <el-dialog title="修改用户信息" :visible.sync="changeVisible">
  <el-form :model="nowU">
     <el-form-item label="用户Id" :label-width="formLabelWidth">
      <el-input v-model="nowU.userId" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="nowU.userName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="nowU.userPwd" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changeVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeU">确 定</el-button>
  </div>
         </el-dialog>
    <!-- 确认删除 -->
    <el-dialog
  title="提示"
  :visible.sync="deleteVisible"
  width="30%"
  :before-close="handleClose">
  <span>您确定要删除这个用户吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="danger" @click="deleteUs">确 定</el-button>
  </span>
</el-dialog>
  <!-- 添加用户 -->
  <el-dialog title="添加用户" :visible.sync="addUVisible">
  <el-form :model="add">
     <el-form-item label="用户Id" :label-width="formLabelWidth">
      <el-input v-model="add.userId" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="add.userName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="add.userPwd" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addUVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUs">确 定</el-button>
  </div>
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
            nowU:[],
            add:{},
            changeVisible:false,
            deleteVisible:false,
            addUVisible:false,
            formLabelWidth:'120px'
        }
    },
    mounted(){
      this.getAllUsers();
      this.getTotal();
    },
    methods:{
         getTotal(){
        axios.get('/users/allUsers').then((response)=>{
          let res =response.data;
          if(res.status="0"){
              this.total=res.result.count;
          }
          console.log(this.tableData)
        })
      },
      getAllUsers(){
        var param ={
          page:this.page,
          pageSize:this.pageSize
        }
        axios.get('/users/allUsers',{
          params:param
        }).then((response)=>{
          let res =response.data;
          if(res.status="0"){
              this.tableData=res.result.list;
              this.getTotal();
          }
          console.log(this.tableData)
        })
      },
      // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize)
      this.pageSize = newSize
      this.getAllUsers()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.page = newPage
      this.getAllUsers()
    },
    //修改用户
    changeU(){
      axios.post('/users/changeU',{
        userId:this.nowU.userId,
        userName:this.nowU.userName,
        userPwd:this.nowU.userPwd
      }).then((response)=>{
        let res= response.data;
        if(res.status=="0"){
          this.$message.success("修改成功！")
          this.changeVisible=false
          this.getAllUsers()
        }else{
          this.$message.error("修改失败！")
        }
      })
    },
    //删除用户
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    deleteU(userId){
      this.deleteVisible=true
    },
    deleteUs(){
      axios.post('/users/deleteU',{
        userId:this.nowU.userId
      }).then((response)=>{
         let res= response.data;
        if(res.status=="0"){
          this.$message.success("删除成功！")
          this.deleteVisible=false
          this.getAllUsers()
        }else{
          this.$message.error("删除失败！")
        }
      })
    },
    //添加用户
    addU(){
      this.addUVisible=true
    },
    addUs(){
      axios.post('/users/addU',{
        userId:this.add.userId,
        userName:this.add.userName,
        userPwd:this.add.userPwd
      }).then((response)=>{
        let res= response.data;
        if(res.status=="0"){
          this.$message.success("添加成功！")
          this.addUVisible=false
          this.getAllUsers()
        }else{
          this.$message.error("添加失败！")
        }
      })
    },
    //获取当前用户
    getU(userId){
      var param = {
        userId:userId
      }
      axios.get('/users/getU',{params:param}).then((response)=>{
        let res=response.data;
        console.log(res);
        if(res.status="0"){
          this.nowU=res.result
          this.changeVisible=true
        }
      })
    },
    //搜索用户
     searchU(){
      var param = {
        searchU:this.search
      }
      axios.get('/users/searchU',{params:param}).then((response)=>{
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