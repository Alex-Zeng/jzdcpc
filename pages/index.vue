<template>
  <div>
    <indexHeader></indexHeader>
    <div class="main">
      <div class="main-header">
        <div class="banner">
          <el-carousel height="360px" indicator-position="none">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="banner-right">
          <div>
            <div class="logo">
              <img src="" alt="logo">
            </div>
            <h3>
              津晶科技信息服务（广州）有限公司
            </h3>
            <el-button type="primary" plain>进入工作台</el-button>
            <el-button type="primary" plain>登录/注册</el-button>
          </div>
          <div>
            <img src="" alt="">
            <span>系统公告</span>
            <div>
              <p>2018.7.3</p>
              <p class="msg-content">
                系统公告主题，主题好精彩，精彩到你唔信
                系统公告主题，主题好精彩，精彩到你唔信
              </p>
              <a href="">更多>></a>
            </div>
          </div>
        </div>
      </div>
      <div class="main-count">
        <div class="total">
          <p>本月累计成交</p>
          <h3>188,888.00<span>元</span></h3>
        </div>
        <div class="total">
          <p>累计成交额</p>
          <h3>188,888.00<span>元</span></h3>
        </div>
        <div class="jzAd">
          集众广告图
        </div>
      </div>
      <div class="main-AD">
        <div class="item">
          <img src="~assets/img/index/cgfx.png" alt="">
        </div>
        <div class="item">
          <img src="~assets/img/index/wyjl.png" alt="">
        </div>
        <div class="item">
          <img src="~assets/img/index/pzbz.png" alt="">
        </div>
        <div class="item">
          <img src="~assets/img/index/fwtx.png" alt="">
        </div>
      </div>
      <div id="floor1" class="main-floor">
        <div class="floor-nav">
          <h3>冰箱</h3>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button active" href="javascript:;">按钮</a>
          <img src="~assets/img/index/bingxiang.png" alt="">
        </div>
        <div class="floor-content">
          <ul>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="floor2" class="main-floor">
        <div class="floor-nav">
          <h3>冰箱</h3>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button active" href="javascript:;">按钮</a>
        </div>
        <div class="floor-content">
          <ul>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="floor3" class="main-floor">
        <div class="floor-nav">
          <h3>冰箱</h3>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button active" href="javascript:;">按钮</a>
        </div>
        <div class="floor-content">
          <ul>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="floor4" class="main-floor">
        <div class="floor-nav">
          <h3>冰箱</h3>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button" href="javascript:;">按钮</a>
          <a class="el-button active" href="javascript:;">按钮</a>
        </div>
        <div class="floor-content">
          <ul>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="" alt="">
                <p>
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管冰箱铜管冰箱铜管
                  冰箱铜管冰箱铜管
                </p>
                <span class="text-red">￥20.00</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="sub-floor-nav">
        <ul>
          <li><a href="#floor1">冰箱</a></li>
          <li><a href="#floor2">冰箱</a></li>
          <li><a href="#floor3">冰箱</a></li>
          <li><a href="#floor4">冰箱</a></li>
        </ul>
      </div>
    </div>
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
  background green
}
.main .banner-right > div:last-child p{
  color #666666
  font-size 14px
  margin 3px 0 0  3px
}
.banner-right .logo{
  width 92px
  height 92px
  border-radius 50%
  margin auto
  background #F5F5F5
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
  font-size 56px
  color #2475E2
}
.main-count .total h3 span{
  font-size 18px
  color #333333
  padding-left 0.5em
}
.main-count .jzAd{
  width 240px
  height 143px
  line-height 143px
  text-align center
  color #ffffff
  background #5790DA
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
}
.main-AD .item img{
  display inline
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
  padding 30px
  box-sizing border-box
  left 0
  top 0
}
.floor-nav h3{
  font-size 30px
  color #ffffff
  padding 40px
}
.floor-nav .el-button{
  width 80px
  height 32px
  line-height 32px
  text-align center
  padding 0
  margin 10px
  color #f7f7f7
  border 1px solid #f7f7f7
  border-radius 5px
  background transparent
}
.floor-nav .el-button:hover, .floor-nav .el-button:active, .floor-nav .el-button.active{
  color #2475E2
  background #f7f7f7
}
.floor-nav:nth-child(1){
  background linear-gradient(#9DB9FC, #7E9FF2)
}
.floor-nav:nth-child(2){
  background linear-gradient(#9DC6FC, #7EB0F2)
}
.floor-nav:nth-child(3){
  background linear-gradient(#6ABFD9, #46ACCB)
}
.floor-nav:nth-child(4){
  background linear-gradient(#9D9DFC, #7E7EF2)
}
.floor-nav:nth-child(5){
  background linear-gradient(#9DB5FC, #7E9BF2)
}
.floor-nav:nth-child(6){
  background linear-gradient(#6DC9DA, #43B7CE)
}
.floor-nav:nth-child(7){
  background linear-gradient(#52D9C2, #2ED4B8)
}
.floor-nav:nth-child(8){
  background linear-gradient(#E3C471, #DDB447)
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
  border 1px solid #DEDEDE

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
  background #5daf34
  text-align left
  margin-left -1px
}
.floor-content a img{
  width 167px
  height 167px
  margin auto
  margin-bottom 45px
  background mediumpurple
}
.sub-floor-nav{
  position fixed
  top 45%
  right 10%
}
.sub-floor-nav a{
  width 60px
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
</style>

<script>
import indexHeader from '../components/index/header'
export default {
  components: {
    indexHeader
  },
  data () {
    return {
      radio3: '',
      filename: ''
    }
  },
  computed: {
    data () {
      return this.$store.getters.favoriteList
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      this.$store.dispatch('getFavoriteList', {pageSize: 10, pageNumber: 1, field: 'time', sort: 'asc'})
    }
  }
}
</script>
