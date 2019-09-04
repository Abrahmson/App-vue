<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.isShow" />
  </div>
</template>

<script>
// 引入API接口
import {reqUser} from './api';
import {GET_USER} from './store/mutations_types.js';

import FooterGuide from './components/FooterGuide/FooterGuide.vue';
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async mounted () {
    // const result = await reqAddress('116.36867', '40.10038');
    // console.log(result)
    this.$store.dispatch('getAddress')
    // 免登入操作
    const result = await reqUser()
    if (result.code===0) {
      const user = result.data
      this.$store.commit(GET_USER,user)
    }

  }
}

</script>

<style lang="stylus" scoped></style>
