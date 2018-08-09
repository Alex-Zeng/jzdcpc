<template>
  <div class="empty-wrap">
    <img :src="img" alt="" :style="styles || {}">
    <div class="message">{{text}}</div>
    <div class="btn-wrap">
      <el-button type="primary" @click="$router.replace(link)" v-show="link">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'empty',
  props: {
    img: String,
    text: String,
    link: String,
    styles: Object
  }
}
</script>

<style lang="stylus" scoped>
.empty-wrap
  text-align center
  padding 100px 0
  min-height 600px
  .btn-wrap
    margin-top 50px
  img
    width 335px
    margin 0 auto
    display block
  .message
    font-size 18px
    color #666
    margin-top 34px
    margin-bottom 50px
</style>
