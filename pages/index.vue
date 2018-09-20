<template>
  <div>
    <indexHeader :isOpen="true"></indexHeader>
    <div class="main">
      <div class="main-header">
        <div class="banner">
          <el-carousel height="360px" indicator-position="none">
            <el-carousel-item v-for="item in banner" :key="item.id">
              <a :href="item.url" :target="item.target">
                <img :src="item.img" alt="banner">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="banner-right">
          <div>
            <div class="logo" v-if="!!token">
              <img :src="user.path" alt="logo" v-if="user.path">
              <img src="~assets/img/common/default_avatar.png" alt="logo" v-else>
            </div>
            <div class="logo" v-else>
              <img src="~assets/img/common/default_avatar.png" alt="logo">
            </div>
            <h3>
              <span v-if="user">{{user.username}}</span>
            </h3>
            <el-button type="primary" v-if="!!token" plain @click="$router.push('/user/workbench')">进入工作台</el-button>
            <el-button type="primary" v-else plain @click="$router.push('/auth/login')">登录/注册</el-button>
          </div>
          <div>
            <img src="~assets/img/index/gonggao.png" alt="">
            <span>系统公告</span>
            <div>
              <p>{{notice.release_time}}</p>
              <p class="msg-content">
                {{notice.summary}}
              </p>
              <nuxt-link to="/notice" class="link">更多>></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="main-count">
        <div class="total">
          <p>本月累计成交</p>
          <h3>{{total.turnoverMonth}}<span>元</span></h3>
        </div>
        <div class="total">
          <p>累计成交额</p>
          <h3>{{total.turnoverAll}}<span>元</span></h3>
        </div>
        <div class="jzAd">
          <nuxt-link to="/factoring">
            <img src="~assets/img/index/fuwu.png" alt="">
            <p>集众保理</p>
            <span>前往集众保理>></span>
          </nuxt-link>
        </div>
      </div>
      <div class="main-AD">
        <div class="item">
          <img src="~assets/img/index/cgfx.png" alt="">
          <span>采购放心</span>
        </div>
        <div class="item">
          <img src="~assets/img/index/wyjl.png" alt="">
          <span>物优价廉</span>
        </div>
        <div class="item">
          <img src="~assets/img/index/pzbz.png" alt="">
          <span>品质保障</span>
        </div>
        <div class="item">
          <img src="~assets/img/index/fwtx.png" alt="">
          <span>服务贴心</span>
        </div>
      </div>
      <div v-for="(item, k) in goodsList" :id="item.id" :key="item.id" class="main-floor">
        <div class="floor-nav" :style="{background: goodsListImg[k].bg}">
          <h3>{{item.name}}</h3>
          <nuxt-link  class="el-button"  v-for="i in item.pushTypeList" :id="i.id" :key="i.id" :to='`/goods/search/%7B"type":0,"cateId":${i.id},"selectId":${item.id},"childId":${i.id}%7D`'>{{i.name}}</nuxt-link>
          <img :src="goodsListImg[k].img" alt="">
        </div>
        <div class="floor-content">
          <ul>
            <li v-for="j in item.pushGoodsList" :key="j.id">
              <nuxt-link :to="'/goods/detail/'+j.id">
                <img :src="j.icon" alt="">
                <p>
                  {{j.title}}
                </p>
                <div class="text-red">
                  <span class="text-red">{{j.showPrice}}</span>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="sub-floor-nav">
        <ul>
          <li v-for="item in subFloorNav" :key="item.id">
            <a href="javascript:;" @click.prevent="custormAnchor(item.id)">{{item.name}}</a>
          </li>
        </ul>
        <img src="~assets/img/index/go-top.png" @click="goTop" alt="">
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<style lang="stylus" scoped>
body{
  font-family 'MicrosoftYaHei'
}
.text-red{
  color #FF0000
}
.el-header
  background-color #B3C0D1
  color #333
  line-height 60px
.header
  height 60px
  line-height 1
