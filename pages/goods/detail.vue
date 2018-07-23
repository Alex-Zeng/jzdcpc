<template>
  <div style="background-color: #fff;">
    <indexHeader bg="#fff"></indexHeader>
    <div class="detail-wrap">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="i in path" :key="'path' + i.id"><nuxt-link :to='`/goods/search/%7B"type":0,"cateId":${i.id}%7D`'>{{i.name}}</nuxt-link></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="preview-wrap clearfix">
        <div class="look-at">
          <div class="big">
            <img width="100%" height="100%" :src="detail.imgList && detail.imgList[select].img" alt="">
          </div>
          <div class="small-wrap">
            <i class="prev"></i>
            <div class="small-list">
              <div class="super-wrap">
                <div class="small-item" v-for="(i, k) in detail.imgList" :key="k" @click="select=k">
                  <img :src="i.img" alt="">
                </div>
              </div>
            </div>
            <i class="next"></i>
          </div>
        </div>
        <div class="info-wrap">
          <div class="title">{{detail.title}}</div>
          <div class="label">
            <span>单价</span>
            <span class="money">¥{{detail.min_price}}-{{ detail.max_price}}</span>
            <span class="uni">元/{{detail.unit}}</span>
          </div>
          <div class="info-item">
            <span class="name">供应商：</span>
            <span>{{detail.supplier}}</span>
          </div>
          <div class="info-item">
            <span class="name">采购数量：</span><el-input-number v-model="count" :min="1" label="描述文字"></el-input-number>
          </div>
          <div class="info-item">
            <span class="name">计量单位：</span>
            <span>{{detail.unit}}</span>
          </div>
          <div class="info-item type clearfix" v-for="(i, k) in detail.standard" :key="i.id">
            <span class="name" style="float: left;">{{i.title}}：</span>
            <div style="float: left; width: 768px;margin-left: -10px;">
              <el-button style="margin-top: 10px;" :type="choose[k] === index? 'primary': ''" v-for="(item, index) in i.list" :key="index" @click="chooseFunc(k, index)">{{item.color_name}}</el-button>
            </div>
          </div>
          <div class="label" style="margin-bottom: 20px;">
            <span class="grey">{{choose}}</span>
          </div>

          <el-button type="primary" style="width: 240px;"><i class="icon">&#xe617;</i>加入购物车</el-button>
        </div>
      </div>
      <div class="other-wrap clearfix">
        <div class="left">
          热门
        </div>
        <div class="right">
          <div class="title">商品详情</div>
          <div v-html="detail.detail" style="padding: 0 28px;"></div>
        </div>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '../../components/index/header'
import indexFooter from '../../components/index/footer'
import apiGoods from '../../api/apiGoods'
export default {
  name: 'detail',
  components: {
    indexHeader,
    indexFooter
  },
  data () {
    return {
      detail: {},
      count: 1,
      select: 0,
      path: [],
      spec: {},
      choose: []
    }
  },
  methods: {
    chooseFunc (k, index) {
      this.$set(this.choose, k, index)
    }
  },
  mounted () {
    const {params: {id}} = this.$route
    apiGoods.getGoodsDetail((data) => {
      this.detail = data
    }, {id})
    apiGoods.getPath((data) => {
      this.path = data
    }, {id})
    apiGoods.getSpecification((data) => {
      console.log(data)
    }, {id})
  }
}
</script>

<style lang="stylus">
.detail-wrap
  .el-breadcrumb__inner
    a
      color #2475e2
  .info-wrap
    .el-input-number__increase
      background-color #2475e2
      color #ffffff
      border-radius 0 2px 2px 0
    .el-input__inner
      border 1px solid #2475e2
    .info-item.type
      .el-button
        padding 8px 20px
        margin-left 10px
  .other-wrap
    .right
      img
        width 100%
</style>

<style lang="stylus" scoped>
.detail-wrap
  width 1300px
  padding-bottom 40px
  margin 0 auto
  .breadcrumb
    height 54px
    box-sizing border-box
    padding-top 20px
  .other-wrap
    padding-top 22px
    .left
      width 388px
      float left
    .right
      float left
      width 910px
      border 1px solid #dedede
      min-height 300px
      .title
        font-size 18px
        color #2475e2
        font-weight 600
        margin 10px 0 20px 10px
        padding-left 10px
        border-left 4px solid #ff8b1f
  .preview-wrap
    padding 10px
    border 1px solid #dedede
    .icon
      font-family 'jzdc'
      margin-right 10px
    .look-at
      width 380px
      margin-right 20px
      float left
      .big
        width 100%
        height 380px
        border 1px solid #dedede
        img
          background-color #dedede
      .small-wrap
        margin-top 20px
        width 380px
        height 70px
        overflow hidden
        .super-wrap
          width 5000px
          overflow hidden
        .small-list
          width 310px
          margin 0 auto
          overflow hidden
          .small-item
            width 70px
            height 70px
            float left
            border 1px solid #2475e2
            margin-right 9px
            img
              width 100%
              height 100%
    .info-wrap
      float left
      color #666666
      width 868px
      .info-item
        margin-bottom 30px
        color #666666
        font-size 16px
        .name
          width 100px
          display inline-block
      .title
        color #333333
        font-size 18px
        font-weight 600
        padding-left 20px
        margin-bottom 18px
      .label
        background-color #ffe7d1
        font-size 16px
        padding 0 20px
        height 40px
        font-weight 500
        margin-bottom 30px
        width 100%
        span
          line-height 40px
          display block
          height 40px
          float left
        .money
          color #ff0000
          font-size 30px
          font-weight 600
          padding-left 60px
          padding-right 10px
        .uni
          /*line-height 30px*/
</style>
