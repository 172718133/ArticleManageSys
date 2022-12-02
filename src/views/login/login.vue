<template>
  <div class="login_container">
    <div class="title">文章管理系统</div>
    <div class="login_box">
      <div class="login">登录</div>
      <div class="login_form">
        <el-form ref="loginfrom" :model="loginFrom" :rules="loginFromRules">
          <el-form-item prop="username">
            <el-input v-model.trim="loginFrom.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="loginFrom.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="toReg">
        <span @click="$router.push('/register')">去注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  name: 'my-login',
  data () {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      loginFromRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须为1-10位大小写字母和数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,10}$/, message: '密码长度为6-15位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login () {
      const { data: res } = await login(this.loginFrom)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$store.commit('updateToken', res.token)
      this.$message.success(res.message)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: url('@/assets/images/bg.jpg') no-repeat center;
  background-size: cover;
  box-sizing: border-box;
  .title {
    color: #fff;
    font-size: 38px;
    margin-bottom: 50px;
  }
}
.login_box {
  width: 480px;
  height: 320px;
  text-align: center;
  background-color: #fff;
  .login {
    font-size: 22px;
    margin: 30px 0 30px 0;
  }
  .login_form {
    padding: 0 30px;
  }
  .toReg{
    text-align: right;
    margin-right: 30px;
    color: #999;
  }
}
</style>
