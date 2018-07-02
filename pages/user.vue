<template>
  <div>
    <userHeader></userHeader>
    <div class="clearfix user-wrap">
      <div class="user-menu">
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <i class="title-icon">&#xe600;</i>用户中心首页
            </template>
          </el-collapse-item>
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
      <div class="content">
        <nuxt-child/>
      </div>
    </div>
    <authFooter></authFooter>
  </div>
</template>

<style lang="stylus" scoped>
.route-list
  .item
    height 40px
    padding-left 45px
    line-height 40px
    color #fff
    font-style bold
    &:hover
      background-color #294265
    &.active
      background-color #294265
    a
      display block
.user-wrap
  padding-left 182px
  background-color #1c324f
  min-width 1200px
  margin-top 64px
  .content
    background-color #ffffff
    display block
    width 99.9%
    /*margin-left 182px*/
    overflow: hidden
</style>

<style lang="stylus">
// 覆盖样式
.user-menu
  background-color #1c324f
  width 182px
  position fixed
  left 0
  top 64px
  z-index 9999
  height 100%
  .title-icon
    font-family 'jzdc'
    color #ffffff
    font-size 16px
    margin-right 10px
  .el-collapse
    background-color #1c324f
    border-top none
    border-bottom none
    .el-collapse-item__header
      background-color #1c324f
      color #ffffff
      border-bottom none
      padding-left 19px
    .el-collapse-item__arrow
      margin-right 36px
      font-family 'jzdc'!important
      &:before
        content: '\E65C'
    .el-collapse-item__wrap
      border-bottom none
    .el-collapse-item__content
      background-color #1c324f
      padding-bottom 0
</style>

<script>
import userHeader from '../components/user/header'
import authFooter from '../components/user/footer'

export default {
  components: {
    userHeader,
    authFooter
  },
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
