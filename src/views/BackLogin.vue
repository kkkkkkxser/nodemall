<template>
  <!-- 容器 -->
  <div class="container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="login_pic">
        <img src="./../assets/gay.jpg" alt="">
      </div>
      <!-- 用户密码区域 -->
      <div class="other">
        <!-- 表单区域 -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="username" class="loginForm">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="loginForm">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-star-on" type="password"></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮区域 -->
        <el-button type="primary" @click="submitForm" class="button1">提交</el-button>
        <el-button type="info" @click="resetForm" class="button2">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //  登录账号密码伪数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //  登录账号密码表单验证
      loginRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  登录按钮
    submitForm () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        //  假判断，自定义
        if (
          this.$refs.loginFormRef.model.username === 'admin' &&
          this.$refs.loginFormRef.model.password === '123456'
        ) {
          this.$message.success("登录成功!")
          this.$router.push('/back')
        } else {
          return this.$message.error('密码错误!')
        }
        // const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(res)
        // if (res.meta.status !== 200) return this.$message.error('密码错误')
        // this.$message.success('登录成功')
        // window.sessionStorage.setItem('token', res.data.token)
        // this.$router.push('/home')
      })
    },
    //  重置按钮
    resetForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style scoped>
.container {
  height:722px;
  background-color:#545C64;
}
.login_box {
  width: 600px;
  height: 380px;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5%;
  border:1px grey solid;
}
.login_pic {
  width: 200px;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_pic img{
   width: 200px;
  height: 200px;
  margin-left:20px;
  margin-top:-10px;
}
.other {
  width: 400px;
  height: 100%;
  float: left;
}
.loginForm {
  width: 300px;
  margin-top: 70px;
  margin-left: 30px;
}
.button1 {
  margin-left: 60px;
  margin-top: 20px;
}
.button2 {
  margin-left: 60px !important;
}
</style>
