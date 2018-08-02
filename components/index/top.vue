<template>
  <div>
    <div class="top-wrap">
      <div class="content">
        <span class="welcome">集众电采欢迎您！！</span>
        <ul class="top-menu">
          <nuxt-link to="/user/workbench/favorite" tag="li" class="item" v-show="token">
            <i class="icon">&#xe60f;</i>
            <span class="name">收藏(<span class="num">{{favoriteTotal}}</span>)</span>
          </nuxt-link>
          <nuxt-link to="/user/message" class="item" v-show="token">
            <i class="icon">&#xe611;</i>
            <span class="name">消息(<span class="num">{{msgs}}</span>)</span>
          </nuxt-link>
          <li class="item" v-show="token">
            <span class="name" @click="logout">退出</span>
          </li>
          <nuxt-link to="/user/workbench" tag="li" class="item" v-show="token">
            <span class="name">进入工作台</span>
          </nuxt-link>
          <a href="/app-down/index.html" target="_blank" class="item">
            <span class="name">下载手机app</span>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexTop',
  computed: {
    msgs () {
      return this.$store.getters.messageNumber || 0
    },
    token () {
      return this.$store.getters.loggedToken
    },
    favoriteTotal () {
      return this.$store.getters.favoriteTotal || 0
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      setTimeout(() => {
        this.$router.replace('/auth')
      })
    }
  },
  mounted () {
    if (this.token) {
      this.$store.dispatch('getFavoriteNumber')
    }
  }
}
</script>

<style lang="stylus" scoped>

.top-wrap
  height 50px
  background-color #dedede
  .welcome
    cursor pointer
  .content
    font-size 14px
    color #999999
    line-height 50px
.content
  width 1300px
  margin 0 auto
  position relative
.top-menu
  float right
  display flex
  .item
    cursor pointer
    display flex
    margin-left 20px
    .name
      color #666666
      padding-left 6px
  .icon
    font-family 'jzdc'
    font-size 24px
  .num
    color #ff7900
</style>
