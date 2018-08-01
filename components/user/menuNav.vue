<template>
  <div class="user-menu">
    <div class="user-home">
      <nuxt-link to="/user">
        <div class="logo" v-if="user.path">
          <img :src="user.path" alt="logo">
        </div>
        <div class="logo" v-else>
          <img src="~assets/img/common/default_avatar.png" alt="logo">
        </div>
        <h3>
          {{user.username}}
        </h3>
      </nuxt-link>
    </div>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <i class="title-icon">&#xe639;</i>企业账号管理
        </template>
        <div class="route-list">
          <div :class="{item: true, 'active': /\/user\/setting\/cert/.test(path)}">
            <nuxt-link to="/user/setting/cert">企业认证</nuxt-link>
          </div>
        </div>
        <div class="route-list">
          <div :class="{item: true, 'active': /\/user\/setting\/others/.test(path)}">
            <nuxt-link to="/user/setting/others">其它设置</nuxt-link>
          </div>
        </div>
        <div class="route-list">
          <div :class="{item: true, 'active': /\/user\/setting\/address/.test(path)}">
            <nuxt-link to="/user/setting/address">收货地址管理</nuxt-link>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="订单管理" name="2">
        <template slot="title">
          <i class="title-icon">&#xe6bd;</i>订单管理
        </template>
        <div class="route-list">
          <div :class="{active: type ==i.key, item: true}" v-for="(i, k) in statusList" :key="'orders'+k">
            <nuxt-link :to="'/user/order/'+i.key+'/1'">{{i.value}}</nuxt-link>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="集众服务" name="3">
        <template slot="title">
          <a href="/service/index.html" style="display: block;"><i class="title-icon">&#xe67c;</i>集众服务</a>
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
      type: -1,
      path: ''
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.loggedUser
    },
    statusList: function () {
      return this.$store.getters.statusList
    }
  },
  watch: {
    '$route': function () {
      const {path} = this.$route
      const {params: {type}} = this.$route
      this.type = (type * 1)
      this.path = path
    }
  },
  mounted () {
    const {params: {type}} = this.$route
    const {path} = this.$route
    this.type = (type * 1)
    this.path = path
    this.$store.dispatch('getStatusList')
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
      /*padding 10px*/
      border-radius 50%
      overflow hidden
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
