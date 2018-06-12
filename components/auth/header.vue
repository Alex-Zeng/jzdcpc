<template>
  <div class="header">
    <div class="header-content">
      <div class="header-action">
        <span class="txt">登录</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.header
  height 120px
  background #ffffff

.header-content
  width 1200px
  height 120px
  margin 0 auto
  background-repeat no-repeat
  background-image url("~assets/img/auth/logo.png")
  background-position left center

.header-action
  height 120px
  line-height 120px
  padding-left 308px
  color #cccccc
  .txt
    font-size 30px
    padding-left 10px
</style>

<script>
export default {
  name: 'authHeader'
}
</script>
