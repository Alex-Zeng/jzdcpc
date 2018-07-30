<template>
  <div>
    <indexHeader></indexHeader>
    <div class="order-wrap">
      <div class="title">确定订单</div>
      <div class="sub-title clearfix">
        <span class="num">1</span>
        <span class="text">选择收货地址</span>
      </div>
      <div class="address-wrap">
        <div :class="{'addr-list':true, 'clearfix': true, all: addressAll}">
          <div :class="{'addr-item': true, 'select': i.id === select}" v-for="i in addressList" :key="i.id" @click="select = i.id">
            <div class="addr-header">
              {{i.areaName}} <el-tag v-show="i.tag">{{i.tag}}</el-tag>
              <span class="name">{{i.name}}</span>
            </div>
            <div class="addr-body">
              <div>联系方式：{{i.phone}}</div>
              <div class="detail">详细地址：{{i.detail}}</div>
            </div>
            <div class="addr-footer clearfix">
              <el-radio :label="i.id" v-model="defaultAddr" v-if="defaultAddr === i.id" style="float: left;">默认地址</el-radio>
              <div class="action">
                <i style="margin-right: 8px;" @click="editOpen(i, true)">&#xe601;</i>
                <i @click="remove(i.id)">&#xe61d;</i>
              </div>
            </div>
          </div>
          <nuxt-link to="/user/setting/address" class="addr-item">
            <div class="addr-new">
              +
            </div>
          </nuxt-link>
          <i class="drop" @click="addressAll = true" v-if="!addressAll">&#xe6d7;</i>
          <i class="close" @click="addressAll = false" v-if="addressAll">&#xe6d7;</i>
        </div>
      </div>
      <div class="sub-title clearfix">
        <span class="num">2</span>
        <span class="text">确认商品信息</span>
      </div>
      <div class="goods-list" v-for="(i, k) in cartList" :key="'cart'+k">
        <ul class="title-bar clearfix">
          <li class="item" style="width: 376px;">商品信息</li>
          <li class="item" style="width: 76px;">计量单位</li>
          <li class="item" style="width: 150px;">数量</li>
          <li class="item" style="width: 250px;">单价（元）</li>
          <li class="item" style="width: 220px;">小计（元）</li>
          <li class="item" style="width: 224px;">操作</li>
        </ul>
        <div class="sub-title-bar clearfix">
          <div class="left"><i class="icon">&#xe602;</i>{{i.supplierName}}</div>
          <div class="right">期望交货日期：
            <el-date-picker type="date" placeholder="与实际交货日期可能存在偏差" v-model="i.date" style="width: 248px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
        <div class="goods-wrap" v-for="(item, key) in i.list" :key="'goods'+key">
          <ul class="goods-bar clearfix">
            <li class="item" style="width: 452px;padding-left: 54px;">
              <img width="110" height="110" :src="item.icon" alt="" style="float: left;">
              <div class="info">
                <div class="info-title">{{item.title}}</div>
                <div class="small">
                  <div class="info-detail">{{item.specificationsInfo}}</div>
                  <span class="uni">{{item.unit}}</span>
                </div>
              </div>
            </li>
            <div class="item">
              <div class="clearfix">
                <li class="item info-item" style="width: 150px;">
                  {{item.quantity}}
                </li>
                <li class="item info-item" style="width: 250px;">
                  {{item.price}}
                </li>
                <li class="item info-item" style="width: 220px;">
                  {{(item.quantity * item.price).toFixed(2)}}
                </li>
                <li class="item info-item" style="width: 224px;">
                  &nbsp;
                </li>
              </div>
              <div style="margin-left: -266px;" class="clearfix">
                <div class="edit-item" style="width: 368px;">
                  <span class="label">物料编号：</span>
                  <el-input style="width: 240px;display: inline-block;" v-model="item.no" :disabled="!editArr[k][key]"></el-input>
                </div>
                <div class="edit-item" style="width: 568px;">
                  <span class="label">物料规格：</span>
                  <el-input style="width: 440px;display: inline-block;" v-model="item.requirement" :disabled="!editArr[k][key]"></el-input>
                </div>
                <div class="edi-item" style="padding-top: 20px;">
                  <el-button v-if="!editArr[k][key]" @click="toEdit(k, key, true)">编辑物料</el-button>
                  <el-button v-else type="primary" @click="toEdit(k, key, false)">完成编辑</el-button>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div class="remark-wrap">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="若您有什么需要，可在此留言"
            v-model="i.remark">
          </el-input>
        </div>
      </div>
      <div class="submit-wrap clearfix">
        <span class="total" style="float: left;">
          总额（元）: <b>{{total.toFixed(2)}}</b>
        </span>
        <el-button type="primary" style="float: right;width: 200px;" @click="makeOrder">提交订单</el-button>
      </div>
    </div>
    <div class="main-AD">
      <div class="item">
        <img src="~assets/img/index/cgfx.png" alt="">
        <span>采购放心</span>
      </div>
      <div class="item">
        <img src="~assets/img/index/wyjl.png" alt="">
        <span>物优价廉</span>
      </div>
      <div class="item">
        <img src="~assets/img/index/pzbz.png" alt="">
        <span>品质保障</span>
      </div>
      <div class="item">
        <img src="~assets/img/index/fwtx.png" alt="">
        <span>服务贴心</span>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '../../components/index/header'
