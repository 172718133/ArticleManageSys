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
 * @returns Promise对象
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // headers: {
    //   Authorization: token
    // }
  })
}

/**
 * 获取侧边栏数据
 * @returns Promise对象
 */
export const getAsideListAPI = () => {
  return request({
    url: '/my/menus'
  })
}

/**
 * 更新用户信息
 * @param {*} param0 用户id、用户昵称、用户邮箱
 * @returns Promise对象
 */
export const updateUserInfoAPI = ({ id, nickname, email }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      nickname,
      email
    }
  })
}
