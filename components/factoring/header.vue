<template>
    <div class="factoring-wrap">
      <div class="content">
        <i class="logo" @click="$router.replace('/')"></i>
        <nuxt-link class="btn" to="/factoring/form">融资申请</nuxt-link>&emsp;
        <nuxt-link class="btn" to="/factoring/lists">服务记录</nuxt-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'factoring-header'
}
</script>

<style lang="stylus" scoped>
  .factoring-wrap
    width 1300px
    margin auto
    padding-bottom 60px
    .content
      height 60px
      margin-top 80px
      padding-top 17px
      position relative
      text-align right
      .logo
        background-image url('~/assets/img/index/logo.png')
        width 210px
        height 60px
        display block
        position absolute
        top 0
        left 0
      .btn
        display inline-block
        height 30px
        line-height 30px
        padding 0 2em
        border 1px solid #2475E2
        border-radius 30px

</style>
