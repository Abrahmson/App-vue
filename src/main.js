// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
// 引入header
import Header from './components/Herder/Header.vue'
// 引入star
import Star from './components/Star/Star.vue'

// 引入store仓库
import store from './store'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router, // 注册路由
  store // 注册仓库
})
