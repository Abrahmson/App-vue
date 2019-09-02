// 引入Vue
import Vue from 'vue'
// 引入VueX
import Vuex from 'vuex'
// 引入各个模块
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 声明使用
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})