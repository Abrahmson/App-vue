<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.isShow" />
  </div>
</template>

<script>
// 引入API接口
// import {reqAddress} from './api';

import FooterGuide from './components/FooterGuide/FooterGuide.vue';
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    // const result = await reqAddress('116.36867', '40.10038');
    // console.log(result)
    this.$store.dispatch('getAddress')
  }
}

</script>

<style lang="stylus" scoped></style>
