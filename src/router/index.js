// 引入Vue，VueRouter和申明使用
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入routes
import routes from './routes.js'
Vue.use(VueRouter)

// 注册路由
export default new VueRouter({
  mode: 'history',
  routes
})
