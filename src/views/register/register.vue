<template>
  <div class="reg_container">
    <div class="title">文章管理系统</div>
    <div class="reg_box">
      <div class="reg">注册</div>
      <div class="reg_form">
        <el-form ref="regfrom" :model="regFrom" :rules="regFromRules">
          <el-form-item prop="username">
            <el-input v-model.trim="regFrom.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="regFrom.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input v-model.trim="regFrom.repassword" prefix-icon="el-icon-lock" type="password" placeholder="再次确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="reg">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="toReg">
        <span @click="$router.push('/login')">去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api'
export default {
  name: 'my-reg',
  data () {
    const same = (rule, value, callback) => {
      if (value !== this.regFrom.password) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      regFrom: {
        username: '',
        password: '',
        repassword: ''
      },
      regFromRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须为1-10位大小写字母和数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,10}$/, message: '密码长度为6-15位', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,10}$/, message: '密码长度为6-15位', trigger: 'blur' },
          { validator: same, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reg () {
      this.$refs.regfrom.validate(async (valid) => {
        if (valid) {
          const { data: res } = await register(this.regFrom)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg_container {
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
.reg_box {
  width: 480px;
  height: 380px;
  text-align: center;
  background-color: #fff;
  .reg {
    font-size: 22px;
    margin: 30px 0 30px 0;
  }
  .reg_form {
    padding: 0 30px;
  }
  .toReg{
    text-align: right;
    margin-right: 30px;
    color: #999;
  }
}
</style>
