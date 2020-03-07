import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home}
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径
  // from代表从哪个路径跳转过来
  // next代表放行

  if(to.path === '/login') return next() // 如果访问登录页面，直接放行

  const tokenStr = getToken() //获取token
  if(!tokenStr) return next('/login') //如果token为空，未登录，跳转至登录页

  request.get('user/info', {params:{'token':tokenStr}})
    .then( res => {
      if(res.status === 200) return next()
    })
})

export default router
