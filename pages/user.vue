<template>
  <div>
    <userHeader></userHeader>
    <div class="clearfix user-wrap">
      <div class="content">
        <nuxt-child/>
      </div>
    </div>
    <authFooter></authFooter>
  </div>
</template>

<style lang="stylus" scoped>
.user-wrap
  padding-left 182px
  width 1300px
  margin auto
  margin-top 74px
  position relative
  .content
    display block
    /*width 99.9%*/
    min-height 600px
    border-left 10px solid #f4f5f5
    /*margin-left 182px*/
    /*overflow: hidden*/
</style>
<script>
import userHeader from '../components/user/header'
import authFooter from '../components/user/footer'

export default {
  components: {
    userHeader,
    authFooter
  }
}
</script>
