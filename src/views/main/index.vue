<template>
  <div class="main_container">
    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <!-- 左侧logo -->
        <div class="left">
          <img src="@/assets/images/logo.png" alt="">
        </div>
        <!-- 右侧个人中心 -->
        <div class="right">
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#3a4146" text-color="#fff" active-text-color="#fff">
            <el-submenu index="2">
              <template slot="title">
                <img src="@/assets/images/avatar.jpg" alt="" v-if="!$store.getters.user_pic">
                <img :src="$store.getters.user_pic" alt="" v-else>
                <span>你好！{{ $store.getters.nickname || $store.getters.username }}</span>
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
              <el-menu :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              unique-opened
              router>
                <!-- 使用template标签进行循环，只占位实际不进行渲染 -->
                <template v-for="item in asideList">
                  <!-- 没有子选项的菜单项 -->
                  <el-menu-item :index="item.indexPath" :key="item.indexPath" v-if="!item.children">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                  </el-menu-item>
                  <!-- 有子选项的菜单项 -->
                  <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.title}}</span>
                    </template>
                    <el-menu-item :index="subItem.indexPath" v-for="subItem in item.children" :key="subItem.indexPath">{{subItem.title}}</el-menu-item>
                  </el-submenu>
                </template>
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
import { getAsideListAPI } from '@/api'
export default {
  name: 'my-main',
  data () {
    return {
      asideList: [] // 侧边栏数据信息
    }
  },
  methods: {
    // 退出登录的点击事件
    logout () {
      this.$confirm('是否确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 向vuex中传空值=>清空token和用户信息
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserinfo', {})
          this.$message.success('退出登录成功！')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 获取侧边栏数据
    async getAsideList () {
      const { data: res } = await getAsideListAPI()
      if (res.code !== 0) return this.$message.error(res.message)
      this.asideList = res.data
    }
  },
  created () {
    this.getAsideList()
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
  text-align: left;
  // line-height: 200px;
  .tac, .el-menu {
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
