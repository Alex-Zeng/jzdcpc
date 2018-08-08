<template>
  <div class="service-wrap">
    <div class="back" @click="back"><i class="back_icon">&#xe67a;</i>返回</div>
    <div class="title">申请售后</div>
    <div class="list-wrap">
      <div class="list-title">
        <span class="no">订单号：201805102336001</span>
        <span class="company">广东津晶科技</span>
      </div>
      <div class="goods">
        <div class="good">
          <img src="" alt="">
          <div class="info">
            <div class="big">测试商品名称A</div>
            <div class="small">数量:10</div>
          </div>
          <div class="info">
            <div class="small">单价:100000</div>
            <div class="small">小计:100000</div>
          </div>
          <div class="info">
            <div class="service-type">
              <span>服务类型:</span>
              <span>退货</span>
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
    }
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
      .good
        display flex
        padding 10px 20px
        img
          display block
          width 60px
          height 52px
          background-color grey
          margin-right 20px
</style>
