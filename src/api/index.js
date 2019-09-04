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

// // 不需要代理来处理
// export const reqXxx = () => ajax('/xxx')

// // 需要通过代理转发请求baidu的接口
// export const reqBaidu = () => ajax('/baidu/yyy')

// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})

// 用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')

// 手机号验证码登陆
export const reqSmsLogin = ({phone, code}) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

// 根据会话获取用户信息
export const reqUser = () => ajax(BASE + '/userinfo')

// 用户登出
export const reqLogout = () => ajax(BASE + '/logout')