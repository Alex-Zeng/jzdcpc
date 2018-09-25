<template>
   <div>
     <div class="header" :class="{scroll: isScroll}">
       <nuxt-link to="/" class="logo"></nuxt-link>
       <div class="header-nav">
         <a href="#banner">公司简介</a>
         <a href="#product">产品展示</a>
       </div>
     </div>
     <div id="banner" class="banner">
       <h3>
         佛山市南海晶昊塑胶五金厂
       </h3>
       <h4>顾客至上 锐意进取</h4>
       <p>加工：产销：塑胶：五金：制冷配件</p>
     </div>
     <div id="intro">
       <h3 class="title">公司简介</h3>
       <div class="content">
         <img src="~assets/img/supplier/intro-01.png" alt="">
         <p>
           佛山市南海晶昊塑胶五金厂办公室地址位于广东第三大城市，中国近代明清的天下四聚之一佛山，佛山 佛山市南海区里水镇新联工业区里广路175-2号1栋首层（邮编：528244），于2007-03-23 在佛山工商局注册成立，工厂已经工厂发展壮大的11年，愿与社会各界同仁携手合作，谋求共同发展，继续为新老客户提供最优秀的产品和服务。我工厂主要经营加工、产销：塑胶、五金、制冷配件。(依法须经批准的项目，经相关部门批准后方可开展经营活动)，我工厂与多家佛山冰箱、冷柜公司零售商和代理商建立了长期稳定的合作关系，品种齐全、价格合理，企业实力雄厚，重信用、守合同、保证产品质量，以多品种经营特色和薄利多销的原则，赢得了广大客户的信任，工厂始终奉行“诚信求实、致力服务、唯求满意”的企业宗旨，全力跟随客户需求，不断进行产品创新和服务改进。
         </p>
       </div>
     </div>
     <div id="product">
       <h3 class="title">产品展示</h3>
       <div class="content">
         <div class="product-info">
           <div>
             <img src="~assets/img/supplier/product-01.png" alt="">
             <div style="text-align: center">冰箱单管蒸发器</div>
           </div>
           <div style="padding-left: 70px;padding-top: 30px;">
             <p>
               1-蒸发器——是制冷系统中的主要换热装置，其作用是使低温低压的液态制冷剂在其内迅速
               蒸发（沸腾）为蒸汽，吸收被冷却的物质的热量，使冷藏（冷冻）物质的温度下降从而达
               到制冷的目的
             </p>
             <p>
               2-产品特点：传热性能好、节能；产品加工定制服务
             </p>
             <p>
               3-平台交易量：超过20万件
             </p>
           </div>
         </div>
         <ul class="product-list">
           <li>
             <img src="~assets/img/supplier/product-02.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-03.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-04.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-05.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-06.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-07.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-08.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
           <li>
             <img src="~assets/img/supplier/product-09.png" alt="">
             <p>冰箱单管蒸发器</p>
           </li>
         </ul>
       </div>
     </div>
     <div class="footer">
       <p>copyright&nbsp;©&nbsp;2018&emsp;津晶科技&emsp;版权所有&emsp;&emsp;&emsp;&emsp;粤ICP背案号</p>
     </div>
   </div>
</template>

<script>
export default {
  name: 'supplier-index',
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
    z-index 2
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
    p
      text-indent 2em
  #intro
    background #ffffff
    padding-bottom 80px
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
          img
            width 280px
            height 200px
          p
            width 100%
            height 40px
            line-height 40px
            background rgba(0,0,0,0.5)
            position absolute
            bottom 0
            left 0
            color #ffffff
  .footer
    border-top 100px solid #ffffff
    height 200px
    line-height 200px
    text-align center
    color #333
</style>
