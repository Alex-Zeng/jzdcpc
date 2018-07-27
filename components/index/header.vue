<template>
  <div :style="{'background-color':bg}">
    <top></top>
    <div class="bottom-wrap" :style="{'background-color':bg}">
      <div class="content">
        <i class="logo" @click="$router.replace('/')"></i>
        <div class="center">
          <ul class="clearfix">
            <li :class="{'active': type === 0}" @click="type=0">找商品</li>
            <li :class="{'active': type === 1}" @click="type=1">找供应商</li>
          </ul>
          <div class="header-search-form">
            <el-input class="header-search-input" v-model="key" @keyup.enter.native="search"></el-input>
            <el-button type="primary" @click="search">搜一搜</el-button>
          </div>
        </div>
        <nuxt-link to="/goods/cart" tag="div" class="btn"><el-button style="padding: 8px 14px;"><div class="car"><i class="icon">&#xe617;</i><span class="car-text">购物清单</span><el-badge :value="num"></el-badge></div></el-button></nuxt-link>
        <ul class="header-menu" @mouseleave="showWrap=false, show=isOpen" @mouseover="show=true">
          <div class="child-wrap" v-show="showWrap" @mouseleave="showWrap=false">
            <div class="child-menu" v-for="(i, k) in child" :key="'item'+i.id + k">
              <div class="child-menu-list clearfix">
                <div class="menu-name">{{i.name}}</div>
                <ul class="clearfix" style="float: left;width: 600px;">
                  <li class="child-menu-list-item" v-for="(item, key) in i.child" :key="'menu' + key+item.id+k">
                    <nuxt-link :to='`/goods/search/%7B"type":0,"cateId":${item.id}%7D`'>{{item.name}}</nuxt-link>
                  </li>
                </ul>
                <!--<a href="" class="more">更多>></a>-->
              </div>
            </div>
          </div>
          <li class="itemAll"><i class="menu-icon">&#xe605;</i>全部商品分类</li>
          <li :class="{item:true, isOpen: isOpen || show}" v-for="(i ,k) in menu" :key="'child'+k + i.id" @mouseover="child = i.child, showWrap=true">
            <div class="img">
              <img :src="i.path" width="16px" alt="">
            </div>
            <span style="float: left;">{{i.name}}</span>
          </li>
        </ul>
        <ul class="header-tabs">
          <li class="item active">首页</li>
          <li class="item">集众金融</li>
          <li class="item">集众服务</li>
          <li class="item">关于我们</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import top from './top'
import apiMallCart from '../../api/apiMallCart'
export default {
  name: 'indexHeader',
  components: {
    top
  },
  watch: {
    '$route': function () {
      const {params: {all}} = this.$route
      if (all) {
        let json = JSON.parse(all)
        json.keywords && (this.key = json.keywords)
      }
    }
  },
  computed: {
    token () {
      return this.$store.getters.loggedToken
    }
  },
  props: {
    isOpen: Boolean,
    bg: String
  },
  data () {
    return {
      menu: [],
      child: [],
      showWrap: false,
      show: false,
      key: '',
      type: 0,
      num: 0
    }
  },
  mounted () {
    this.getMenu()
    this.getNum()
    const {params: {all}} = this.$route
    if (all) {
      let json = JSON.parse(all)
      this.key = json.keywords
    }
  },
  methods: {
    async search () {
      const all = {keywords: this.key, type: this.type}
      this.$router.push('/goods/search/' + JSON.stringify(all))
    },
    async getMenu () {
      try {
        this.$store.dispatch('getCategoryList', (result) => {
          const {data, status, msg} = result
          if (status === 0) {
            this.menu = data
          } else {
            this.$message(
              {
                type: 'warn',
                message: msg
              }
            )
          }
        })
      } catch (e) {
        this.$message(
          {
            type: 'error',
            message: '网络有点小问题'
          }
        )
      }
    },
    async getNum () {
      if (this.token) {
        try {
          await apiMallCart.getNum(
            (result) => {
              const {data: {total}} = result
              this.num = total
            }
          )
        } catch (e) {
          this.$message(
            {
              type: 'error',
              message: '网络有点小问题'
            }
          )
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bottom-wrap
    z-index 999
    height 138px
    background-color #f5f5f5
    border-bottom 2px solid #2475e2
    position relative
    .content
      height 138px
    .header-menu
      width 240px
      position absolute
      top 138px
      margin-top -40px
      left 0
      .child-wrap
        width 808px
        z-index 999
        overflow hidden
        position absolute
        left 240px
        top 40px
        min-height 510px
        height 510px
        background-color #fff
        font-size 14px
        padding 30px 0
        transition width 0.8s
        box-sizing border-box
        display: block
      .child-menu
        font-size 14px
        .more
          position absolute
          right 39px
          line-height 1.8
        .menu-name
          float left
          color: #030000
          font-weight 600
          box-sizing border-box
          width 125px
          text-align right
          padding-left 18px
        .child-menu-list
          .child-menu-list-item
            float left
            padding-left 10px
            cursor pointer
            line-height 1.8
            &:hover
              color #2475E2
            &:before
              content:'|'
              padding-right 10px
              color #e1e1e1
        &+.child-menu
          margin-top 20px
      .item
        box-sizing border-box
        padding-left 40px
        height 51px
        line-height 51px
        color #fff
        font-size 14px
        background-color #313131
        position relative
        cursor pointer
        display: none
        .img
          height 51px
          line-height 51px
          vertical-align: middle
          float left
          margin-right 20px
          img
            vertical-align:middle
        &.isOpen
          display block
        &:after
          display block
          content: '\e678'
          font-size 12px
          font-family 'jzdc'
          position absolute
          right 20px
          top 0
          line-height 50px
        &+.item
          border-top 1px solid #fff
        .menu-icon
          font-size 20px
          color #ffffff
          font-family 'jzdc'
          float left
          margin-right 30px
      .itemAll
        border-top-left-radius 6px
        border-top-right-radius 6px
        background-color #2475e2
        box-sizing border-box
        padding-left 40px
        height 40px
        line-height 40px
        color #fff
        font-size 14px
        .menu-icon
          font-size 20px
          color #ffffff
          font-family 'jzdc'
          float left
          margin-right 30px
    .header-tabs
      position absolute
      bottom 10px
      left 260px
      color #333333
      .item
        float left
        width 120px
        text-align center
        cursor pointer
        &.active
          color #2475e2
    .center
      width 500px
      margin 20px auto 0
      ul
        font-size 14px
        li
          float left
          margin-right 10px
          cursor pointer
        li+li
          margin-right 0
          padding-left 10px
          border-left 1px solid #a1a1a1
        li.active
          color #2475e2
    .logo
      background-image url('../../assets/img/index/logo.png')
      width 210px
      height 60px
      display block
      position absolute
      top 39px
      left 0
      margin-top -30px
    .btn
      height 36px
      position absolute
      right 0
      top 69px
      margin-top -18px
      .car
        display flex
      .car-text
        line-height 20px
        padding 0 6px
    .icon
      font-family 'jzdc'
      font-size 20px
      color #ff7900
  .content
    width 1300px
    margin 0 auto
    position relative
</style>

<style lang="stylus">
  .header-search-form
    margin-top 10px
    .header-search-input
      width 400px
      input
        border-bottom-right-radius 0 !important
        border-top-right-radius 0 !important
    .el-button
      border-bottom-left-radius 0 !important
      border-top-left-radius 0 !important
</style>