import indexFooter from '../../components/index/footer'
import apiAddress from '../../api/apiAddress'
import apiOrders from '../../api/apiOrders'
export default {
  name: 'cart',
  components: {
    indexFooter,
    indexHeader
  },
  data () {
    return {
      addressList: [],
      cartList: [],
      select: -1,
      addressAll: false,
      defaultAddr: -1,
      editArr: [],
      total: 0
    }
  },
  mounted () {
    this.getAddressList()
    this.getCartList()
  },
  methods: {
    makeOrder () {
      const receiverId = this.select
      const channel = 0
      const detail = JSON.stringify(this.cartList)
      try {
        apiOrders.make((result) => {
          const {status, msg, data} = result
          if (status !== 0) {
            this.$message.error(msg)
          } else {
            this.$message({
              type: 'success',
              message: msg
            })
            sessionStorage.removeItem('carts')
            sessionStorage.setItem('orderResult', JSON.stringify(data))
            setTimeout(() => {
              this.$router.replace('/goods/result')
            })
          }
        }, {receiverId, channel, detail})
      } catch (e) {
        sessionStorage.setItem('carts', JSON.stringify(this.cartList))
        this.$message.error('网络有点问题，请刷新后重试')
      }
    },
    toEdit (k, key, v) {
      let temp = this.editArr[k]
      temp[key] = v
      this.$set(this.editArr, k, temp)
    },
    async getAddressList () {
      await apiAddress.getAddressList(
        ({list}) => {
          this.addressList = list
          list.forEach((i) => {
            if (i.is_default) {
              this.select = i.id
              this.defaultAddr = i.id
            }
          })
        }
      )
    },
    getCartList () {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        const cart = JSON.parse(sessionStorage.getItem('carts'))
        loading.close()
        this.editArr = []
        this.total = 0
        cart.forEach((i, key) => {
          if (!cart[key].date) {
            cart[key].date = ''
          }
          if (!cart[key].remark) {
            cart[key].remark = ''
          }
          this.editArr.push(new Array(i.list.length).fill(false))
          i.list.forEach((item) => {
            this.total += (item.price * item.quantity)
          })
        })
        this.cartList = cart
      }, 400)
    }
  }
}
</script>

<style lang="stylus" scoped>
.main-AD
  width 1300px
  margin 0 auto
  height 120px
  display flex
  justify-content space-between
  align-items center
  .item
    flex 1
    text-align center
    font-size 20px
    font-weight bold
    &:nth-child(1)
      color #2FBEED
    &:nth-child(2)
      color #FF7F00
    &:nth-child(3)
      color #00CCAA
    &:nth-child(4)
      color #7FBFFF
    & img
      display inline
      vertical-align middle
      margin-right 10px
