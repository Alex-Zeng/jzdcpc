<template>
  <div class="footer-wrap">
    <div class="center-wrap">
      <ul>
        <li>商务合作&咨询（工作日09:00~18:00）</li>
        <li><img src="~assets/img/common/footer-qq.png" alt="">3510294139</li>
        <li><img src="~assets/img/common/footer-tel.png" alt="">18024595469</li>
        <li><img src="~assets/img/common/footer-email.png" alt="">zhaoshang@jizhongdiancai.com</li>
      </ul>
      <div class="center-box">
        <p>
          <a class="link" href="/service/index.html">集众金融</a>
          <a class="link" href="/service/index.html">集众服务</a>
          <!--<a class="link" href="" target="_blank">关于我们</a>-->
          <nuxt-link to="/about" class="item" target="_blank">关于我们</nuxt-link>
        </p>
        <p>copyright © 2018 津晶科技 版权所有&emsp;&emsp;粤ICP备18037422号</p>
        <p>
          <a class="pn" href="http://webscan.360.cn/index/checkwebsite/url/www.jizhongdiancai.com"><img src="~assets/img/common/footer-360.png" alt=""></a>
          <a class="pn" href="http://www.miibeian.gov.cn"><img src="~assets/img/common/footer-icp.png" alt=""></a>
        </p>
      </div>
      <div class="code">
        <img src="~assets/img/common/code.png" alt="">
        <p>官方微信</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexFooter'
}
</script>

<style lang="stylus" scoped>
.footer-wrap
  width 100%
  background-color #333333
  .center-wrap
    width 1300px
    display flex
    justify-content center
    margin 0 auto
    box-sizing border-box
    pading 40px 50px 30px
    padding-top 40px
    min-height 200px
    color #ffffff
    ul
      width 340px
    ul
      li
       padding-bottom 20px
    ul
      img
        display inline
        vertical-align middle
        margin-right 10px
    .center-box
      p
        display flex
        justify-content center
        padding-bottom 10px
        .link
          padding 0 30px
          color #FFFFFF
        img
          margin 10px
        .pn
          img
            width 108px
            height 3
            8px
    .code
      padding-left 136px
      text-align center
      padding-top 10px
      img
        padding-bottom 10px
</style>
