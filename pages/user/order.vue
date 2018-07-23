<template>
  <div class="order-wrap">
    <div class="search-wrap">
      <el-form ref="searchForm" :inline="true">
        <el-form-item>
          <el-input placeholder="订单关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary">导出结果</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-wrap">
      <div class="title">
        <div class="item order-info">订单信息</div>
        <div class="item source">供应商</div>
        <div class="item addr">收货人</div>
        <div class="item status">订单状态</div>
        <div class="item action">操作</div>
      </div>

      <div class="table" v-for="order in orders" :key="order.id">
        <div class="title clearfix">
          <div class="item order-info"><span>订单号：</span>订单信息</div>
          <div class="item source">供应商</div>
          <div class="item addr">收货人</div>
          <div class="item status">{{getStateTitle(order.state)}}</div>
          <div class="item action"><span>总额：</span>¥1000</div>
        </div>
        <div class="data clearfix" v-for="item in (order.goods)" :key="order.id + item.id">
          <div class="item order-info">
            <div class="img">
              <img :src="item.icon" alt="">
            </div>
            <div class="info">
              <div class="md">
                <div class="goods-title">{{item.title}}</div>
                <div class="goods-info">{{item.specifications_name}}</div>
              </div>
            </div>
          </div>
          <div class="item source">{{order.supplier || '无'}}</div>
          <div class="item addr">{{order.receiver_name}}</div>
          <div class="item status">{{getStateTitle(order.state)}}</div>
          <div class="item action">
            <div class="info">
              <el-button class="order-button" type="primary" v-show="order.state == 3">确定发货</el-button>
              <el-button class="order-button" type="primary" v-show="order.state == 6">确定发货</el-button>
              <el-button class="order-button" type="primary" v-show="order.state !== 3 && order.state !== 6">查看详情</el-button>
              <el-button class="order-button text" type="text" v-show="order.state == 1">取消交易</el-button>
              <!-- <el-button class="order-button text" type="text">售后申请</el-button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="pager">
        <el-pagination
          background
          :total="total"
          :page-size="10"
          :current-page="pageNumber"
          @current-change="getList"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const pageSize = 10
export default {
  name: 'order',
  computed: {
    orders () {
      return this.$store.getters.orderList
    },
    total () {
      return this.$store.getters.orderTotal
    }
  },
  watch: {
    '$route': function () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const {params: {type, page}} = this.$route
      this.pageNumber = Number(page)
      this.$store.dispatch('getOrderList', {
        data: {
          status: type,
          pageNumber: this.pageNumber,
          pageSize
        },
        cb: () => {
          loading.close()
        }
      })
    }
  },
  mounted () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const {params: {type, page}} = this.$route
    this.pageNumber = Number(page)
    this.$store.dispatch('getOrderList', {
      data: {
        status: type,
        pageNumber: this.pageNumber,
        pageSize
      },
      cb: () => {
        loading.close()
      }
    })
  },
  data () {
    return {
      // type: 'all',
      pageNumber: 1
    }
  },
  methods: {
    getList (page) {
      const {params: {type}} = this.$route
      this.$router.push(`/user/order/${type}/${page}`)
    },
    getStateTitle (state) {
      switch (state) {
        case 0:
          return '待核价'
        case 1:
          return '待签约'
        case 2:
          return '待采购商打款'
        case 3:
          return '待发货'
        case 4:
          return '订单关闭'
        case 6:
          return '待收货'
        case 7:
          return '待质检'
        case 8:
          return '问题确认中'
        case 9:
          return '账期中'
        case 10:
          return '逾期中'
        case 11:
          return '待打款至供应商'
        case 13:
          return '交易完成'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .order-button
    width 120px
    height 38px
    margin 0 auto
    &.text
      color #737373
  .order-wrap
    padding 40px
  .result-wrap
    margin auto
    .title
      height 48px
      background-color #2fbeed
      line-height 48px
      padding-left 20px
      margin-bottom 20px
    .item
        float left
        font-size 18px
        color #ffffff
        overflow hidden
    .table
      margin-bottom 20px
      .title
        height 40px
        border 1px solid #cccccc
        background-color #ffffff
        line-height 40px
        margin-bottom 0
        border-bottom none
        .item
          color #2fbeed
          span
            color: #737373
    .data
      border 1px solid #cccccc
      padding 20px 0 20px 20px
      .item
        color #737373
      .source
        line-height 120px
        height 120px
      .addr
        line-height 120px
        height 120px
      .status
        line-height 120px
        height 120px
      .action
        text-align center
      .img
        height 120px
        width 148px
        overflow hidden
        float left
        img
          width 100%
          height 100%
      .info
        padding-left 20px
        height 120px
        color #737373
        position relative
        display flex
        justify-content center
        flex-direction column
        .md
          .goods-title
            font-size 20px
            line-height 1.8
          .goods-info
            color #999999
            font-size 16px
    .order-info
        width 32%
    .source
        width 19%
        text-align center
    .addr
        width 18%
        text-align center
    .status
        width 12%
        text-align center
    .action
        width 19%
        text-align center

</style>