.main{
  width 1300px
  background #f5f5f5
  margin auto
}
.main-header{
  display flex
}
.main .banner{
  width 798px
  height 360px
  margin-left 250px
  margin-right 10px
  background #5B96E3
}
.main .banner a, .main .banner a img{
  display block
  width 100%
  height 100%
}
.main .banner-right{
  width 240px
}
.main .banner-right > div{
  background #ffffff
}
.main .banner-right > div:first-child{
  height 210px
  padding-top 20px
  box-sizing border-box
  margin-bottom 10px
  text-align center
}
.main .banner-right > div:last-child{
  height 138px
  padding 20px 10px 10px 20px
}
.main .banner-right > div:last-child img{
  width 24px
  height 23px
  margin-right 10px
  display inline-block
  vertical-align middle
}
.main .banner-right > div:last-child p{
  color #666666
  font-size 14px
  margin 3px 0 0  3px
}
.banner-right .logo{
  width 92px
  height 92px
  overflow hidden
  border-radius 50%
  margin auto
  background #F5F5F5
}
.banner-right .logo img{
  width 100%
  height 100%
}
.banner-right h3{
  color #666666
  font-size 14px
  overflow hidden
  text-overflow:ellipsis
  white-space: nowrap
  padding 10px 14px 20px 20px
}
.msg-content{
  height 36px
  overflow hidden
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 2
}
.main .banner-right > div:last-child a{
  display block
  text-align right
  color #2475E2
  font-size 14px
  padding-top 0.5em
}
.el-button--primary.is-plain{
  color: #5291E3
  background none
  border-color: #2475E2
  width:80px
  height:32px
  font-size 12px
  padding 0
  border-radius:5px
}
.main-count{
  display flex
  padding-left 250px
  padding-top 10px
}
.main-count .total{
  width 395px
  height 143px
  padding 20px
  box-sizing border-box
  background #ffffff
  margin-right 10px
}
.main-count .total:first-child{
  margin-right 8px
}
.main-count .total h3{
  font-size 44px
  color #2475E2
}
.main-count .total h3 span{
  font-size 16px
  color #333333
  padding-left 0.5em
}
.main-count .jzAd{
  width 240px
  height 143px
  text-align center
  color #ffffff
  background #5790DA
}
.main-count .jzAd a{
  display block
  position relative
}
.main-count .jzAd a p{
  width:133px;
  height:30px;
  font-size:30px;
  font-family:MicrosoftYaHei;
  font-weight:bold;
  color:rgba(255,255,255,1);
  position absolute
  top 58px
  left 50px
}
.main-count .jzAd a span{
  width:97px;
  height:11px;
  font-size:12px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  position absolute
  top 112px
  left 70px
}
.main-AD{
  height 120px
  display flex
  justify-content space-between
  align-items center
}
.main-AD .item{
  flex 1
  text-align center
  font-size 20px
  font-weight bold
}
.main-AD .item:nth-child(1){
  color #2FBEED
}
.main-AD .item:nth-child(2){
  color #FF7F00
}
.main-AD .item:nth-child(3){
  color #00CCAA
}
.main-AD .item:nth-child(4){
  color #7FBFFF
}
.main-AD .item img{
  display inline
  vertical-align middle
  margin-right 10px
}
.main-floor{
  position relative
  margin-bottom 18px
}
.floor-nav{
  width 268px
  height 600px
  background red
  margin-bottom 20px
  position absolute
  padding 30px 20px
  box-sizing border-box
  left 0
  top 0
}
.floor-nav h3{
  font-size 30px
  color #ffffff
  padding 40px 0
  text-align center
}
.floor-nav .el-button{
  width 96px
  height 32px
  line-height 32px
  text-align center
  padding 0
  margin 8px
  color #f7f7f7
  border 1px solid #f7f7f7
  border-radius 5px
  background transparent
}
.floor-nav .el-button:hover, .floor-nav .el-button:active, .floor-nav .el-button.active{
  color #2475E2
  background #f7f7f7
}
.floor-nav img{
  position absolute
  right 20px
  bottom 16px
}
.floor-content{
  height 600px
  margin-left 268px
}
.floor-content ul{
  height 600px
  border 1px solid #DEDEDE
  border-top none
  border-right none
  overflow hidden
}
.floor-content ul li{
  display inline-block
  float left
  width 25%
  height 300px
  overflow hidden
}
.floor-content ul li p{
  color #333333
  font-size 14px
  height 40px
  overflow hidden
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 2
}
.floor-content a{
  display block
  height 302px
  padding 20px 14px 10px 20px
  box-sizing border-box
  border 1px solid #DEDEDE
  background #ffffff
  text-align left
  margin-left -1px
}
.floor-content a img{
  display block
  width 167px
  height 167px
  margin auto
  margin-bottom 45px
  background #e0e0e0
}
.sub-floor-nav{
  position fixed
  top 45%
  right 180px
}
.sub-floor-nav ul{
  padding-bottom 10px
}
.sub-floor-nav a{
  padding 0 10px
  height 42px
  line-height 42px
  display block
  background #DEDEDE
  color #666666
  font-size 14px
  text-align center
}
.sub-floor-nav a:hover, .sub-floor-nav a:active, .sub-floor-nav a.active{
  background #2475E2
  color #ffffff
}
.sub-floor-nav img{
  display block
  margin auto
}
</style>

