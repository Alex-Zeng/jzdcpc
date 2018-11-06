<template>
  <div class="setting-wrap">
    <div class="setting-tabs clearfix">
      <nuxt-link  v-if="loggedRole != 1" to="/user/setting/cert" :class="{active: type == 1, 'tabs-item': true}">
        {{userRole == 0 ? '企业信息认证' : '企业信息变更'}}
      </nuxt-link>
      <nuxt-link to="/user/setting/safe" :class="{active: type == 2, 'tabs-item': true}">
        安全设置
      </nuxt-link>
      <nuxt-link to="/user/setting/others" :class="{active: type == 3, 'tabs-item': true}">
        其他设置
      </nuxt-link>
      <nuxt-link to="/user/setting/address" :class="{active: type == 4, 'tabs-item': true}">
        收货地址管理
      </nuxt-link>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>
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
      if (/user-setting-others/.test(name)) {
        this.type = 3
      }
      if (/user-setting-safe/.test(name)) {
        this.type = 2
      }
    }
  },
  computed: {
    userRole () {
      return this.$store.getters.loggedRole
    },
    loggedRole () {
      return this.$store.getters.loggedRole
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
    if (/user-setting-others/.test(name)) {
      this.type = 3
    }
    if (/user-setting-safe/.test(name)) {
      this.type = 2
    }
  }
}
</script>
<style lang="stylus">
  .setting-wrap
    padding 0 40px 40px
    min-height 800px
    overflow hidden
    .setting-tabs
      /*margin-top 28px*/
      overflow hidden
      padding 20px
      background-color #fff
      border-radius 5px
      .tabs-item
        -webkit-transition all 0.8s
        -moz-transition all 0.8s
        -ms-transition all 0.8s
        -o-transition all 0.8s
        transition all 0.8s
        cursor pointer
        color #666666
        text-align center
        background-color #f5f5f5
        float left
        width 120px
        height 40px
        line-height 40px
        font-size 16px
        position relative
        border 1px solid #dedede
        border-left none
        &.active
          background-color #ffffff
          color #333333
        &:first-child
          border-left 1px solid #dedede
</style>
