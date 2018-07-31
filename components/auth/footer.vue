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
        <span>电话：(020)84125513</span>
        <span>地址：广东省广州市海珠区昌岗中路166号 佳都商贸中心505-506</span>
        <span>邮编：510030</span>
      </div>
      <div class="num">
        粤ICP备18037422号
      </div>
      <div class="copyright">
        Copyright @2018 津晶科技 All Right Reserved
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
