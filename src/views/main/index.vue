<template>
  <div class="main_container">
    <el-container>
      <el-header>
        <div class="left">
          <img src="@/assets/images/logo.png" alt="">
        </div>
        <div class="right">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#3a4146" text-color="#fff" active-text-color="#fff">
            <el-submenu index="2">
              <template slot="title">
                <img src="@/assets/images/avatar.jpg" alt="" v-if="!userInfo.avatar">
                <img src="" alt="" v-else>
                <span>个人中心</span>
              </template>
              <el-menu-item index="2-1">更换头像</el-menu-item>
              <el-menu-item index="2-2">修改密码</el-menu-item>
              <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Copyright © Intretech Inc. All Rights Reserved.</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'my-main',
  data () {
    return {
      activeIndex: '2',
      userInfo: []
    }
  },
  methods: {
    handleSelect () {
      console.log('111')
    },
    logout () {
      this.$confirm('是否确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('updateToken', '')
        this.$message.success('退出登录成功！')
        this.$router.push('/login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main_container {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
  width: 100%;
}
.el-footer {
  height: 50px !important;
  background-color: #eee;
  text-align: center;
  line-height: 50px;
}
.el-header {
  background-color: #3a4146;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .el-menu {
      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 20px;
        // margin-top: 5px;
      }
    }
  }
}
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  .tac {
    width: 200px;
  }
}

.el-main {
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
