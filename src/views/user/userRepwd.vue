<template>
  <div class="repwd_container">
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <span>重置密码</span>
      </div>
      <el-form :model="PWDForm" :rules="PWDrulesForm" ref="PWDform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="old_pwd">
          <el-input v-model="PWDForm.old_pwd" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="PWDForm.new_pwd" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input v-model="PWDForm.re_pwd" type="password" placeholder="请输入确认密码"></el-input>
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
import { updateUserPwdAPI } from '@/api'
export default {
  name: 'art-repwd',
  data () {
    const newPWD = (rule, value, callback) => {
      if (value === this.PWDForm.old_pwd) {
        return callback(new Error('新旧密码不能一样'))
      }
    }
    const same = (rule, value, callback) => {
      if (value !== this.PWDForm.new_pwd) {
        return callback(new Error('两次密码不一致'))
      }
    }
    return {
      PWDForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      PWDrulesForm: {
        old_pwd: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码为6-15位非空格字符', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码为6-15位非空格字符', trigger: 'blur' },
          { validator: newPWD, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码为6-15位非空格字符', trigger: 'blur' },
          { validator: same, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async confirm () {
      const { data: res } = await updateUserPwdAPI(this.PWDForm)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$refs.PWDform.resetFields()
      this.$message.success(res.message)
    },
    reset () {
      this.$refs.PWDform.resetFields()
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
