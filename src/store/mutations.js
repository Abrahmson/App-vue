// 包含多个直接修改状态数据的方法的对象

// 引入mutations的types
import {
  GET_ADDRESS,
  GET_CATEGORYS,
  GET_SHOPS,
  GET_USER,
  RESET_USER
} from './mutations_types.js'
export default {
  [GET_ADDRESS](state, address) {
    state.address = address
  },
  [GET_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [GET_SHOPS](state, shops) {
    state.shops = shops
  },
  [GET_USER](state, user) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  }
}