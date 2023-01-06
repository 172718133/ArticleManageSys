<template>
  <div class="list_container">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="header_box">
        <span>文章列表</span>
        <el-button type="primary" size="small" @click="pubArt">发表文章</el-button>
      </div>
      <!-- 筛选表单 -->
      <el-form :inline="true" :model="artListForm" class="demo-form-inline" ref="screenform">
        <el-form-item label="文章分类">
          <el-select v-model="artListForm.cate_id" placeholder="请选择">
            <el-option v-for="(item) in artCateList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="artListForm.state" placeholder="请选择">
            <el-option label="草稿" value="草稿"></el-option>
            <el-option label="已发布" value="已发布"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="screen" size="small">查询</el-button>
          <el-button type="info" @click="reset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 文章列表 -->
      <el-table :data="artList" style="width: 100%" border stripe="">
        <el-table-column prop="title" label="文章标题">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类">
        </el-table-column>
        <el-table-column prop="pub_date" label="发表时间">
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="toDetail(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="deleteArt(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 翻页插件 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="artListForm.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 发表文章对话框 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisible" width="70%" :before-close="handleClose" @closed="onDialogClosed">
      <el-form :model="pubArtForm" :rules="pubArtFormRules" ref="pubArtform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubArtForm.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="pubArtForm.cate_id" placeholder="请选择">
            <el-option v-for="(item) in artCateList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="pubArtForm.content" @blur="contentChange"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <img class="cover" ref="imgRef" src="@/assets/images/cover.jpg">
          <br>
          <input type="file" ref="selectImg" accept=".jpg,.png,.jpeg" style="display: none;" @change="coverChange">
          <el-button type="text" @click="$refs.selectImg.click()">+ 选择文件</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="publish('草稿')">存为草稿</el-button>
        <el-button type="primary" @click="publish('已发布')">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateAPI, getArtListAPI, pubArtAPI, deleteArtAPI } from '@/api'
import img from '@/assets/images/cover.jpg'
export default {
  name: 'art-list',
  data () {
    return {
      artListForm: {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      },
      artCateList: [],
      artList: [],
      total: 0,
      dialogVisible: false,
      pubArtForm: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: '',
        state: ''
      },
      pubArtFormRules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          { pattern: /^\S{1,30}$/, message: '文章标题为1-30个任意字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '文章分类不能为空', trigger: 'change' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        cover_img: [{ required: true, message: '文章封面不能为空', trigger: 'change' }]
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
    // 获取文章列表
    async getArtList () {
      const { data: res } = await getArtListAPI(this.artListForm)
      if (res.code !== 0) return this.$message.error(res.message)
      this.artList = res.data
      this.total = res.total
    },
    // 筛选按钮点击事件
    screen () {
      this.artListForm.pagenum = 1
      this.artListForm.pagesize = 5
      this.getArtList()
    },
    // 重置按钮点击事件
    reset () {
      this.artListForm.pagenum = 1
      this.artListForm.pagesize = 5
      this.artListForm.cate_id = ''
      this.artListForm.state = ''
      this.getArtList()
    },
    // 每页的条数改变的回调
    handleSizeChange (sizes) {
      this.artListForm.pagesize = sizes
      this.artListForm.pagenum = 1
      this.getArtList()
    },
    // 页码改变的回调
    handleCurrentChange (nowPage) {
      this.artListForm.pagenum = nowPage
      this.getArtList()
    },
    // 发表文章按钮点击事件
    pubArt () {
      this.dialogVisible = true
    },
    // 文章内容改变时的回调
    contentChange () {
      // 在改变时，重新校验文章内容的验证规则
      this.$refs.pubArtform.validateField('content')
    },
    // 文章封面文件改变时的回调
    coverChange (e) {
      if (e.target.files.length === 0) {
        this.pubArtForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', img)
        // 加上该判断可以在点击取消的时候不让封面变为默认
        // if (this.pubArtForm.cover_img === '') {
        //   this.pubArtForm.cover_img = ''
        // }
      } if (e.target.files[0].size > 1000000) {
        this.$message.error('图片大小不能超过1M！')
      } else {
        // 接口要求上传整个图片文件
        this.pubArtForm.cover_img = e.target.files[0]
        // 将文件名使用空格分开，存储为数组
        const imgName = e.target.files[0].name.split('')
        const arr = ['@', '#', '$', '%', '&', '*', '?', '{', '}', '[', ']']
        imgName.some((item, index) => {
          // arr数组是否包含imgName的item项，不包含返回-1
          if (arr.indexOf(item) !== -1) {
            this.$message.error('文件名不能包含@、#、$、%、&、*、?、{、}、[、]等字符')
          } else {
            const file = e.target.files
            const fr = new FileReader()
            fr.readAsDataURL(file[0])
            fr.onload = e => {
              if (e.target.result.indexOf('data:image') !== -1 && e.target.result.indexOf('base64') !== -1) {
                this.$refs.imgRef.setAttribute('src', e.target.result)
              } else {
                this.$message.error('请选择jpg、png、jpeg格式的图片！')
              }
            }
          }
          return true
        })
      }
      this.$refs.pubArtform.validateField('cover_img')
      this.$refs.selectImg.value = ''
    },
    // 发表文章对话框关闭前的回调
    handleClose () {
      this.$confirm('内容还未保存，是否确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogVisible = false
        })
        .catch(() => {})
    },
    // 对话框完全关闭之后的处理函数
    onDialogClosed () {
      // 清空关键数据
      this.$refs.pubArtform.resetFields()
      this.$refs.imgRef.setAttribute('src', img)
    },
    // 发布按钮点击事件
    publish (state) {
      this.pubArtForm.state = state
      this.$refs.pubArtform.validate(async valid => {
        if (valid) {
          // console.log(this.pubArtForm.title)
          // console.log(this.pubArtForm.cate_id)
          // console.log(this.pubArtForm.content)
          // console.log(this.pubArtForm.state)
          // console.log(this.pubArtForm.cover_img)
          if (!this.pubArtForm.cover_img) return this.$message.error('请选择文章封面！')
          const fd = new FormData()
          fd.append('title', this.pubArtForm.title)
          fd.append('cate_id', this.pubArtForm.cate_id)
          fd.append('content', this.pubArtForm.content)
          fd.append('cover_img', this.pubArtForm.cover_img)
          fd.append('state', this.pubArtForm.state)
          const { data: res } = await pubArtAPI(fd)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.dialogVisible = false
          this.getArtList()
        } else {
          this.$message.error('请完善文章信息')
          return false
        }
      })
    },
    // 文章详情按钮点击事件
    toDetail (row) {
      const artId = row.id
      this.$router.push('art-list/art-detail/' + artId)
    },
    // 删除文章
    async deleteArt (row) {
      this.$confirm('是否确认删除该文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await deleteArtAPI(row.id)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // Bug: 最后一页只剩下一条数据，删除该数据后，页码没有改变重新发起请求，导致表格数据为空
        // 解决：判断当前列表数据是否为空，为空就让pagenum--
        // 虽然调用删除，但是请求接口后后台删除了，前端数据还在，还没有重新刷新页面
        if (this.artList.length === 1) {
          if (this.artListForm.pagenum > 1) {
            this.artListForm.pagenum--
          }
        }
        this.getArtList()
      }).catch(() => {
      })
    }
  },
  created () {
    this.getArtCate()
    this.getArtList()
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
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
::v-deep .ql-editor {
  min-height: 300px;
}
::v-deep .el-dialog {
  margin: 30px auto 50px !important;
}
.el-select {
  width: 100%;
}
.cover {
  height: 250px;
}
</style>
