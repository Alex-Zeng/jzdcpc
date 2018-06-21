<template>
  <div class="footer">
    <div class="footer-content">
      <div class="links">
        <nuxt-link to="/">
          首页
        </nuxt-link>
         ：:
        <nuxt-link to="">
          新闻中心
        </nuxt-link>
        ：:
        <nuxt-link to="">
          法律条款
        </nuxt-link>
        ：:
        <nuxt-link to="">
          关于我们
        </nuxt-link>
      </div>
      <div class="add">
        <span>电话：（020）22512521</span>
        <span>地址：广州市越秀区越华路112号珠江国际大厦4205单元</span>
        <span>邮编：510030</span>
      </div>
      <div class="num">
        粤ICP备18007919号-1
      </div>
      <div class="copyright">
        Copyright @gdppinvest.com All Right Reserved
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.footer
  height 260px
  background #ffffff
  cursor pointer

.footer-content
  width 1200px
  height 260px
  margin 0 auto
  text-align center
  padding-top 38px
  color #737373
  font-size 12px
  cursor pointer
.add
  margin-top 18px
  margin-bottom 22px
  cursor pointer
  span
    margin-right 50px
    cursor pointer
.num
  margin-bottom 8px
  cursor pointer
</style>

<script>
export default {
  name: 'authFooter'
}
</script>
