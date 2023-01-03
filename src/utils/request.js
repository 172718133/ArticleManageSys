import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const request = axios.create({
  baseURL
})

// 定义请求拦截器
request.interceptors.request.use(function (config) {
  // vuex中有token值才去给请求头赋值
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 定义响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码为成功状态时，触发这里面的内容ss
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 证明token已过期=>清空vuex中的内容,并跳转到登录页
    store.commit('updateToken', '')
    store.commit('updateUserinfo', {})
    Message.error('用户身份已过期！请重新登录')
    router.push('/login')
  }
  // 状态码为失败状态时，触发这里面的内容
  return Promise.reject(error)
})

// 默认导出request方法
export default request
