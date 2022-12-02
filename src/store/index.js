import Vue from 'vue'
import Vuex from 'vuex'

// vuex本地持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
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
  },
  modules: {
  },
  // 注入持久化插件
  plugins: [
    createPersistedState()
  ]
})
