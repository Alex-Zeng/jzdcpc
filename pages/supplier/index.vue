<template>
   <div>
     <div class="header" :class="{scroll: isScroll}">
       <nuxt-link to="/" class="logo"></nuxt-link>
       <div class="header-nav">
         <a href="#banner">公司简介</a>
         <a href="#zizhi">公司资质</a>
         <a href="#product">产品展示</a>
       </div>
     </div>
     <div id="banner" class="banner">
       <h3 style="letter-spacing: 8px">
         华意压缩机（荆州）有限公司
       </h3>
       <p></p>
       <p></p>
       <h4 style="letter-spacing: 2px">以科技为动力 以质量求发展</h4>
     </div>
     <div id="intro">
       <h3 class="title">公司简介</h3>
       <div class="content">
         <div class="intro-img">
           <div class="block" >
             <el-carousel >
               <el-carousel-item >
                 <img src="~assets/img/supplier2/intro.png" style="padding-bottom: 1em;" alt="">
               </el-carousel-item>
               <el-carousel-item >
                 <img src="~assets/img/supplier2/intro3.png" style="padding-bottom: 1em;" alt="">
               </el-carousel-item>
             </el-carousel>
           </div>

         </div>
         <div class="intro-text" >
           <p>
           华意压缩机（荆州）有限公司位于湖北荆州。是由江西省华意压缩机股份有限公司控股的一家生产经营全封闭制冷压缩机的专业化子公司，
             为省级高新技术企业，具有独立的法人资格及进出口经营权。年出口创汇位列市机电产品第一，率先完成市政府提出的家电行业三个100万台的目标。</p>
           <p>公司拥有独立的产品开发研制能力，完善的研发与技术服务体系。生产和检测设备从美国引进，年生产能力达300万台，产品涵盖40多个品种的不同电压制冷压缩机，
             获得国家CCC认证及ISO9001：2000质量体系认证。</p>
             <p> 目前，公司已在荆州经济开发区投资1亿元兴建一个小型压缩机生产基地。项目达产后，预计年产压缩机500万台，工业总产值8亿元，出口创汇2亿元。
           公司将抓住机遇，以科技为动力，以质量求发展，以良好的信誉及优异的业绩回报社会！
          </p>
         </div>
       </div>
     </div>
     <div style="clear:both"></div>
     <div id="zizhi">
       <h3 class="title">公司资质</h3>
       <div class="content">
         <ul class="product-list">
           <li>
             <img src="~assets/img/supplier2/zizhi-01.png" style="padding-bottom: 1em;" alt="">
             <div><p>ISO9001：2000认证</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-02.png" style="padding-bottom: 1em;" alt="">
             <div><p>UL认证</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-03.png" style="padding-bottom: 1em;" alt="">
             <div><p>VDE认证</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-04.png" style="padding-bottom: 1em;" alt="">
             <div><p>国家CCC认证</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-05.png" style="padding-bottom: 1em;" alt="">
             <div><p>湖北省高新技术企业</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-06.png" style="padding-bottom: 1em;" alt="">
             <div><p>湖北省重合同守信用企业</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-07.png" style="padding-bottom: 1em;" alt="">
             <div><p>荆州市先进企业</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-08.png" style="padding-bottom: 1em;" alt="">
             <div><p>荆州市重点企业</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-09.png" style="padding-bottom: 1em;" alt="">
             <div><p>荆州市重合同守信用企业</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-10.png" style="padding-bottom: 1em;" alt="">
             <div><p>荆州优化经济环境企业</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-11.png" style="padding-bottom: 1em;" alt="">
             <div><p>纳税光荣户</p></div>
           </li>
           <li>
             <img src="~assets/img/supplier2/zizhi-12.png" style="padding-bottom: 1em;" alt="">
             <div><p>优秀供应商</p></div>
           </li>
         </ul>
       </div>
     </div>
     <div id="product">
       <h3 class="title">产品展示</h3>
       <div class="content">
         <div class="product-info">
           <div>
             <img src="~assets/img/supplier2/product-0@2x.png" alt="">
           </div>
           <div style="padding-left: 70px;padding-top: 30px; color: #737373 ;line-height: 37px">
             <p>
               产品名称：R134a B 系列制冷压缩机
             </p>
             <p>
               规    格：低背压
             </p>
             <p>
               产品备注：小冰箱及饮水机用压缩机。具有体积小、重量轻、噪声低、高性的等特点
             </p>
             <p>
               产品类别：R134a 低背压制冷压缩机
             </p>
           </div>
         </div>
         <ul class="product-list">
           <li>
             <nuxt-link to="/goods/detail/229" class="p-id">
             <img src="~assets/img/supplier2/product-0@2x.png" alt="">
             <div><p>R134a B 系列制冷压缩机</p></div>
             </nuxt-link>
           </li>
           <li>
             <nuxt-link to="/goods/detail/368" class="p-id">
             <img src="~assets/img/supplier2/product-1@2x.png" alt="">
             <div><p>R290 B 系列制冷压缩机</p></div>
             </nuxt-link>
           </li>
           <li>
             <nuxt-link to="/goods/detail/369" class="p-id">
             <img src="~assets/img/supplier2/product-2@2x.png" alt="">
             <div><p>R600a B 系列制冷压缩机</p></div>
             </nuxt-link>
           </li>
           <li>
             <!--<nuxt-link to="/goods/detail/369" class="p-id">-->
             <img src="~assets/img/supplier2/product-3@2x.png" alt="">
             <div><p>R600a L 系列制冷压缩机</p></div>
             <!--</nuxt-link>-->
           </li>
         </ul>
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
      title: '佛山市南海晶昊塑胶五金厂'
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
      if (t >= 200) {
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
    width 1300px
    margin auto
  #intro
    background #ffffff
    padding-bottom 80px
    .intro-img
      float left
      width 500px
      height 300px
    .intro-text
      float right
      height 300px
      width 750px
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
            top 180px
  #zizhi
    .product-list
      li
        text-align center
        background #ffffff
        display inline-block
        margin 22px
        position relative
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
          top 165px
  .footer
    border-top 100px solid #ffffff
    height 200px
    line-height 200px
    text-align center
    color #333
</style>
