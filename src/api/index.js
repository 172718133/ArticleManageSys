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

/**
 * 更新用户密码
 * @param {*} param0 旧密码、新密码、确认密码
 * @returns Promise对象
 */
export const updateUserPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 更新用户头像
 * @param {*} avatar base64格式地址
 * @returns Promise对象
 */
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

/**
 * 获取文章分类
 * @returns Promise对象
 */
export const getArtCateAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 添加文章分类
 * @param {*} param0 文章名称、文章别名
 * @returns Promise对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 更新文章分类
 * @param {*} param0 文章id、文章名称、文章别名
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除文章分类
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const deleteArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

/**
 * 获取文章列表
 * @param {*} param0 页码、条数、分类id、状态
 * @returns Promise对象
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 发表文章
 * @param {*} param0 文章标题、分类id、内容、封面、状态
 * @returns Promise对象
 */
export const pubArtAPI = (formdate) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: formdate
  })
}

/**
 * 获取文章详情
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const getArtDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: { id }
  })
}
