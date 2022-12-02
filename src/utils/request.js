import axios from 'axios'

// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 默认导出request方法
export default request
