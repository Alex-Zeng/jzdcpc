<template>
   <div>
     <div class="header" :class="{scroll: isScroll}">
       <nuxt-link to="/" class="logo"></nuxt-link>
       <div class="header-nav">
         <a href="#banner">公司简介</a>
         <a href="#zizhi">主营业务</a>
         <a href="#product">产品展示</a>
       </div>
     </div>
     <div id="banner" class="banner">
       <h3 style="letter-spacing: 8px">
         台山市飞华金属制品厂
       </h3>
       <p style="line-height: 100px">以诚信为本，以质量为追求，精益求精，高效服务</p>
     </div>
     <div id="intro">
       <h3 class="title">公司简介</h3>
       <div class="content">
         <div class="intro-img">
           <div class="block"  >
             <el-carousel style="width: 1300px;margin: 0 auto;" >
               <el-carousel-item >
                 <img src="~assets/img/supplier3/chang-1.png" style="padding-bottom: 1em;" alt="">
               </el-carousel-item>
               <el-carousel-item >
                 <img src="~assets/img/supplier3/chang-2.png" style="padding-bottom: 1em;" alt="">
               </el-carousel-item>
             </el-carousel>
           </div>

         </div>
         <div class="intro-text" >
           <p>
             本厂是一家从事钣金、冲压、模具设计开发的企业，拥有大型磨床、车床、铣床、冲床、油压机设备，主要为家用电器公司配套加工五金件。
           </p>
           <p> 本厂以诚信为本，以质量为追求，精益求精，高效服务，让客户满意，赢得客户支持和信赖，携手共创美好未来。</p>
         </div>
       </div>
     </div>
     <div style="clear:both"></div>
     <div id="zizhi">
       <h3 class="title">主营业务</h3>
       <div class="content" style="text-align: center;">
         <ul class="product-list">
           <li>
             <img src="~assets/img/supplier3/intro-1.png" style="padding-bottom: 1em;" alt="">
             <h5>1-钣金、冲压</h5>
           </li>
           <li>
             <img src="~assets/img/supplier3/intro-2.png" style="padding-bottom: 1em;" alt="">
             <h5>2-模具设计开发</h5>
           </li>
         </ul>
       </div>
     </div>
     <div id="product">
       <h3 class="title">产品展示</h3>
       <div class="content" style="text-align: center">
         <ul class="product-list">
           <li>
             <nuxt-link to="/goods/detail/128" class="p-id">
             <img src="~assets/img/supplier3/pro-1.png" alt="">
             <div><p>底框左右加强铁</p></div>
             </nuxt-link>
           </li>
           <li>
             <nuxt-link to="/goods/detail/137" class="p-id">
             <img src="~assets/img/supplier3/pro-2.png" alt="">
             <div><p>滚筒支撑梁组件</p></div>
             </nuxt-link>
           </li>
           <li>
             <nuxt-link to="/goods/detail/131" class="p-id">
             <img src="~assets/img/supplier3/pro-3.png" alt="">
             <div><p>上门铰部件</p></div>
             </nuxt-link>
           </li>
           <li>
             <nuxt-link to="/goods/detail/129" class="p-id">
             <img src="~assets/img/supplier3/pro-4.png" alt="">
             <div><p>压缩机托板</p></div>
             </nuxt-link>
           </li>
         </ul>
       </div>
     </div>
     <div id="product_video">
       <h3 class="title">集众电采诚邀优质供应商入驻</h3>
       <div class="content" >
         <video width="750" height="500" controls style="margin: 0 auto">
           <source src="http://scm.jizhongdiancai.com/web/public/uploads/goods_thumb/zs.mp4" type="video/mp4">
           您的浏览器不支持 video 标签。
         </video>
       </div>
     </div>
     <div class="footer">
       <p>copyright&nbsp;©&nbsp;2018&emsp;津晶科技&emsp;版权所有&emsp;&emsp;&emsp;&emsp;粤ICP备18037422号</p>
     </div>
   </div>
</template>

<script>
export default {
  name: 'supplier-index',
  head () {
    return {
      title: '台山市飞华金属制品厂'
    }
  },
  data  () {
    return {
      isScroll: false
    }
  },
  methods: {
    scrollMethods () {
      this.isScroll = true
    }
  },
  mounted () {
    let self = this
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop
      if (t >= 170) {
        self.isScroll = true
      } else {
        self.isScroll = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    padding-top 10px
    position fixed
    width 100%
    z-index 999
    &.scroll
      background rgb(27, 127, 190)
    .logo
      display block
      width 84px
      height 24px
      background-repeat no-repeat
      background-image url("~assets/img/user/workbench-logo@2x.png")
      background-position left center
      cursor pointer
      margin auto
      margin-bottom 10px
    .header-nav
      height 60px
      text-align center
      border-top 1px solid #fff
      border-bottom 1px solid #fff
      font-size 14px
      a
        display inline-block
        padding 20px 0
        margin 0 2em
        color #ffffff
        &:active:after
          text-align center
          display block
          margin auto
          margin-top 6px
          width 2em
          content ''
          border-top 1px solid #ffffff
  .banner
    height 542px
    padding-top 10px
    background url("~assets/img/supplier/bg@2x.png")
    background-size 100% 542px
    text-align center
    color #ffffff
    h3
      padding-top 237px
      font-size 48px
    h4
      font-size 24px
      padding 40px 0
  .title
    color #333
    font-size 36px
    text-align center
    padding-top 80px
    padding-bottom 40px
  .content
    width 100%
    margin 0 auto
  #intro
    background #ffffff
    padding-bottom 80px
    .intro-img
      width 100%
      height 100%
      text-align center
    .intro-text
      width 50%
      margin 10px auto
      color #737373
      letter-spacing 1px
      line-height: 33px

  #product
    .product-info
      padding 40px 60px
      display flex
      background #ffffff
      line-height 1.5
      img
        margin-right 40px
        margin-left 40px
    .product-list
        li
          text-align center
          background #ffffff
          display inline-block
          margin 22px
          position relative
          .p-id
            cursor pointer
          img
            width 280px
            height 200px
          div
            width 280px
            height 30px
            background #000000
            opacity 0.6
            text-align center
            p
            color #ffffff
            line-height 30px
            position absolute
            top 170px
  #zizhi
    .product-list
      li
        text-align center
        display inline-block
        margin 22px
        position relative
        h5
        color #333333

  .footer
    border-top 100px solid #ffffff
    height 200px
    line-height 200px
    text-align center
    color #333
</style>
