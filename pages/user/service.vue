<template>
  <div class="service-wrap">
    <div class="back" @click="back"><i class="back_icon">&#xe67a;</i>返回</div>
    <div class="title">申请售后</div>
    <div class="list-wrap">
      <div class="list-title">
        <span class="no">订单号：{{detail.orderNo}}</span>
        <span class="company">{{detail.companyName}}</span>
      </div>
      <div class="goods">
        <div class="good" v-for="(good, index) in detail.goods" :key="'service_good'+ index">
          <div class="box">
            <img :src="good.icon" alt="">
            <div class="info width">
              <div class="big">{{good.title}}</div>
              <div class="small">数量:{{good.quantity}}</div>
            </div>
            <div class="info price">
              <div class="small">单价:{{good.price}}元</div>
              <div class="small">小计:{{(good.quantity*good.price).toFixed(2)}}元</div>
            </div>
          </div>
          <div class="info">
            <div class="service-type">
              <span style="margin-right: 42px;">服务类型:</span>
              <span>{{getType(good.service_type)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'service',
  computed: {
    detail () {
      return this.$store.getters.orderDetail
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getType (t) {
      switch (parseInt(t)) {
        case 1:
          return '退货'
        case 2:
          return '换货'
        case 3:
          return '维修'
        default:
          return '暂无售后'
      }
    }
  },
  mounted () {
    const {params: {no}} = this.$route
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$store.dispatch('getOrderDetail', {fileds: {no}, cb: () => { loading.close() }})
  }
}
</script>

<style lang="stylus" scoped>
  .service-wrap
    padding 5px
    .title
      font-size 18px
      color #333333
      padding-left 10px
      margin-bottom 18px
      border-left 4px solid #ff7900
    .back
      font-size 18px
      cursor pointer
      color #ff7900
      margin-bottom 16px
      .back_icon
        font-family 'jzdc'
        font-size 18px
    .list-wrap
      background-color #fff
      .list-title
        color #666666
        font-size 14px
        padding 12px 20px
        border 1px solid #dedede
        .no
          margin-right 60px
    .goods
      border 1px solid #dedede
      border-top none
      border-bottom none
      .good
        border-bottom 1px solid #dedede
        display flex
        align-items center
        .box
          display flex
          align-items center
          border-right 1px solid #dedede
          margin-right 20px
        img
          margin 10px 0 10px 20px
          display block
          width 60px
          height 52px
          background-color grey
          margin-right 20px
        .info
          padding-right 62px
          .big
            width 280px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-size 14px
            color #333
          .small
            color #737373
            font-size 12px
        .price
          flex-basis 190px
          width 190px
          max-width 190px
        .width
          flex-basis 320px
          width 320px
          max-width 320px
        .service-type
          color #666
          font-size 14px
</style>
