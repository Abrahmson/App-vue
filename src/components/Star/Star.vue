<template>
  <div class="star" :class="`star-`+size">
    // 2x图 3x图
    <span class="star-item" v-for="(star,index) in starArr" :class="star" :key="index"></span>
  </div>
</template>

<script>
export default {
  props: {
    rating: Number,
    size: Number
  },
  computed: {
    starArr() {
      let starArr = [];
      let { rating } = this;
      // 满星数量
      const ratingInt = Math.floor(rating);
      for (let i = 0; i < ratingInt; i++) {
        starArr.push("on");
      }
      if (rating * 10 - ratingInt * 10 > 5) {
        starArr.push("half");
      }

      while (starArr.length < 5) {
        starArr.push("off");
      }
      return starArr;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
// 引入混合
.star // 2x图 3x图
  float: left
  font-size: 0
  .star-item
    display: inline-block
    background-repeat: no-repeat
  &.star-48
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>


