<template>
  <div class="cate_container">
    <!-- 文章分类 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="header_box">
        <span>文章分类</span>
        <el-button type="primary" size="small" @click="showDialog">添加分类</el-button>
      </div>
      <!-- 文章分类表格 -->
      <el-table :data="artCateList" style="width: 100%" border stripe align="center">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类 对话框 -->
    <el-dialog title="添加文章分类" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <el-form :model="artCateForm" :rules="artCateFormRules" ref="artCateform">
        <el-form-item label="分类名称" label-width="80px" prop="cate_name">
          <el-input v-model="artCateForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" label-width="80px" prop="cate_alias">
          <el-input v-model="artCateForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button type="primary" size="small" @click="addCate">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      artCateList: [],
      dialogVisible: false,
      artCateForm: {
        cate_name: '',
        cate_alias: ''
      },
      artCateFormRules: {
        cate_name: [
          { required: true, message: '文章名称不能为空', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '文章名称为1-10个非空格字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '文章别名不能为空', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{1,15}$/, message: '文章别名为1-15个大小写字母和数字组成的字符串', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取文章分类列表
    async getArtCate () {
      const { data: res } = await getArtCateAPI()
      if (res.code !== 0) return this.$message.error(res.message)
      this.artCateList = res.data
    },
    // 添加分类按钮点击事件
    showDialog () {
      this.dialogVisible = true
    },
    // 添加分类对话框关闭前的回调
    handleClose () {
      this.$confirm('内容还未保存, 是否确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
        this.$refs.artCateform.resetFields()
      }).catch(() => {
      })
    },
    // 对话框添加按钮点击事件
    addCate () {}
  },
  created () {
    this.getArtCate()
  }
}
</script>

<style lang="less" scoped>
.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_box span {
  font-size: 16px;
  font-weight: bold;
}
</style>
