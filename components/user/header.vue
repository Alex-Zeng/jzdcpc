<template>
  <div class="header">
    <div class="header-content">
      <menunNav></menunNav>
      <div class="jzdc">
        <nuxt-link to="/">
          <div class="logo"></div>
          <div class="title">津晶科技信息服务（广州）有限责任公司</div>
        </nuxt-link>
      </div>
      <div class="user">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="name">
          <span class="name" style="cursor: pointer;">收藏(<span class="num">{{favoriteTotal}}</span>)</span>
        </div>
        <div class="message" @click="message">
          <el-badge :is-dot="msgs>0">
            <i class="icon">&#xe611;</i>
          </el-badge>
          <span>消息</span>
        </div>
        <div class="toindex">
          <nuxt-link to="/">
            <i class="icon">&#xe629;</i>
            <span>返回首页</span>
          </nuxt-link>
        </div>
        <div class="log-out" @click="logout">
          <i class="icon">&#xe673;</i>
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.header
  height 64px
  background #2475E2
  min-width 1200px
  position fixed
  width: 100%
  z-index 1800
  top 0
  left 0

  .jzdc
    padding-top 22px
    padding-left 20px
    .logo
      width 84px
      height 24px
      // background-color #fff
      background-repeat no-repeat
      background-image url("~assets/img/user/small-logo.png")
      background-position left center
      float left
      margin-right 20px
      cursor pointer
    .title
      color #ffffff
      float left
      font-size 16px
.user
  float right
  color #ffffff
  margin-top -22px
  padding-top 8px
  padding-right 16px
  height 44px
  line-height 44px
  .avatar
    float left
    background-color #2475e2
    width 44px
    height 44px
    border-radius 50%
    margin-right 10px
  .name
    float left
    margin-right 10px
    .num
      color #FF7F00
  .message
    float left
    margin-right 10px
    cursor pointer
    .icon
      font-family 'jzdc'
      font-size 16px
      margin-right 4px
  .toindex
    float left
    margin-right 10px
    a
      color #ffffff
    .icon
      font-family 'jzdc'
      font-size 16px
      margin-right 4px
  .log-out
    float left
    cursor pointer
    .icon
      font-family 'jzdc'
      font-size 16px
      margin-right 4px
.header-content
  width 1300px
  height 64px
  margin 0 auto
  position relative
</style>

<style lang="stylus">
.user
  .el-badge__content.is-fixed
    top 14px
    right 10px!important
</style>

<script>
import Cookies from 'js-cookie'
import menunNav from './menuNav'
export default {
  name: 'userHeader',
  components: {
    menunNav
  },
  computed: {
    msgs () {
      return this.$store.getters.messageNumber
    },
    loggedUser () {
      return this.$store.getters.loggedUser
    },
    favoriteTotal () {
      return this.$store.getters.favoriteTotal
    }
  },
  methods: {
    logout () {
      Cookies.remove('_token')
      this.$router.replace('/auth')
    },
    message () {
      this.$router.push('/user/message')
    }
  },
  mounted () {
    this.$store.dispatch('getMessageNumber')
  }
}
</script>
