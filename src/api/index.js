// 导入 request 封装方法
import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} param0 用户名和密码
 * @returns Promise对象
 */
export const login = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 * 注册接口
 * @param {*} param0 用户名、密码、确认密码
 * @returns Promise对象
 */
export const register = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 获取用户信息
 * @param {*} token token值
 * @returns Promise对象
 */
export const getUserInfoAPI = (token) => {
  return request({
    url: '/my/userinfo'
    // headers: {
    //   Authorization: token
    // }
  })
}
