// 引入ajax模块
import ajax from './ajax.js'
const BASE = '/api'

// 1.根据经纬度请求获取位置详情，经度longgitude，纬度latitude
export const reqAddress = (longgitude, latitude) => ajax(BASE + `/position/${latitude},${longgitude}`)

// 2.获取食品的分类列表
export const reqCategorys = () => ajax(BASE + `/index_category`)

// 3.根据经纬度获取商铺列表
export const reqShops = (longgitude, latitude) => ajax(BASE + `/shops`, {
  longgitude,
  latitude
})
