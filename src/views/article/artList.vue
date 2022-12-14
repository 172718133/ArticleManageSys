<template>
  <div class="list_container">
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <span>文章列表</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'art-list'
}
</script>

<style lang="less" scoped>
.header_box span{
  font-size: 16px;
  font-weight: bold;
}
</style>
