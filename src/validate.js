import Vue from 'vue'
import VeeValidate from "vee-validate"
Vue.use(VeeValidate)
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 指定本地提示信息
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号码',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '图形验证码'
  }
})

// 自定义手机验证规则
VeeValidate.Validator.extend('phone', {
 /* messages: {
    zh_CN:field => field + '必须是11位手机号码----',
  },*/
  // 验证的方法: 验证通过返回true, 返回false验证不通过
  validate: value => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
  },
  // 得到错误信息的方法
  getMessage: field => '请输入合法的' + field
})

// 自定义验证码规则
VeeValidate.Validator.extend('code', {
   validate: value => {
     return /\d{6}/.test(value)
   },
   // 得到错误信息的方法
   getMessage: field => '必须输入6位的' + field 
 })

