<template>
  <div class="cate_container">
    <!-- 文章分类 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="header_box">
        <span>文章分类</span>
        <el-button type="primary" size="small" @click="showAddDialog">添加分类</el-button>
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
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="showChangeDialog(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteCate(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%" @close="dialogClose" ref="artCateTitle">
      <el-form :model="artCateForm" :rules="artCateFormRules" ref="artCateform">
        <el-form-item label="分类名称" label-width="80px" prop="cate_name">
          <el-input v-model="artCateForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" label-width="80px" prop="cate_alias">
          <el-input v-model="artCateForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button type="primary" size="small" @click="addCate">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateAPI, addArtCateAPI, updateArtCateAPI, deleteArtCateAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      title: '',
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
      },
      isEdit: false,
      editId: ''
    }
  },
  methods: {
    // 获取文章分类列表
    async getArtCate () {
      const { data: res } = await getArtCateAPI()
      if (res.code !== 0) return this.$message.error(res.message)
      this.artCateList = res.data
    },
    // 取消按钮
    cancel () {
      this.dialogVisible = false
    },
    // 添加分类按钮点击事件
    showAddDialog () {
      this.isEdit = false
      this.editId = ''
      this.title = '添加文章分类'
      this.dialogVisible = true
    },
    // 添加分类对话框关闭的回调
    dialogClose () {
      this.$refs.artCateform.resetFields()
    },
    // 对话框添加按钮点击事件
    addCate () {
      this.$refs.artCateform.validate(async valid => {
        if (valid) {
          if (this.isEdit) {
            this.artCateForm.id = this.editId
            const { data: res } = await updateArtCateAPI(this.artCateForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
            const { data: res } = await addArtCateAPI(this.artCateForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }
          this.dialogVisible = false
          this.getArtCate()
        } else {
          return false
        }
      })
    },
    // 修改文章分类按钮点击事件
    showChangeDialog (row) {
      this.isEdit = true
      this.editId = row.id
      this.dialogVisible = true
      this.title = '修改文章分类'
      this.$nextTick(() => {
        this.artCateForm.cate_name = row.cate_name
        this.artCateForm.cate_alias = row.cate_alias
      })
    },
    // 删除文章分类按钮点击事件
    deleteCate (row) {
      this.$confirm('确认删除该文章分类？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(row.id)
        const { data: res } = await deleteArtCateAPI(row.id)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.getArtCate()
      }).catch(() => {
      })
    }
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