<script>
import indexHeader from '../components/index/header'
import indexFooter from '../components/index/footer'
import apiIndex from '@/api/apiIndex'
export default {
  components: {
    indexHeader,
    indexFooter
  },
  metaInfo: {
    title: '商品详情'
  },
  data () {
    return {
      banner: [],
      notice: {
        release_time: '',
        summary: ''
      },
      total: {},
      goodsList: [],
      goodsListImg: [
        {img: require('@/assets/img/index/bingxiang.png'), bg: 'background linear-gradient(#9DB9FC, #7E9FF2)'},
        {img: require('@/assets/img/index/xiyiji.png'), bg: 'background linear-gradient(#9DC6FC, #7EB0F2)'},
        {img: require('@/assets/img/index/kongtiao.png'), bg: 'background linear-gradient(#6ABFD9, #46ACCB)'},
        {img: require('@/assets/img/index/xiaodugui.png'), bg: 'background linear-gradient(#9D9DFC, #7E7EF2)'},
        {img: require('@/assets/img/index/quanzidong.png'), bg: 'background linear-gradient(#9DB5FC, #7E9BF2)'},
        {img: require('@/assets/img/index/fucai.png'), bg: 'background linear-gradient(#6DC9DA, #43B7CE)'},
        {img: require('@/assets/img/index/baozhuangyinshua.png'), bg: 'background linear-gradient(#52D9C2, #2ED4B8)'},
        {img: require('@/assets/img/index/yuancailiao.png'), bg: 'background linear-gradient(#E3C471, #DDB447)'}
      ],
      subFloorNav: []
    }
  },
  computed: {
    token () {
      return this.$store.getters.loggedToken
    },
    user () {
      return this.$store.getters.loggedUser
    }
  },
  mounted () {
    this.getBannerList()
    this.getTotal()
    this.getNotice()
    this.getPushTypeAndGoods()
  },
  methods: {
    async getBannerList () {
      await apiIndex.getBanner({type: 1}, (data) => {
        this.banner = data
      })
    },
    async getNotice () {
      await apiIndex.getFirstNotice({pageSize: 1, pageNumber: 1}, (data) => {
        const {data: {list}} = data
        this.notice = list[0]
      })
    },
    async getTotal () {
      await apiIndex.getTotal((data) => {
        this.total = data.data
      })
    },
    async getPushTypeAndGoods () {
      await apiIndex.getPushTypeAndGoods((data) => {
        this.goodsList = data.data.dataType
        data.data.dataType.forEach((item) => {
          this.subFloorNav.push({id: item.id, name: item.name})
        })
      })
    },
    goTop () {
      let scrollTop = parseInt(document.body.scrollTop || document.documentElement.scrollTop)
      let t = setInterval(function () {
        scrollTop += -200
        window.scrollTo(0, scrollTop)
        if (scrollTop < 0) {
          clearInterval(t)
          window.scrollTo(0, 0)
        }
      }, 60)
    },
    custormAnchor (anchorName) {
      console.log(anchorName)
      // 找到锚点
      let anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView()
      }
    }
  }
}
</script>
