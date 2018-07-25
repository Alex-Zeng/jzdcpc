<template>
  <div>
    <indexHeader></indexHeader>
    <div class="result-wrap">
      <div class="title-bar">
        <img src="~assets/img/goods/ok.png" alt="" style="float: left;margin-right: 10px;">
        <span>恭喜，您的订单已经替提交成功，工作人员会尽快与您联系</span>
      </div>
      <div class="result-list" v-for="(i, k) in list" :key="'result'+k">
        <div class="head-bar">订单号：{{i.orderNo}}</div>
        <div class="detail clearfix">
          <div class="left">
            <div class="item">
              <span class="label">供应商：</span>
              <span class="value">{{i.supplierName}}</span>
            </div>
            <div class="item">
              <span class="label">订单金额：</span>
              <span class="value">1000，00</span>
            </div>
            <div class="item">
              <span class="label">期望交货日期：</span>
              <span class="value">{{i.date}}</span>
            </div>
            <div class="item">
              <span class="label">买家留言：</span>
              <span class="value">1000，留言内容留言内容留言内容留言内容留言内容
留言内容留言内容留言内容留言内容留言内容
留言内容留言内容留言内容留言内容留言内容
留言内容留言内容留言内容留言内容留言内容
留言内容留言内容留言内容留言内容留言内容</span>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <ul class="">
                <li><img src="" alt="">商品名称</li>
                <li>X11</li>
                <li>30.00</li>
                <li>330.00</li>
                <li>查看</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '../../components/index/header'
import indexFooter from '../../components/index/footer'
export default {
  name: 'result',
  components: {
    indexFooter,
    indexHeader
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    const result = JSON.parse(sessionStorage.getItem('orderResult'))
    this.list = result
  }
}
</script>

<style lang="stylus" scoped>
.result-wrap
  width 1300px
  margin 0 auto
  padding 20px 0 40px
  .title-bar
    background-color #2475e2
    padding 16px 20px
    font-weight 600
    font-size 18px
    color #fff
    line-height 48px
  .result-list
    border 1px solid #dedede
    background-color #fff
    margin-top 20px
    .head-bar
      color #333333
      font-size 16px
      border-bottom 1px solid #dedede
      padding 13px 20px
    .detail
      font-size 14px
      color #666666
      height 288px
      .left
        width 430px
        border-right 1px solid #dedede
        padding 20px
        height 288px
        float left
        .item
          margin-bottom 20px
          display flex
          .label
            flex-basis 98px
            width 98px
            text-align right
            margin-right 10px
          .value
            width 280px
            flex-basis 280px
      .right
        float left
        padding 20px
        ul
          li
            float left
            line-height 45px
</style>
