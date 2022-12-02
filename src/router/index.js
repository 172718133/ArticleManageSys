import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/main/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/main/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/register.vue')
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/reg']
// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      // 有token没用户信息的情况下才去获取用户信息
      store.dispatch('getUserInfoAction')
    }
    next()
  } else {
    // 如果要去的路由的路径，在白名单内就放行，否则强制跳转到登录页
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
