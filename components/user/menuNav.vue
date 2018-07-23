<template>
  <div class="user-menu">
    <div class="user-home">
      <nuxt-link to="/user">
        <div class="logo">
          <img src="" alt="logo">
        </div>
        <h3>
          进入工作台
        </h3>
      </nuxt-link>
    </div>
    <el-collapse accordion="true">
      <el-collapse-item>
        <template slot="title">
          <i class="title-icon">&#xe639;</i>企业账号管理
        </template>
      </el-collapse-item>
      <el-collapse-item title="订单管理" name="2">
        <template slot="title">
          <i class="title-icon">&#xe6bd;</i>订单管理
        </template>
        <div class="route-list">
          <div :class="{active: type ==-1, item: true}">
            <nuxt-link to="/user/order/-1/1">全部订单</nuxt-link>
          </div>
          <div :class="{active: type ==0, item: true}">
            <nuxt-link to="/user/order/0/1">待核价</nuxt-link>
          </div>
          <div :class="{active: type ==1, item: true}">
            <nuxt-link to="/user/order/1/1">待签约</nuxt-link>
          </div>
          <div :class="{active: type ==2, item: true}">
            <nuxt-link to="/user/order/2/1">待付款</nuxt-link>
          </div>
          <div :class="{active: type ==3, item: true}">
            <nuxt-link to="/user/order/3/1">待发货</nuxt-link>
          </div>
          <div :class="{active: type ==6, item: true}">
            <nuxt-link to="/user/order/6/1">待收货</nuxt-link>
          </div>
          <div :class="{active: type ==9, item: true}">
            <nuxt-link to="/user/order/9/1">账期中</nuxt-link>
          </div>
          <div :class="{active: type ==8, item: true}">
            <nuxt-link to="/user/order/-1/1">售后处理</nuxt-link>
          </div>
          <div :class="{active: type ==13, item: true}">
            <nuxt-link to="/user/order/13/1">已完成</nuxt-link>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="集众服务" name="3">
        <template slot="title">
          <i class="title-icon">&#xe67c;</i>集众服务
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'menuNav',
  data () {
    return {
      type: -1
    }
  },
  watch: {
    '$route': function () {
      const {params: {type}} = this.$route
      this.type = type
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user-home
    height 150px
    padding 15px
    text-align center
    background-color #ffffff
    border-bottom 10px solid #f4f5f5
    .logo
      width 92px
      height 92px
      padding 10px
      border-radius 50%
      margin auto
      background #F5F5F5
      img
        width 100%
        height 100%
  .route-list
    .item
      height 40px
      line-height 40px
      color #fff
      font-style bold
      &:hover
        background-color #FF7900
        color #ffffff
        a
          color #ffffff
      &.active
        background-color #FF7900
        color #ffffff
        a
          color #ffffff
      a
        padding-left 45px
        display block
</style>

<style lang="stylus">
  // 覆盖样式
  .user-menu
    background-color #ffffff
    width 182px
    position absolute
    left 0
    top 74px
    z-index 9999
    height 100%
    color #666666

    .title-icon
      font-family 'jzdc'
      font-size 16px
      margin-right 10px
    .el-collapse
      border-top none
      border-bottom none
      *
        font-size 12px
      .el-collapse-item__header
        border-bottom none
        padding-left 19px
        color #666666
      .is-active
        color #FF7900
      .el-collapse-item__arrow
        margin-right 36px
        font-family 'jzdc'!important
        &:before
          content: '\E65C'
      .el-collapse-item__wrap
        border-bottom none
      .el-collapse-item__content
        padding-bottom 0
</style>
