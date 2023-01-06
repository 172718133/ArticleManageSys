<template>
  <div class="avatar_container">
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <span>更换头像</span>
      </div>
      <div class="file_box">
        <img src="@/assets/images/avatar.jpg" alt="" v-if="!this.avatar">
        <img :src="this.avatar" alt="" v-else>
        <div class="upload">
          <input type="file" ref="file_ipt" style="display: none" @change="iptChange">
          <el-button slot="trigger" size="small" type="primary" icon="el-icon-folder-opened" @click="$refs.file_ipt.click()">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" icon="el-icon-upload" @click="submitUpload">上传到服务器</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  name: 'art-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片后的回调
    iptChange (e) {
      console.log(e)
      const file = e.target.files
      console.log(file[0].size)
      const fileName = file[0].name.split('')
      const str = ['/', '@', '$', '%', '&', '#']
      if (file.length === 0) {
        this.avatar = ''
      } if (file[0].size > 1000000) {
        this.$message.error('图片大小不能超过1M！')
      } else {
        fileName.some((item, index) => {
          if (str.indexOf(item) !== -1) {
            this.$message.error('文件名不能包含/、@、$、%、&、#等特殊字符!')
          } else {
            // 1、创建 FileReader 对象
            const fr = new FileReader()
            // 2、调用 readAsDataURL 函数，读取文件内容
            fr.readAsDataURL(file[0])
            // 3、定义监听 FileReader 对象的 onload 事件
            fr.onload = e => {
              // 4 判断是否为base64 格式的文件
              if (e.target.result.indexOf('data:image') !== -1 && e.target.result.indexOf('base64') !== -1) {
                // 字符串中存在以上俩个内容，所以判定为是base64格式的字符串
                this.avatar = e.target.result
              } else {
                this.$message.error('请选择图片格式的文件！')
              }
            }
          }
          return true
        })
      }
    },
    // 上传按钮点击事件
    async submitUpload () {
      const { data: res } = await updateUserAvatarAPI(this.avatar)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 头像修改成功后将头像变量置为空
      this.avatar = ''
      // 调用请求用户信息的方法，重新渲染用户信息
      this.$store.dispatch('getUserInfoAction')
    }
  }
}
</script>

<style lang="less" scoped>
.header_box span {
  font-size: 16px;
  font-weight: bold;
}
.file_box {
  img {
    height: 300px;
  }
}
.upload{
  margin: 30px 0 10px 0;
}
</style>