.order-wrap
  width 1300px
  margin 0 auto
  .title
    font-size 16px
    color #333333
    font-weight 600
    margin 10px 0 20px 0
    padding-left 10px
    border-left 4px solid #ff8b1f
  .sub-title
    margin-bottom 20px
    span
      float left
    .num
      background-color #ff8b1f
      color #ffffff
      display: block
      width 18px
      height 18px
      line-height 18px
      text-align center
      border-radius 9px
      margin-right 10px
    .text
      color #666666
      font-size 16px
  .address-wrap
    border 1px solid #dedede
    background-color #fff
    padding 40px 59px 18px
    margin-bottom 22px
    .addr-list
      min-width 1332px
      height 200px
      overflow hidden
      position relative
      .drop
        display block
        font-family 'jzdc'
        color #ff8b1f
        font-size 18px
        position absolute
        bottom -1px
        left 50%
        margin-left -63px
        cursor pointer
      .close
        display block
        font-family 'jzdc'
        color #ff8b1f
        font-size 18px
        position absolute
        bottom -1px
        left 50%
        margin-left -63px
        transform rotate(180deg)
        cursor pointer
      &.all
        height auto
      .addr-item
        border 1px solid #dedede
        border-radius 4px
        margin-bottom 20px
        width 345px
        background-color #ffffff
        margin-right 72px
        float left
        .addr-new
          text-align center
          height 177px
          line-height 177px
          font-size 44px
          cursor pointer
        &:last-child
          margin-right 0
        &.select
          border 1px solid #2475e2
          .addr-header
            border-bottom 1px solid #2475e2
        .addr-header
          border-bottom 1px solid #dedede
          padding 12px
          height 49px
          font-size 14px
          .name
            float right
        .addr-body
          padding 12px
          font-size 14px
          .detail
            margin-top 4px
            height 19*3px
            overflow hidden
        .addr-footer
          padding 4px 12px
          color #ff7900
          .action
            font-family 'jzdc'
            float right
            i
              cursor pointer
              &:hover
                color: #2475e2
  .goods-list
    background-color #fff
    border 1px solid #dedede
    margin-bottom 20px
    .title-bar
      border-bottom 1px solid #dedede
      font-size 16px
      .item
        float left
        text-align center
        height 40px
        line-height 40px
    .sub-title-bar
      height 48px
      line-height 48px
      color #666666
      font-size 14px
      padding 0 20px
      border-bottom 1px solid #dedede
      .left
        float left
        .icon
          display inline-block
          margin-right 6px
          text-align center
          line-height 24px
          font-family 'jzdc'
          border-radius 12px
          width 24px
          height 24px
          color #ffffff
          background-color #ff7900
      .right
        float right
    .goods-wrap
      .goods-bar
        padding 20px 0 0
        border-bottom 1px solid #dedede
        .info-item
          text-align center
          padding-top 21px
          border-bottom 1px solid #dedede
          line-height 1.6
          padding-bottom 10px
        .edit-item
          height 78px
          line-height 78px
          float left
          .label
            font-size 14px
            color #666
        .item
          float left
          &>img
            float left
          .info
            font-size 16px
            float left
            margin-left 20px
            border-bottom 1px solid #dedede
            width 268px
            padding-bottom 10px
            .info-title
              color #333333
            .small
              font-size 14px
              .info-detail
                color #999999
                line-height 1.8
                float left
              .uni
                width 76px
                text-align center
                float right
    .remark-wrap
      padding 20px 60px
  .submit-wrap
    background-color #ededed
    font-size 18px
    line-height 40px
    padding 30px 20px
    margin-bottom 20px
    .total
      font-weight 600
      b
        color #ff0000
</style>

<style lang="stylus">
  .address-wrap
    .el-radio.is-checked
      .el-radio__inner
        border-color #ff7900
        background #ff7900
      .el-radio__label
        color #ff7900 !important
    .addr-header
      .el-tag
        height 24px
        line-height 22px
    .el-tag
      cursor pointer
      border-color #ff7900
      color #ff7900
      background-color #fff
      &.select
        background-color rgba(64, 158, 255, .5)
    .el-tag+.el-tag
      margin-left 6px
    .button-new-tag
      margin-left 10px
      height 32px
      line-height 30px
      padding-top 0
      padding-bottom 0
    .input-new-tag
      width 90px
      margin-left 10px
      vertical-align bottom
</style>
