<template>
    <div id="content-wrap" class="content-wrap">
      <div class="content">
        <div class="header">
          <img src="@/assets/img/factoring/logo.png" @click="$router.push('/')" alt="">
          <nuxt-link class="btn" to="/factoring/lists/1">服务记录</nuxt-link>
        </div>
        <h3>
          <p>集众保理</p>
          <p>助你突破资金困局</p>
        </h3>
        <div class="btn-box">
          <nuxt-link class="btn" to="/factoring/form">马上体验</nuxt-link>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'factoring',
  data () {
    return {}
  },
  methods: {},
  mounted () {
    document.getElementById('content-wrap').style.height = (window.screen.availHeight - 65) + 'px'
  }
}
</script>

<style lang="stylus" scoped>
  .content-wrap
    background-image url("~/assets/img/factoring/bg.jpg")
    background-size 100%
    .content
      width 1300px
      margin auto
      .btn
        display inline-block
        color #ffffff
        padding 0 2em
        border 1px solid #FFFFFF
      .header
        padding-top 150px
        .btn
          height 30px
          line-height 30px
          font-size 18px
          border-radius 30px
          float right
      h3
        text-align right
        font-size 72px
        padding-top 207px
        color #ffffff
      .btn-box
        text-align center
        padding-top 202px
        .btn
          height 60px
          line-height 60px
          font-size 30px
          border-radius 60px
</style>
