// 包含多个间接修改状态数据的方噶的对象

// 引入mutations的types
import {
  GET_ADDRESS,
  GET_CATEGORYS,
  GET_SHOPS,
  RESET_USER
} from './mutations_types.js'

// 引入请求接口
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqLogout
} from '../api';

export default {
  async getAddress({
    commit,
    state
  }) {
    const result = await reqAddress(state.longitude, state.latitude)
    if (result.code === 0) {
      const address = result.data
      commit(GET_ADDRESS, address)
    }
  },
  async getCategorys({
    commit
  }) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(GET_CATEGORYS, categorys)
      // typeof fun === 'function' || fun()
    }
  },
  async getShops({
    commit,
    state
  }) {
    const result = await reqShops(state.latitude, state.longitude)
    if (result.code === 0) {
      const shops = result.data
      commit(GET_SHOPS, shops)
    }
  },
  async resetUser({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  }
}