import Vue from 'vue'
import Vuex from 'vuex'

// vuex本地持久化
import createPersistedState from 'vuex-persistedstate'

import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
    // 计算属性，可以在vue组件中使用
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic
  },
  mutations: {
    updateToken (state, val) {
      state.token = val
    },
    updateUserinfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    async getUserInfoAction (store) {
      const { data: res } = await getUserInfoAPI(store.state.token)
      store.commit('updateUserinfo', res.data)
    }
  },
  modules: {
  },
  // 注入持久化插件
  plugins: [
    createPersistedState()
  ]
})
