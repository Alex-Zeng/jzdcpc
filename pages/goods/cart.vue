<template>
  <div>
    <indexHeader></indexHeader>
    <div class="cart-wrap">
      <div class="breadcrumb" separator=">">
        <el-breadcrumb>
          <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item to="/goods/cart">采购清单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="title-bar">
        <ul class="clearfix">
          <li class="item" style="width: 155px;padding-left: 20px;">
            <el-checkbox>全选</el-checkbox>
          </li>
          <li class="item" style="width:325px;">商品信息</li>
          <li class="item" style="width: 186px;">单价（元）</li>
          <li class="item" style="width: 138px; text-align: center;">数量</li>
          <li class="item" style="width: 280px; text-align: center;">金额（元）</li>
          <li class="item" style="width: 210px;text-align: center;">操作</li>
        </ul>
      </div>
      <div v-for="(i, k) in list" :key="'cart'+k">
        <div class="company-bar">
          <el-checkbox>{{i.supplierName}}</el-checkbox>
        </div>
        <div class="goods-list" v-for="(item, key) in i.list" :key="'cart-item'+key">
          <ul class="clearfix">
            <li class="item" style="width: 155px;padding-left: 20px;">
              <el-checkbox>
              </el-checkbox>
              <div class="img">
                <img :src="item.icon" width="75px" height="75px" alt="">
              </div>
            </li>
            <li class="item info" style="width:325px;">
              <span class="title">{{item.title}}</span>
              <span>{{item.specificationsInfo}}</span>
            </li>
            <li class="item" style="width: 186px;">{{item.price}}</li>
            <li class="item" style="width: 138px;">
              <el-input-number style="width: 138px;" v-model="item.quantity" :min="1"></el-input-number>
            </li>
            <li class="item" style="width: 280px; text-align: center;">{{(item.quantity*item.price).toFixed(2)}}</li>
            <li class="item" style="width: 210px;text-align: center;">操作</li>
          </ul>
        </div>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '../../components/index/header'
import indexFooter from '../../components/index/footer'
import apiMallCart from '../../api/apiMallCart'
export default {
  name: 'cart',
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
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    try {
      apiMallCart.getMallCart((data) => {
        this.list = data
      }, {})
    } catch (e) {
      console.log('test')
    } finally {
      loading.close()
    }
  }
}
</script>

<style lang="stylus">
.cart-wrap
  .el-breadcrumb__inner
    a
      color #2475e2
  .el-checkbox
    float left
</style>

<style lang="stylus" scoped>
.cart-wrap
  width 1300px
  margin 0 auto
  padding-bottom 114px
  .breadcrumb
    height 54px
    box-sizing border-box
    padding-top 20px
  .title-bar
    border 1px solid #dddddd
    background-color #fff
    height 40px
    line-height 40px
    color #333333
    font-size 14px
    .item
      float left
  .company-bar
    padding-left 20px
    height 60px
    line-height 60px
  .goods-list
    border 1px solid #dddddd
    background-color #fff
    height 100px
    line-height 100px
    color #333333
    font-size 14px
    &+.goods-list
      border-top none
    .item
      float left
      height 60px
      .img
        display inline-block
        padding-top 12px
        padding-left 20px
      &.info
        padding-top 28px
        .title
          font-size 16px
          color #333333
        span
          display block
          height 20px
          line-height 20px
          font-size 14px
          color #999
</style>
