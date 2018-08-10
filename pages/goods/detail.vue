<template>
  <div style="background-color: #fff;">
    <indexHeader bg="#fff"></indexHeader>
    <div class="detail-wrap">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(i, key) in path" :key="'path' + i.id"><nuxt-link :to='`/goods/search/%7B"type":0,"cateId":${i.id},${getSearchLink(path, key)}%7D`'>{{i.name}}</nuxt-link></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="preview-wrap clearfix">
        <div class="look-at">
          <div class="big">
            <PicZoom :url="detail.imgList && detail.imgList[select].img" :scale="2" :scroll="true" v-if="detail.imgList && detail.imgList[select].img"></PicZoom>
            <img width="100%" height="100%" :src="detail.imgList && detail.imgList[select].img" alt="" v-else>
          </div>
          <div class="small-wrap">
            <i class="prev" @click="changeImg(false)">&#xe67d;</i>
            <div class="small-list">
              <div class="super-wrap" :style="{'margin-left':offset*80+'px'}">
                <div :class="{'small-item': true, active: select == k}" v-for="(i, k) in detail.imgList" :key="k" @click="select=k">
                  <img :src="i.img" alt="">
                </div>
              </div>
            </div>
            <i class="next" @click="changeImg(true)">&#xe678;</i>
          </div>
        </div>
        <div class="info-wrap">
          <div class="title">{{detail.title}}</div>
          <div class="label">
            <span>单价</span>
            <span class="money">¥{{stdPrice|| ((detail.min_price||0)+ '-' + (detail.max_price||0))}}</span>
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
            <div style="float: left; width: 768px;margin-left: -10px;margin-top: -10px;" v-if="k==0">
              <el-button style="margin-top: 10px;" :type="choose[k] == item.color_id? 'primary': ''" v-for="(item, index) in i.list" :key="index" @click="chooseFunc(k, item.color_id)">{{item.color_name}}</el-button>
            </div>
            <div style="float: left; width: 768px;margin-left: -10px;margin-top: -10px;" v-if="k==1">
              <el-button style="margin-top: 10px;" :type="choose[k] == item.option_id? 'primary': ''" v-for="(item, index) in i.list" :key="index" @click="chooseFunc(k, item.option_id)">{{item.option_name}}</el-button>
            </div>
          </div>
          <div class="label" style="margin-bottom: 20px;" v-if="spec.no && spec.name" v-loading="specLoading">
            <span class="grey"><span>物料编号：{{spec.no}}</span><span style="text-indent: 40px;">物料规格：{{spec.name}}</span></span>
          </div>

          <el-button type="primary" style="width: 240px;margin-left: 20px;" v-show="!(group == 5)" @click="addToCart"><i class="icon">&#xe617;</i>加入购物车</el-button>
        </div>
      </div>
      <div class="other-wrap clearfix">
        <div class="left">
          <img src="~assets/img/goods/detail-hot.png" alt="">
          <div class="hot-list">
            <a class="hot-item" :href="'/goods/detail/'+i.id" v-for="(i, k) in hotCur" :key="'hot'+k">
              <img :src="i.icon" alt="">
            </a>
          </div>
          <div class="hot-pager clearfix">
            <i class="icon icon-left" @click="changeHot(false)">&#xe67d;</i>
            <i class="icon icon-right" @click="changeHot(true)">&#xe678;</i>
          </div>
        </div>
        <div class="right">
          <div class="title">商品详情</div>
          <div v-html="detail.detail" style="padding: 0 28px 28px;"></div>
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
import apiMallCart from '../../api/apiMallCart'
import PicZoom from '../../components/PicZoom'

