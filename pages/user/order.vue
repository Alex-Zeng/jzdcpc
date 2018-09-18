<template>
  <div class="order-wrap">
    <el-dialog title="订单记录已生成" :visible.sync="dialogFormVisible" width="400px">
      <div style="text-align: center;">
        <a :href="url" target="_blank" style="color: #ff7900;font-size: 18px; font-weight: 600;">点击下载订单记录</a>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="search-wrap">
      <el-form ref="searchForm" :inline="true" :model="searchForm">
        <el-form-item prop="startDate" label="起始时间：">
          <el-date-picker type="date" placeholder="选择起始时间" v-model="searchForm.startDate" style="width: 198px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <span style="line-height: 40px; padding: 0 10px 0 0;">-</span>
        <el-form-item prop="endDate" label="终止时间：">
          <el-date-picker type="date" placeholder="选择终止时间" v-model="searchForm.endDate" style="width: 198px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item prop="orderNo" label="订单号：" label-width="82px">
          <el-input v-model="searchForm.orderNo" placeholder="请输入订单号" style="width: 198px;"></el-input>
        </el-form-item>
        <el-form-item label="采购商品：" prop="goodsName">
          <el-input v-model="searchForm.goodsName" placeholder="请输入采购的商品名称" style="width: 198px;"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：" style="margin-left: 14px;">
          <el-select v-model="searchForm.status" placeholder="请选择订单状态" style="width: 198px;" prop="status">
            <el-option :label="item.value" :value="item.key" v-for="(item, key) in statusList" :key="key+'status'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购企业：" prop="companyName">
          <el-input v-model="searchForm.companyName" placeholder="请输入采购企业" style="width: 198px;"></el-input>
        </el-form-item>
        <div style="width: 870px;height: 40px;">
          <div style="float: right;">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
            <el-button type="primary" @click="exportXls">导出结果</el-button>
          </div>
        </div>
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
      <div class="table" v-for="order in orders" :key="order.id" v-if="orders.length > 0">
        <p class="time">{{order.orderDate}}</p>
          <div class="title clearfix">
            <div class="item order-info"><span>订单号：{{order.out_id}}</span></div>
            <div class="item source">{{order.companyName || '无'}}</div>
            <div class="item addr">{{order.receiver_name}}</div>
            <div class="item status">{{order.service_type == 1? '售后处理中': order.service_type == 2 && type == 6? '售后完成': getStateTitle(parseInt(order.state), parseInt(order.groupId))}}</div>
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
                    <div class="goods-info">{{item.s_info}}</div>
                  </div>
                </div>
              </div>
              <div class="item source">数量：{{item.quantity}}</div>
              <div class="item addr">单价：{{item.price}}元</div>
              <div class="item status">小计：{{parseInt(item.quantity * item.price) === Number(item.quantity * item.price)? (item.quantity * item.price).toFixed(2) : (item.quantity * item.price).toFixed(4)}}元</div>
            </div>
          </div>
          <div class="info info-btn">
            <el-button class="order-button" type="primary" style="width: 80px;padding-left: 0;padding-right: 0;margin-right: 8px;" @click="$router.push('/user/order-detail/'+order.out_id+'/'+type)">查看详情</el-button>
            <el-button class="order-button" type="primary" v-show="order.state == 3 && order.groupId == 5" style="width: 80px;padding-left: 0;padding-right: 0;" @click="$router.push('/user/order-detail/'+order.out_id)">确定发货</el-button>
            <el-button class="order-button" type="primary" v-show="order.state == 6 && order.groupId == 4 && (order.service_type ==0 || order.service_type ==2)" style="width: 80px;padding-left: 0;padding-right: 0;" @click="receipt(order.out_id)">确定收货</el-button>
            <el-button class="order-button text" type="text" v-show="order.state ==1 || order.state == 0" style="width: 80px;padding-left: 0;padding-right: 0;" @click="cancel(order.out_id)">取消交易</el-button>
            <el-button class="order-button text" type="primary" style="width: 80px;padding-left: 0;padding-right: 0;" v-show="type == 6" @click="$router.push('/user/service/'+order.out_id)">查看售后</el-button>
          </div>
        </div>
      </div>
      <empty text="您暂时还没有符合该条件的订单" link="" img="/empty/order_empty.png" v-if="orders.length <= 0"></empty>
      <div class="pager" v-if="orders.length > 0">
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
import service from '@/service'
import empty from '../../components/empty'
const pageSize = 10
export default {
  name: 'order',
  data () {
    return {
      pageNumber: 1,
      showMore: false,
      dialogFormVisible: false,
      searchForm: {
        goodsName: '',
        status: '',
        companyName: '',
        startDate: '',
        endDate: '',
        orderNo: ''
      },
      type: -1,
      url: ''
    }
  },
  components: {
    empty
  },
  computed: {
    orders () {
      return this.$store.getters.orderList
    },
    total () {
      return this.$store.getters.orderTotal
    },
    statusList () {
      return this.$store.getters.statusList
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
      const {params: {type, page, search}} = this.$route
      this.pageNumber = Number(page)
      this.type = type
      this.searchForm.status = type
      let others = {}
      search && (others = JSON.parse(search))
      this.$store.dispatch('getOrderList', {
        data: {
          status: type,
          pageNumber: this.pageNumber,
          pageSize,
          ...others
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
    const {params: {type, page, search}} = this.$route
    this.type = type
    this.searchForm.status = type
    this.pageNumber = Number(page)
    let others = {}
    search && (others = JSON.parse(search))
    others && (this.searchForm = others)
    this.$store.dispatch('getOrderList', {
      data: {
        status: type,
        pageNumber: this.pageNumber,
        pageSize,
        ...others
      },
      cb: () => {
        loading.close()
      }
    })
  },
  methods: {
    getList (page) {
      const {params: {type, search}} = this.$route
      this.type = type
      this.searchForm.status = type
      let others = JSON.stringify({})
      search && (others = search)
      this.$router.push(`/user/order/${type}/${page}/${others}`)
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
            if (status == 0) {
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
            if (status == 0) {
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
          result = (group == 4 ? '交易完成' : '待结算')
          break
        case 13:
          result = '交易完成'
          break
      }
      return result
    },
    onSubmit () {
      this.pageNumber = 1
      const others = JSON.stringify(this.searchForm)
      const status = this.searchForm.status || this.type
      this.$router.push(`/user/order/${status}/${this.pageNumber}/${others}`)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async exportXls () {
      const loading = this.$loading({
        lock: true,
        text: '生成记录中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const {status, data: { url }} = await service.post('/papi/order/export', this.searchForm)
        if (status == 0) {
          this.$message(
            {
              type: 'success',
              message: '文件已生成，请点击下载'
            }
          )
          this.url = url
          setTimeout(() => {
            this.dialogFormVisible = true
          }, 700)
        } else {
          this.$message.error('生成记录失败！')
        }
      } catch (e) {
        this.$message.error('生成记录失败！')
      } finally {
        loading.close()
      }
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
    margin 40px auto 40px
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
        text-overflow ellipsis
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
