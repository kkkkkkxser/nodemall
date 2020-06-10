<template>
  <div>
    <!-- 页面的布局 -->
    <el-container>
      <el-header height="113px">
        <!-- 头部图标 -->
        <div class="head">
          <a href="javascript:avoid(0)" class="head-image">
          </a>
        </div>
      </el-header>
      <el-main>
        <!-- 登录框 -->
        <div class="login">
          <!-- 提示区 -->
          <div class="top">
            <a style="color:black">普通用户登录</a>
            <el-divider direction="vertical"></el-divider>
            <a href="javascript:avoid(0)" @click="toBackLogin" >管理员登录</a>
          </div>
          <!-- 账号密码输入区 -->
          <div class="msg">
            <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
              <el-form-item prop="userName" class="loginForm">
                <el-input
                  v-model="loginForm.userName"
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userPwd" class="loginForm">
                <el-input
                  v-model="loginForm.userPwd"
                  prefix-icon="el-icon-lock"
                  placeholder="请输入密码"
                  type="password"
                  show-password
                   @keyup.native.enter="submitForm"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-btn">
            <!-- 按钮区域 -->
            <el-button type="primary" @click="submitForm" class="button1">登录</el-button>
            <br>
            <br>
            <!-- 账号注册 -->
            <a href="javascript:void(0);" @click="regist">没有账号，立即注册</a>
          </div>
        </div>
      </el-main>
      <el-footer>
        <!-- 维权信息系列 -->
      <nav-footer></nav-footer>
      </el-footer>
    </el-container>
    <!-- 注册弹出框 -->
    <el-dialog title="账号注册" :visible.sync="dialogFormVisible">
      <el-form :model="regist1">
        <el-form-item label="账号" :label-width="formLabelWidth" class="regist-form">
          <el-input v-model="regist1.userName" autocomplete="off" placeholder="请输入3-10位的账号"></el-input>
        </el-form-item>
       <el-form-item label="密码" :label-width="formLabelWidth" class="regist-form">
          <el-input v-model="regist1.userPwd" autocomplete="off" placeholder="请输入6-30位的密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false" class="f-buts">取 消</el-button>
        <el-button type="primary" @click="toRegist" class="f-buts">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import NavFooter from './../components/NavFooter'
import '../css/clear.css'
export default {
  data() {
    return {
      //  登录账号密码伪数据
      loginForm: {
        userName: "",
        userPwd: ""
      },
      //  登录账号密码表单验证
      loginRules: {
        userName: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      },
      // 注册弹出框数据
        dialogFormVisible: false,
        formLabelWidth: '120px',
        regist1:{
          userName:'',
          userPwd:''
        },
    };
  },
  methods: {
    // 登录
    submitForm() {
      //  假判断，自定义
      // if (
      //   this.$refs.loginFormRef.model.userName === "user" &&
      //   this.$refs.loginFormRef.model.userPwd === "123456"
      // ) {
      //   this.$router.push("/home");
      //   this.$message.success("登录成功！");
      // } else {
      //   return this.$message.error("密码错误!");
      // }
      axios.post("/users/login",{
        userName:this.loginForm.userName,
        userPwd:this.loginForm.userPwd
      }).then((response)=>{
        let res= response.data;
        if(res.status=="0"){
          this.$router.push("/home")
          this.$message({
            duration:1000,
            message:"登录成功",
            type:'success'
          })
        }else{
          // alert(res.result.err)
          this.$message.error("密码错误")
        }
      })
    },
    // 注册
    regist(){
      this.dialogFormVisible = true
    },
    toBackLogin(){
      this.$router.push('/backlogin')
    },
    toRegist(){
    this.dialogFormVisible = false;
    axios.post("/users/regist",{
      userName:this.regist1.userName,
      userPwd:this.regist1.userPwd
    }).then((response)=>{
      let res=response.data;
      if(res.status=="0"){
        this.$message.success("注册成功")
      }else{
        this.$message.error("注册失败!")
      }
    })
    }
  },
  components:{
    NavFooter
  }
};
</script>
<style scoped>
/* 全局清空 */
*{
  margin:0;
  padding:0;
  list-style: none;
}
/* 布局的样式 */
.el-main {
  height: 576px;
  background: url(./../assets/bg3.jpg) center;
}
/* 调整头部图标位置 */
.el-header{
  background-color:#090909;
  position: relative;
}
.head {
  position: absolute;
  top:30px;
  left:50px;
}
.head-image{
    display:block;
    width: 297px;
    height: 39px;
    z-index: 99;
    background:url(./../assets/spirit.jpg);
    background-position: -2px -147px;
}
/* 登录框 */
.login {
  width: 400px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.6);
  float: right;
  transform: translate(-150px, 20px);
  font-size: 23px;
  color: grey;
}
/* 提示区 */
.top {
  padding-left: 40px;
  padding-top: 50px;
}
.top a{
  color:grey;
}
/* 输入区域 */
.msg {
  margin-top: 40px;
  margin-left: 20px;
}
/* 输入框 */
.loginForm {
  width: 350px;
  height: 60px;
}
/* 登录按钮 */
.button1 {
  width: 350px;
  background-color: grey;
  height: 50px;
  font-size:25px;
  letter-spacing: 100px;
  padding-left:90px;
}
/* 按钮区 */
.login-btn {
  margin-left: 20px;
  font-size:15px;
}
.login-btn a{
  color:grey;
}
/* 维权信息系列 */
.sp{
  background: url(./../assets/spirit.jpg)no-repeat 0px -285px;
  display:block;
  width: 42px;
    height: 52px;
  
}
.regist-form{
  width:450px;
  margin-top:20px;
}
.f-buts{
  width:70px;
  height:40px;
}
</style>