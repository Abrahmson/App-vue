<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|phone'"
              />
              <span
                v-show="errors.has('phone')"
                class="help is-denger"
                style="color:red"
              >{{errors.first('phone')}}</span>
              <button
                :disabled="!isRightPhone||computeTime>0"
                class="get_verification"
                :class="{green:isRightPhone}"
                @click.prevent="sendCode"
              >{{computeTime>0?`已发送(${computeTime}s)`:`获取验证码`}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required|code'"
              />
              <span
                v-show="errors.has('code')"
                class="help is-denger"
                style="color:red"
              >{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span
                  v-show="errors.has('name')"
                  class="help is-denger"
                  style="color:red"
                >{{errors.first('name')}}</span>
                <span
                  v-show="errors.has('phone')"
                  class="help is-denger"
                  style="color:red"
                >{{errors.first('phone')}}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPwd?'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />
                <span
                  v-show="errors.has('pwd')"
                  class="help is-denger"
                  style="color:red"
                >{{errors.first('pwd')}}</span>
                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{'move-right':isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?"abc":""}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                />
                <span
                  v-show="errors.has('captcha')"
                  class="help is-denger"
                  style="color:red"
                >{{errors.first('captcha')}}</span>
                <img
                  class="get_verification"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                  @click="sendCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>

      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { GET_USER } from "../../store/mutations_types.js";
import { reqSendCode, reqPwdLogin, reqSmsLogin } from "../../api";
export default {
  data() {
    return {
      loginWay: true,
      phone: "",
      computeTime: 0,
      isShowPwd: false,
      code: "", // 密码
      name: "", // 名字
      pwd: "", // 密码
      captcha: "" // 图形验证码
    };
  },
  methods: {
    // 发送手机验证码
    async sendCode() {
      this.computeTime = 10;
      // 清理定时器
      clearInterval(this.timeId);
      this.timeId = setInterval(() => {
        this.computeTime--;
      }, 1000);
      if (this.computeTime < 0) {
        this.computeTime = 0;
        // 清理定时器
        clearInterval(this.timeId);
      }

      // 发送验证码
      const result = await reqSendCode(this.phone);
      if (result.code === 0) {
        alert("验证码发送成功");
      } else {
        alert("验证码发送失败，请重新获取");
        // 停止定时器
        this.computeTime = 0;
        clearInterval(this.timeId);
      }
    },
    // 发送验证码
    sendCaptcha() {
      this.$refs.captcha.src = `http://localhost:5000/captcha?time=${Date.now()}`;
    },

    // 点击登入
    async login() {
      let names;
      const { loginWay, phone, code, name, pwd, captcha } = this;
      // 根据登入方式传入name数组的内容
      if (loginWay) {
        // 手机短信的方式
        names = ["phone", "code"];
      } else {
        // 用户名密码的形式
        names = ["name", "pwd", "captcha"];
      }
      // 表单验证
      const success = await this.$validator.validateAll(names); // 有两种情况

      if (success) {
        let result;
        // 发送登入请求
        if (loginWay) {
          result = await reqSmsLogin({ phone, code });
        } else {
          result = await reqPwdLogin({ name, pwd, captcha });
        }
        // 判断请求是否发送成功
        if (result.code === 0) {
          let user = result.data;
          // 更新vuex中的用户信息
          this.$store.commit(GET_USER, user);
          // 登入成功跳转到profile个人中心
          this.$router.replace("/profile");
        } else {
          alert("登入失败" + result.msg);
        }
      }
    }
  },
  computed: {
    isRightPhone() {
      const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      return phoneReg.test(this.phone);
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.loginContainer
  width: 100%
  height: 100%
  background: #fff
  .loginInner
    padding-top: 60px
    width: 80%
    margin: 0 auto
    .login_header
      .login_logo
        font-size: 40px
        font-weight: bold
        color: #02a774
        text-align: center
      .login_header_title
        padding-top: 40px
        text-align: center
        >a
          color: #333
          font-size: 14px
          padding-bottom: 4px
          &:first-child
            margin-right: 40px
          &.on
            color: #02a774
            font-weight: 700
            border-bottom: 2px solid #02a774
    .login_content
      >form
        >div
          display: none
          &.on
            display: block
          input
            width: 100%
            height: 100%
            padding-left: 10px
            box-sizing: border-box
            border: 1px solid #ddd
            border-radius: 4px
            outline: 0
            font: 400 14px Arial
            &:focus
              border: 1px solid #02a774
          .login_message
            position: relative
            margin-top: 16px
            height: 48px
            font-size: 14px
            background: #fff
            margin-bottom: 25px
            .get_verification
              position: absolute
              top: 50%
              right: 10px
              transform: translateY(-50%)
              border: 0
              color: #ccc
              font-size: 14px
              background: transparent
              &.green
                color: green
          .login_verification
            position: relative
            margin-top: 16px
            height: 48px
            font-size: 14px
            background: #fff
            margin-bottom: 25px
            .switch_button
              font-size: 12px
              border: 1px solid #ddd
              border-radius: 8px
              transition: background-color 0.3s, border-color 0.3s
              padding: 0 6px
              width: 30px
              height: 16px
              line-height: 16px
              color: #fff
              position: absolute
              top: 50%
              right: 10px
              transform: translateY(-50%)
              &.off
                background: #fff
                .switch_text
                  float: right
                  color: #ddd
              &.on
                background: #02a774
              >.switch_circle
                // transform translateX(27px)
                position: absolute
                top: -1px
                left: -1px
                width: 16px
                height: 16px
                border: 1px solid #ddd
                border-radius: 50%
                background: #fff
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition: transform 0.3s
                &.move-right
                  transform: translateX(27px)
          .login_hint
            margin-top: 12px
            color: #999
            font-size: 14px
            line-height: 20px
            >a
              color: #02a774
        .login_submit
          display: block
          width: 100%
          height: 42px
          margin-top: 30px
          border-radius: 4px
          background: #4cd96f
          color: #fff
          text-align: center
          font-size: 16px
          line-height: 42px
          border: 0
      .about_us
        display: block
        font-size: 12px
        margin-top: 20px
        text-align: center
        color: #999
    .go_back
      position: absolute
      top: 5px
      left: 5px
      width: 30px
      height: 30px
      >.iconfont
        font-size: 20px
        color: #999
</style>