export default {
  name: 'detail',
  components: {
    indexHeader,
    indexFooter,
    PicZoom
  },
  computed: {
    group () {
      if (this.$store.getters.loggedUser) {
        return this.$store.getters.loggedUser.group
      }
      return -1
    }
  },
  data () {
    return {
      offset: 0,
      detail: {},
      count: 1,
      select: 0,
      path: [],
      spec: {},
      specLoading: false,
      choose: [0, 0],
      hot: [],
      hotCur: [],
      hotPage: 0,
      stdPrice: null,
      zoom: {x: 0, y: 0}
    }
  },
  methods: {
    getSearchLink (path, key) {
      if (key == 0) {
        return '"selectId":' + path[key].id
      }
      if (key == 1) {
        return '"selectId":' + path[0].id + ',"childId":' + path[key].id
      }
      if (key == 2) {
        return '"selectId":' + path[0].id + ',"childId":' + path[1].id + ',"scId":' + path[key].id
      }
    },
    chooseFunc (k, index) {
      const {params: {id}} = this.$route
      this.$set(this.choose, k, index)
      const colorId = this.choose[0]
      const optionId = this.choose[1]
      this.detail.standardPrice.forEach((i) => {
        if (colorId == i.color_id) {
          if (optionId == i.option_id) {
            this.stdPrice = i.price
          }
        }
      })
      apiGoods.getSpecification((data) => {
        this.spec = data
      }, {goodsId: id, colorId, optionId})
    },
    getHot () {
      const {params: {id}} = this.$route
      apiGoods.getSupplierHot((data) => {
        this.hot = data
        if (data.length > 3) {
          this.hotCur = data.slice(0, 3)
          this.hotPage = 0
        } else {
          this.hotCur = data
        }
      }, {id})
    },
    changeHot (isNext) {
      const page = this.hotPage
      if (isNext) {
        if ((page + 1) * 3 >= this.hot.length) {
          return
        }
        this.hotPage += 1
        this.hotCur = this.hot.slice(this.hotPage * 3, this.hotPage * 3 + 3)
      } else {
        if ((page - 1) < 0) {
          return
        }
        this.hotPage -= 1
        this.hotCur = this.hot.slice(this.hotPage * 3, this.hotPage * 3 + 3)
      }
    },
    changeImg (isNext) {
      if (isNext) {
        if (this.offset * -1 < (this.detail.imgList.length - 4)) {
          this.offset -= 1
        }
        console.log(this.offset)
      } else {
        if (this.offset >= 0) {
          return
        }
        this.offset += 1
      }
    },
    addToCart () {
      const {params: {id}} = this.$route
      const colorId = this.choose[0]
      const optionId = this.choose[1]
      const number = this.count
      try {
        apiMallCart.add((data) => {
          const {msg, status} = data
          if (status == 0) {
            this.$message(
              {
                type: 'success',
                message: msg
              }
            )
          } else {
            if (msg == '没有权限操作') {
              this.$message.error('请先进行企业认证')
              this.$router.push('/user/setting/cert')
            } else {
              this.$message.error(msg)
            }
          }
        }, {id, colorId, optionId, number})
      } catch (e) {
        this.$message.error('网络开小差，请稍后重试')
      }
    }
  },
  mounted () {
    const {params: {id}} = this.$route
    this.specLoading = true
    this.getHot()
    apiGoods.getGoodsDetail((data) => {
      this.specLoading = false
      this.detail = data
    }, {id})
    apiGoods.getPath((data) => {
      this.path = data
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
      &:hover
        background rgb(80, 145, 232)
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
      padding-left 48px
      .hot-list
        width 220px
        margin 0 auto
        .hot-item
          width 220px
          height 220px
          margin-top 20px
          display block
          img
            width 220px
            height 220px
      .hot-pager
        width 220px
        margin 20px auto 0
        .icon
          font-size 20px
          font-weight 600
          color #2475e2
          font-family 'jzdc'
          cursor pointer
        .icon-left
          float left
        .icon-right
          float right
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
        position relative
        cursor move
        img
          background-color #dedede
      .small-wrap
        margin-top 20px
        width 380px
        height 70px
        overflow hidden
        position relative
        .prev
          font-family 'jzdc'
          font-size 26px
          left 0
          top 50%
          margin-top -14px
          position absolute
          color #2475e2
          cursor pointer
        .next
          font-family 'jzdc'
          font-size 26px
          position absolute
          color #2475e2
          right 0
          top 50%
          margin-top -14px
          cursor pointer
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
            margin-right 9px
            &.active
              border 1px solid #2475e2
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
