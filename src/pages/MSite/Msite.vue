<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">{{user._id?(user.phone?user.phone:user.name):('登录/注册')}}</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysList" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category,index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com`+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList :shops="shops" />
  </section>
</template>

<script>
// 引入商家列表组件
import ShopList from "../../components/ShopList/ShopList.vue";
// 引入swiper插件
import Swiper from "swiper";
// require styles
import "swiper/dist/css/swiper.css";

import { mapState } from "vuex";

export default {
  components: {
    ShopList
  },
  async mounted() {
    // 获取商户列表
    this.$store.dispatch("getShops");
    // 获取食品分类
    await this.$store.dispatch("getCategorys");
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      });
    });
  },
  computed: {
    ...mapState(["address", "shops", "categorys","user"]),
    categorysList() {
      const bigArr = [];
      let smallArr = [];
      this.categorys.forEach(item => {
        // 把小数组放到大数组里面
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }

        // 当小数组的长度大于8的时候，清空小数组
        smallArr.push(item);
        if (smallArr.length === 8) {
          smallArr = [];
        }
      });
      return bigArr;
    }
  }

  // watch: {
  //   categorys() {
  //     // 方式一：时机不好把握，有可能两秒以内数据加载没有完成
  //     // setTimeout(() => {
  //     /* eslint-disable no-new */
  //     // new Swiper(".swiper-container", {
  //     //   loop: true, // 循环模式选项
  //     //   // 如果需要分页器
  //     //   pagination: {
  //     //     el: ".swiper-pagination"
  //     //   }
  //     // });
  //     // }, 1000);

  //     // 方式二：利用$nextTick(回调函数),该回调函数将在下一次DOM更新循环之后执行
  //     this.$nextTick(() => {
  // /* eslint-disable no-new */
  // new Swiper(".swiper-container", {
  //   loop: true, // 循环模式选项
  //   // 如果需要分页器
  //   pagination: {
  //     el: ".swiper-pagination"
  //   }
  // });
  //     });
  //   }
  // }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width: 100%
  .msite_header
    background-color: #02a774
    position: fixed
    z-index: 100
    left: 0
    top: 0
    width: 100%
    height: 45px
    .header_search
      position: absolute
      left: 15px
      top: 50%
      transform: translateY(-50%)
      width: 10%
      height: 50%
      .icon-sousuo
        font-size: 25px
        color: #fff
    .header_title
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 50%
      color: #fff
      text-align: center
      .header_title_text
        font-size: 20px
        color: #fff
        display: block
    .header_login
      font-size: 14px
      color: #fff
      position: absolute
      right: 15px
      top: 50%
      transform: translateY(-50%)
      .header_login_text
        color: #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top: 45px
    height: 200px
    background: #fff
    .swiper-container
      width: 100%
      height: 100%
      .swiper-wrapper
        width: 100%
        height: 100%
        .swiper-slide
          display: flex
          justify-content: center
          align-items: flex-start
          flex-wrap: wrap
          .link_to_food
            width: 25%
            .food_container
              display: block
              width: 100%
              text-align: center
              padding-bottom: 10px
              font-size: 0
              img
                display: inline-block
                width: 50px
                height: 50px
            span
              display: block
              width: 100%
              text-align: center
              font-size: 13px
              color: #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background: #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top: 10px
    background: #fff
    .shop_header
      padding: 10px 10px 0
      .shop_icon
        margin-left: 5px
        color: #999
      .shop_header_title
        color: #999
        font-size: 14px
        line-height: 20px
    .shop_container
      margin-bottom: 50px
</style>
