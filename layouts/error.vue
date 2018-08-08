<template>
  <div>
    <indexHeader></indexHeader>
    <div>
      <empty text="抱歉，找不到当前页面" img="/empty/404.png" link="/"></empty>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '../components/index/header'
import indexFooter from '../components/index/footer'
import empty from '../components/empty'
export default {
  name: 'result',
  components: {
    indexFooter,
    indexHeader,
    empty
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
        height 288px
        overflow-y auto
        ul
          margin-bottom 10px
          li
            float left
            line-height 45px
            img
              width 45px
              height 45px
              display block
              float left
              margin-right 6px
</style>
