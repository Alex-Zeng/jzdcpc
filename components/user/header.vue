<template>
  <div class="header">
    <div class="header-content">
      <menunNav></menunNav>
      <div class="jzdc">
        <nuxt-link to="/">
          <div class="logo"></div>
          <div class="title">
            {{loggedUser.companyName || '未认证用户'}}
          </div>
        </nuxt-link>
      </div>
      <div class="user">
        <div class="name">
          <span style="cursor: pointer;" v-if="changeRole" @click="changeRoleMethods"><i class="icon">&#xe609;</i>买家中心</span>
          <span style="cursor: pointer;" v-if="!changeRole" @click="changeRoleMethods"><i class="icon">&#xe609;</i>卖家中心</span>
        </div>
        <!--<div class="avatar">
          <img src="" alt="">
        </div>-->
        <div class="name" @click="$router.push('/goods/cart')" v-if="loggedUser.group != 5">
          <span style="cursor: pointer;"><i class="icon">&#xe617;</i>购物车(<span class="num">{{cartNum}}</span>)</span>
        </div>
        <div class="name" @click="$router.push('/user/workbench/favorite')">
          <span style="cursor: pointer;"><i class="icon">&#xe60f;</i>收藏(<span class="num">{{favoriteTotal}}</span>)</span>
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
      background-image url("~assets/img/user/workbench-logo@2x.png")
      background-position left center
      float left
      margin-right 20px
      cursor pointer
    .title
      color #ffffff
      float left
      font-size 16px
      display block
      width 416px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
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
    .icon
      font-family 'jzdc'
      font-size 16px
      margin-right 4px
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
import menunNav from './menuNav'
export default {
  name: 'userHeader',
  data () {
    return {
      changeRole: false
    }
  },
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
    userRole () {
      return this.$store.getters.userRole
    },
    favoriteTotal () {
      return this.$store.getters.favoriteTotal
    },
    cartNum () {
      return this.$store.getters.cartNum
    }
  },
  methods: {
    changeRoleMethods () {
      this.changeRole = !this.changeRole
    },
    logout () {
      localStorage.clear()
      this.$store.dispatch('logout')
      setTimeout(() => {
        this.$router.replace('/auth')
      })
    },
    message () {
      this.$router.push('/user/message')
    },
    async getNum () {
      try {
        await this.$store.dispatch('getCartNum')
      } catch (e) {
        this.$message(
          {
            type: 'error',
            message: '网络有点小问题'
          }
        )
      }
    }
  },
  mounted () {
    console.log(this.loggedUser)
    this.$store.dispatch('getMessageNumber')
    this.$store.dispatch('getFavoriteNumber')
    this.getNum()
  }
}
</script>
