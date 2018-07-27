<template>
  <div class="order-wrap">
    <div class="search-wrap">
      <el-form ref="searchForm" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="订单关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="showMore = !showMore">更多条件<i class="down-icon"></i></el-button>
        </el-form-item>
        <div class="more" v-show="showMore">
          <el-form-item label="采购商品：">
            <el-input v-model="searchForm.goodsName" placeholder="请输入采购的商品名称"></el-input>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="searchForm.status" placeholder="请选择订单状态">
              <el-option label="待核价" value="0"></el-option>
              <el-option label="待签约" value="1"></el-option>
              <el-option label="待采购商打款" value="2"></el-option>
              <el-option label="待发货" value="3"></el-option>
              <el-option label="订单关闭" value="4"></el-option>
              <el-option label="待收货" value="6"></el-option>
              <el-option label="待质检" value="7"></el-option>
              <el-option label="问题确认中" value="8"></el-option>
              <el-option label="账期中" value="9"></el-option>
              <el-option label="逾期中" value="10"></el-option>
              <el-option label="待打款至供应商" value="11"></el-option>
              <el-option label="交易完成" value="13"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购企业：">
            <el-input v-model="searchForm.userName" placeholder="请输入采购企业"></el-input>
          </el-form-item>
          <el-form-item label="活动时间：">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="选择时间" v-model="searchForm.date2" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
            <el-button type="primary">导出结果</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="result-wrap">
      <div class="table" v-for="order in orders" :key="order.id">
        <p class="time">{{order.orderDate}}</p>
          <div class="title clearfix">
            <div class="item order-info"><span>订单号：{{order.out_id}}</span></div>
            <div class="item source">{{order.companyName || '无'}}</div>
            <div class="item addr">{{order.receiver_name}}</div>
            <div class="item status">{{order.service_type === 1? '售后处理中': order.service_type === 2 && type === 6? '售后完成': getStateTitle(order.state, order.groupId)}}</div>
            <div class="item action"><span>总额：</span>¥{{order.money}}</div>
          </div>
        <div class="lists">
          <div class="lists-content">
            <div class="data" v-for="(item, key) in (order.goods)" :key="order.id + key">
              <div class="item order-info">
                <div class="img">
                  <img :src="item.icon" alt="">
                </div>
                <div class="info">
                  <div class="md">
                    <div class="goods-title">{{item.title}}</div>
                    <div class="goods-info">{{item.specifications_name}}</div>
                    <div class="goods-info">{{item.specifications_no}}</div>
                    <div class="goods-info">{{item.specifications_info}}</div>
                  </div>
                </div>
              </div>
              <div class="item source">数量：{{item.quantity}}</div>
              <div class="item addr">单价：{{item.price}}元</div>
              <div class="item status">小计：{{(item.quantity * item.price).toFixed(2)}}元</div>
            </div>
          </div>
          <div class="info info-btn">
            <el-button class="order-button" type="primary" style="width: 80px;padding-left: 0;padding-right: 0;margin-right: 8px;" @click="$router.push('/user/order-detail/'+order.out_id+'/'+type)">查看详情</el-button>
            <el-button class="order-button" type="primary" v-show="order.state == 3 && order.groupId == 5" style="width: 80px;padding-left: 0;padding-right: 0;" @click="$router.push('/user/order-detail/'+order.out_id)">确定发货</el-button>
            <el-button class="order-button" type="primary" v-show="order.state == 6 && order.groupId == 4" style="width: 80px;padding-left: 0;padding-right: 0;" @click="receipt(order.out_id)">确定收货</el-button>
            <el-button class="order-button text" type="text" v-show="(order.state ==1 || order.state == 0)&&order.groupId==4" style="width: 80px;padding-left: 0;padding-right: 0;" @click="cancel(order.out_id)">取消交易</el-button>
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
  data () {
    return {
      pageNumber: 1,
      showMore: false,
      searchForm: {
        goodsName: '',
        status: '',
        userName: '',
        date1: '',
        date2: ''
      },
      type: -1
    }
  },
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
    this.type = type
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
  methods: {
    getList (page) {
      const {params: {type}} = this.$route
      this.type = type
      this.$router.push(`/user/order/${type}/${page}`)
    },
    cancel (no) {
      this.$confirm('提交后将取消交易，请确定是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '取消订单中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$store.dispatch('orderCancel', {fileds: {no},
          cb: (data) => {
            loading.close()
            const {status, msg} = data
            if (status === 0) {
              this.$message({
                type: 'success',
                message: msg
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
            } else {
              this.$message.error(msg)
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    receipt (no) {
      this.$confirm('提交后将完成收货，请确定是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '确定收货中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$store.dispatch('orderReceipt', {fileds: {no},
          cb: (data) => {
            loading.close()
            const {status, msg} = data
            if (status === 0) {
              this.$message({
                type: 'success',
                message: msg
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
            } else {
              this.$message.error(msg)
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    getStateTitle (state, group) {
      let result = ''
      switch (state) {
        case -1:
          result = '全部'
          break
        case 0:
          result = '待核价'
          break
        case 1:
          result = '待签约'
          break
        case 2:
          result = '待采购商打款'
          break
        case 3:
          result = '待发货'
          break
        case 4:
          result = '订单关闭'
          break
        case 6:
          result = '待收货'
          break
        case 7:
          result = '待质检'
          break
        case 8:
          result = '售后处理'
          break
        case 9:
          result = '账期中'
          break
        case 10:
          result = '逾期中'
          break
        case 11:
          result = (group === 4 ? '交易完成' : '待结算')
          break
        case 13:
          result = '交易完成'
          break
      }
      return result
    },
    onSubmit () {
      console.log('submit!')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
  table
    width 100%
    td
      border 1px solid red
  .order-button
    width 120px
    height 38px
    margin 0 auto
    &.text
      color #66666
  .order-wrap
  .result-wrap
    margin auto
    .down-icon
      width 0
      height 0
      border-width 8px
      border-style solid
      border-color #FF7900 transparent transparent transparent
      position absolute
      top 16px
      right -18px
    .title
      height 48px
      background-color #ffffff
      border 1px solid #dedede
      line-height 48px
      padding-left 20px
      margin-bottom 20px
    .item
      float left
      font-size 14px
      color #333333
      overflow hidden
    .table
      margin-bottom 20px
      .list
        display flex
      .time
        padding 0 0 10px 20px
      .title
        height 40px
        border 1px solid #dedede
        background-color #ffffff
        line-height 40px
        margin-bottom 0
        border-bottom none
        .item
          span
            color: #66666
    .data
      border 1px solid #dedede
      padding 20px 0 20px 20px
      background-color #ffffff
      overflow hidden
      &+.data
        border-top none
      .item
        color #66666
        height 52px
        line-height 52px
      .source
      .addr
      .status
      .action
        text-align center
      .img
        width 60px
        height 52px
        overflow hidden
        float left
        img
          display block
          width 100%
          height 100%
          background-color #e1e1e1
      .info
        padding-left 20px
        color #66666
        position relative
        display flex
        justify-content center
        flex-direction column
        .md
          line-height 1.5
          .goods-title
            font-size 18px
          .goods-info
            color #999999
            font-size 16px
    .order-info
        width 32%
    .source
        width 19%
        text-align center
        white-space nowrap
    .addr
        width 18%
        text-align center
    .status
        width 12%
        text-align center
    .action
        width 19%
        text-align center
  .lists
    display flex
    clear both
    background-color #ffffff
    .lists-content
      flex 1
    .info-btn
      padding 20px
      border 1px solid #dedede
      border-left none
      display flex
      justify-content center
      align-items center
</style>
<style lang="stylus">
  .search-wrap
    .el-collapse-item__arrow
      display none
      opacity 0
</style>
