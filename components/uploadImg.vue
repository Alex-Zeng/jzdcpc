<template>
  <div class="upload-wrap">
    <h4 class="title">企业法人证明</h4>
    <div class="img-box" v-show="false">
      <img class="img" src="https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/676663623/TB1_MlPe1OSBuNjy0FdXXbDnVXa_!!0-item_pic.jpg_250x250.jpg_.webp" alt="">
    </div>
    <div class="select-box">
      <span>点击上传</span>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.upload-wrap
  padding 40px 47px 64px
  border-radius 10px
  border 1px solid #cccccc
  background-color #fff
  width 344px
  height 344px
  box-sizing border-box
  .title
    font-size 24px
    color #222
    font-weight 400
  .select-box
    cursor pointer
    width 250px
    height 160px
    padding-top 160px
    margin 33px auto 0
    background url("~assets/img/common/select_img.png")
    position relative
    span
      color #2fbeed
      font-size 24px
      cursor pointer
  .img-box
    width 250px
    height 160px
    margin 50px auto 0
    position relative
    .img
      width 100%
      height 100%
    &:before
      content ' '
      display block
      width 42px
      height 42px
      background url("~assets/img/common/delete.png")
      position absolute
      right -21px
      top -21px
</style>

<script>
export default {
  name: 'uploadImg',
  props: {
    api: String,
    title: String,
    value: String
  },
  methods: {
    upload () {

    }
  }
}
</script>
