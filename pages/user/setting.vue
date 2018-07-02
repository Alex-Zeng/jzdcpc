<template>
  <div class="setting-wrap">
    <div class="setting-tabs clearfix">
      <nuxt-link to="/user/setting/cert" :class="{active: type == 1, 'tabs-item': true}">
        企业信息变更
      </nuxt-link>
      <nuxt-link to="/" :class="{active: type == -1, 'tabs-item': true}">
        安全设置
      </nuxt-link>
      <nuxt-link to="/" :class="{active: type == -1, 'tabs-item': true}">
        其他设置
      </nuxt-link>
      <nuxt-link to="/user/setting/address" :class="{active: type == 4, 'tabs-item': true}">
        收货地址管理
      </nuxt-link>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<style lang="stylus">
  .setting-wrap
    padding 40px
    min-height 800px
    overflow hidden
    .setting-tabs
      margin-top 28px
      overflow hidden
      height 46px
      border-bottom 6px solid #2fbeed
      .tabs-item
        -webkit-transition all 0.8s
        -moz-transition all 0.8s
        -ms-transition all 0.8s
        -o-transition all 0.8s
        transition all 0.8s
        cursor pointer
        color #2fbeed
        text-align center
        background-color #ccf2ff
        float left
        width 120px
        height 40px
        line-height 40px
        font-size 14px
        margin-left 10px
        position relative
        &.active
          background-color #2fbeed
          color #fff
        &:first-child
          margin-left 0
</style>

<script>
export default {
  watch: {
    '$route': function () {
      const {name} = this.$route
      if (/user-setting-cert/.test(name)) {
        this.type = 1
      }
      if (/user-setting-address/.test(name)) {
        this.type = 4
      }
    }
  },
  data () {
    return {
      type: ''
    }
  },
  mounted () {
    const {name} = this.$route
    if (/user-setting-cert/.test(name)) {
      this.type = 1
    }
    if (/user-setting-address/.test(name)) {
      this.type = 4
    }
  }
}
</script>
