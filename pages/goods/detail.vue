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
          <div class="title">
            {{detail.title}}
            <div class="collect">
              <div style="color: #666666" v-if="!(detail.isFavorite)" @click.stop="favorite($route.params.id, detail.isFavorite)">
                <i class="star">&#xe60f;</i>
                <span>收藏</span>
              </div>
              <div v-else @click.stop="favoriteDelete($route.params.id, detail.isFavorite)">
                <i style="color: #ff7900" class="star">&#xe60f;</i>
                <span>已收藏</span>
              </div>
            </div>
          </div>
          <div class="label">
            <span>单价</span>
            <span class="money" v-if="detail.isDiscussPrice">议价</span>
            <template v-else>
              <span class="money" v-if="specificationsTarget.specPrice">
                {{specificationsTarget.isDiscussPrice?'议价':specificationsTarget.specPrice}}
              </span>
              <span class="money" v-else>{{detail.showPrice}}</span>
              <span class="uni">元<template v-if="specificationsTarget.specUnit">/{{specificationsTarget.specUnit}}</template></span>
            </template>
            <a href="tencent://message/?uin=3510294139&Site=在线QQ&Menu=yes" style="display: inline-block;padding-top: 4px;padding-left: 10px;">
              <img src="@/assets/img/goods/qq@2x.png" alt="">
            </a>
          </div>
          <div class="info-item">
            <span class="name">供应商：</span>
            <span v-if="user">{{detail.companyName}}</span>
            <span v-if="!user">供应商名称，
              <span class="text-blue" @click="$router.push('/auth/login')">登录</span>
              后可查看</span>
          </div>
          <div class="info-item">
            <span class="name">采购数量：</span><el-input-number v-model="count" :min="number"></el-input-number>
          </div>
          <div class="info-item">
            <span class="name">计量单位：</span>
            <span v-if="specificationsTarget.specUnit">{{specificationsTarget.specUnit}}</span>
          </div>
          <div class="info-item type clearfix" v-for="(i, k) in detail.specAttrs" :key="i.id">
            <span class="name" style="float: left;">{{i.specAttrKey}}：</span>
            <div style="float: left; width: 768px;margin-left: -10px;margin-top: -10px;">
              <el-button style="margin-top: 10px;" v-for="(item, index) in i.specAttrVals" :key="index" :class="{active: iscur[k].index == index,disable: item.disable}" @click="chooseFunc(k, index, item.specAttrValId, item.disable, item.isCustom)">{{item.specAttrVal}}</el-button>
            </div>
            <!--<div style="float: left; width: 768px;margin-left: -10px;margin-top: -10px;" v-if="k==1">
              <el-button style="margin-top: 10px;" :type="choose[k] == item.option_id? 'primary': ''" v-for="(item, index) in i.list" :key="index" @click="chooseFunc(k, item.option_id)">{{item.option_name}}</el-button>
            </div>-->
          </div>
          <!--<div class="label" style="margin-bottom: 20px;" v-if="spec.no && spec.name" v-loading="specLoading">
            <span class="grey"><span>物料编号：{{spec.no}}</span><span style="text-indent: 40px;">物料规格：{{spec.name}}</span></span>
          </div>-->
          <div class="info-item"  v-if="specificationsTarget.skuCode">
            <span class="name" v-if="specificationsTarget.skuCode">SKU编码：</span>
            <span style="min-width: 200px;display: inline-block;">{{specificationsTarget.skuCode}}</span>
            <span class="text-blue" @click="editorMethods">{{editor?'保存': '编辑物料'}}</span>
          </div>
          <div class="label" style="margin-bottom: 20px;"  v-if="specificationsTarget.skuCode" v-loading="specLoading">
            <span class="grey">
              <span>
                物料编号：<b v-show="!editor">{{specificationsTarget.materialCode}}</b>
                <label v-show="editor">
                  <el-input v-model="specificationsTarget.materialCode" size="small" placeholder="请输入内容"></el-input>
                </label>
              </span>
              <span style="padding-left: 40px;">
                物料规格：<b v-show="!editor">{{specificationsTarget.materialSpec}}</b>
                <label v-show="editor">
                  <el-input v-model="specificationsTarget.materialSpec" size="small" placeholder="请输入内容"></el-input>
                </label>
              </span>
            </span>
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
    },
    user () {
      return this.$store.getters.loggedUser
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
      choose: [null, null, null],
      hot: [],
      hotCur: [],
      hotPage: 0,
      stdPrice: null,
      zoom: {x: 0, y: 0},
      editor: false,
      chooseEditor: false,
      number: 1,
      specificationsTarget: {},
      newi: null,
      newi1: null,
      newi2: null,
      arr: [],
      arr1: [],
      iscur: [
        {
          index: null
        },
        {
          index: null
        },
        {
          index: null
        },
        {
          index: null
        },
        {
          index: null
        },
        {
          index: null
        }
      ]
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
    chooseFunc (k, index, specAttrValId, disable, isCustom) {
      this.getSelectedItem(k, index, specAttrValId, disable, isCustom)
      this.getPrice(k, specAttrValId, isCustom)
    },
    /**
     * 获取当前选中的属性
     */
    getSelectedItem (i, index, id, disable, isCustom) {
      let that = disable
      this.detail.specAttrs.forEach((item3, index3) => {
        item3.specAttrVals.forEach((item4, index4) => {
          if (item4.specAttrValId === id) {
            this.$set(item4, 'disable', false)
            this.iscur[i].index = index
          } else {
            if (isCustom === 1) {
              this.$set(item4, 'disable', true)
            } else {
              if (that === true) {
                this.arr1 = []
                this.arr = new Array(this.detail.specAttrs.length).fill(null)
                this.iscur = [{index: null}, {index: null}, {index: null}, {index: null}, {index: null}, {index: null}]
                this.iscur[i].index = index
              }
              if (this.arr1.length > 0) {
                if (this.arr1.includes(item4.specAttrValId)) {
                  this.$set(item4, 'disable', false)
                } else {
                  this.$set(item4, 'disable', true)
                }
              } else {
                this.$set(item4, 'disable', true)
              }
            }
          }
        })
      })
      this.updateStatus(i, id)
    },
    /**
     * 更新所有属性状态
     */
    updateStatus (i, id) {
      this.detail.specifications.forEach((item) => {
        if (item.specAttrs.indexOf(id) > -1) {
          item.specAttrs.forEach((item2, index2) => {
            if (item2 !== id) {
              this.detail.specAttrs.forEach((item3, index3) => {
                item3.specAttrVals.forEach((item4, index4) => {
                  if (item4.specAttrValId === item2) {
                    this.arr.fill(item2, i, i + 1)
                    this.$set(item4, 'disable', false)
                  }
                })
              })
            }
          })
        }
      })
    },
    getPrice (i, id, isCustom) {
      if (isCustom === 1) {
        this.detail.specifications.forEach((item) => {
          if (item.specAttrs.indexOf(0) > -1) {
            this.specificationsTarget = item
          }
        })
      } else {
        this.arr.fill(id, i, i + 1)
        let newArr = []
        for (var j = 0; j < this.arr.length; j++) {
          if (this.arr[j] == null || this.arr[j] == '' || typeof (this.arr[j]) == 'undefined') {
          } else {
            newArr.push(this.arr[j])
          }
        }
        this.specificationsTarget = {}
        this.detail.specifications.forEach((item) => {
          if (item.specAttrs.toString() === newArr.toString()) {
            this.specificationsTarget = item
          }
          /* if (item.specAttrs.indexOf(this.arr[0]) > -1 && item.specAttrs.length === 1) {
            this.specificationsTarget = item
          }
          if (item.specAttrs.indexOf(this.arr[0]) > -1 && item.specAttrs.indexOf(this.arr[1]) > -1 && item.specAttrs.length === 2) {
            this.specificationsTarget = item
          }
          if (item.specAttrs.indexOf(this.arr[0]) > -1 && item.specAttrs.indexOf(this.arr[1]) > -1 && item.specAttrs.indexOf(this.arr[2]) > -1 && item.specAttrs.length === 3) {
            this.specificationsTarget = item
          } */
        })
      }
      if (this.specificationsTarget.moq) {
        this.number = Number(this.specificationsTarget.moq)
        this.count = Number(this.specificationsTarget.moq)
      } else {
        this.number = 1
        this.count = 1
      }
      this.changeNum(this.count)
    },
    changeNum (val) {
      console.log(val)
      console.log(this.specificationsTarget.specPriceDetails)
      if (this.specificationsTarget.specPriceDetails) {
        this.specificationsTarget.specPriceDetails.forEach((item) => {
          if (item.minOrderQty <= val && item.maxOrderQty >= val) {
            console.log('chang')
            this.specificationsTarget.specPrice = item.price
          }
        })
      }
    },
    addSpecification () {
      const {specId, materialCode, materialSpec} = this.specificationsTarget
      if (materialCode === '' || materialSpec === '') {
        this.editor = true
        this.$message.error('请填写物料编号和物料规格')
      } else {
        apiGoods.addSpecification((data) => {
          const {status, msg} = data
          if (status === 0) {
            this.$message({
              type: 'success',
              message: msg
            })
          }
        }, {specId, materialCode, materialSpec})
      }
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
      } else {
        if (this.offset >= 0) {
          return
        }
        this.offset += 1
      }
    },
    addToCart () {
      const {params: {id}} = this.$route
      const specId = this.specificationsTarget.specId
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
            this.$store.dispatch('getCartNum')
          } else {
            if (status == 1) {
              if (this.group != 4) {
                this.$message.error('请先进行企业认证')
                this.$router.push('/user/setting/cert')
              } else {
                this.$message.error(msg)
              }
            } else {
              this.$message.error(msg)
            }
          }
        }, {id, specId, number})
      } catch (e) {
        this.$message.error('网络开小差，请稍后重试')
      }
    },
    favorite (goodsId) {
      this.$store.dispatch('addFavorite', {fileds: {goodsId},
        scb: (msg) => {
          this.$message({
            type: 'success',
            message: msg
          })
          this.detail.isFavorite = 1
        },
        ecb: (msg) => {
          this.$message.error(msg)
        }
      })
    },
    favoriteDelete (id) {
      this.$confirm('此操作将永久删除该收藏记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '删除中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$store.dispatch('deleteFavorite', {
          fileds: {goodsId: id},
          successCb: (msg) => {
            this.$message({
              type: 'success',
              message: msg
            })
            loading.close()
            this.detail.isFavorite = 0
          },
          errorCb: (msg) => {
            this.$message.error(msg)
            loading.close()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editorMethods () {
      this.editor = !this.editor
      if (!this.editor) {
        this.addSpecification()
      }
    }
  },
  mounted () {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    })
    const {params: {id}} = this.$route
    this.specLoading = true
    this.getHot()
    apiGoods.getGoodsDetail((data) => {
      this.specLoading = false
      this.detail = data
      this.detail.detail = this.detail.detail.replace(/embed/, 'video')
      setTimeout(function () {
        console.log(document.getElementsByTagName('video')[0])
        document.getElementsByTagName('video')[0].setAttribute('muted', 'muted')
        document.getElementsByTagName('video')[0].setAttribute('controls', 'controls')
        document.getElementsByTagName('video')[0].setAttribute('autoplay', 'autoplay')
      }, 2000)
      this.arr = new Array(data.specAttrs.length).fill(null)
    }, {id})
    apiGoods.getPath((data) => {
      this.path = data
    }, {id})
  },
  watch: {
    count (val) {
      this.changeNum(val)
    }
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
        border-radius 0 2px 2px 0
      .el-input__inner
        border 1px solid #2475e2
      .info-item.type
        .el-button
          padding 8px 20px
          margin-left 10px
        .active
          color #fff
          background-color #2475E2
          border-color #2475E2
          &.disable
            border-style dashed
            color #dcdfe6
            background-color #fff
            border-color #dcdfe6
        .disable
          border-style dashed
          color #dcdfe6
    .other-wrap
      .right
        img
          width 100%
</style>

<style lang="stylus" scoped>
  .text-blue
    cursor pointer
    color #2475E2
  .star
    font-family 'jzdc'
    cursor pointer
    font-size 20px
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
          height 22px
          color #333333
          font-size 18px
          font-weight 600
          padding-left 20px
          margin-bottom 18px
          .collect
            float right
            font-size 16px
            width 150px
            height 32px
            line-height 32px
            background rgba(245,245,245,1)
            border-radius 5px
            text-align center
        .label
          background-color #ffe7d1
          font-size 16px
          padding 0 20px
          height 40px
          font-weight 500
          margin-bottom 30px
          width 100%
          label
            width 180px
            display inline-block
            .el-input--small
              font-size 16px
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
</style>
