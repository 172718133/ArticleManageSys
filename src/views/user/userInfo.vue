<template>
  <div class="info_container">
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <span>基本资料</span>
      </div>
      <el-form label-width="100px" ref="infoform" :model="infoFrom" :rules="infoFromRules">
        <el-form-item label="账号名称">
          <el-input disabled :value="infoFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="infoFrom.nickname" autocomplete="off" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="infoFrom.email" autocomplete="off" placeholder="请输入用户邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确认修改</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'art-info',
  data () {
    return {
      infoFrom: {
        username: this.$store.state.userInfo.username,
        nickname: '',
        email: ''
      },
      infoFromRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '请输入1-10位非空格字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '用户邮箱格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确认修改按钮点击事件
    confirm () {
      this.$refs.infoform.validate(async valid => {
        if (valid) {
          this.infoFrom.id = this.$store.state.userInfo.id
          const { data: res } = await updateUserInfoAPI(this.infoFrom)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$refs.infoform.resetFields()
          this.$message.success(res.message)
          this.$store.dispatch('getUserInfoAction')
        } else {
          return false
        }
      })
    },
    // 重置按钮点击事件
    reset () {
      this.$refs.infoform.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.header_box span {
  font-size: 16px;
  font-weight: bold;
}
.el-input {
  width: 380px;
}
</style>
