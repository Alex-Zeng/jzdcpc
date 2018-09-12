<template>
  <div class="order-detail-wrap">
    <el-dialog title="选择售后类型" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="售后类型" label-width="80px">
          <el-radio v-model="service_type" label="1">退货</el-radio>
          <el-radio v-model="service_type" label="2">换货</el-radio>
          <el-radio v-model="service_type" label="3">维修</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doService">确 定</el-button>
      </div>
    </el-dialog>
    <div class="imgBox" v-show="show" @click="show=false">
      <img :src="img" alt="">
    </div>
    <div class="info card clearfix">
      <div class="title">订单信息</div>
      <div class="left">
        <div class="item">
          <span class="label">订单号：{{detail.orderNo}}</span>
        </div>
        <div class="item">
          <span class="label">订单金额：{{detail.money}}元</span>
        </div>
        <div class="item">
          <span class="label">订单状态：{{detail.serviceType == 1? '售后处理中': detail.serviceType == 2 && type == 6? '售后完成': getState(parseInt(detail.state), parseInt(detail.groupId))}}</span>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <span class="label">期望交货日期：{{detail.date}}</span>
        </div>
        <div class="remark-item">
          <span class="label">买家留言：</span>
          <span class="remark label">{{detail.remark}}</span>
        </div>
      </div>
    </div>
    <div class="goods">
      <ul class="title-bar clearfix">
        <li style="width: 196px;text-align:left;">商品信息</li>
        <li style="width: 126px;">单价</li>
        <li style="width: 92px;">数量</li>
        <li style="width: 144px;">小计</li>
        <li style="width: 156px;">物料编号</li>
        <li style="width: 254px;">物料规格</li>
        <li style="width: 86px;">操作</li>
      </ul>
      <ul class="good-item clearfix" v-for="(i, k) in detail.goods" :key="'goods' + k">
        <li style="width: 196px;text-align:left;" class="clearfix">
          <img :src="i.icon" alt="">
          <div class="name">
            <div class="good-title">
              {{i.title}}
            </div>
            <div class="spec">
              {{i.s_info}}
            </div>
          </div>
        </li>
        <li style="width: 126px;">{{i.price}}</li>
        <li style="width: 92px;">{{i.quantity}}</li>
        <li style="width: 144px;">{{i.price*i.quantity}}</li>
        <li style="width: 156px;">{{i.specifications_no}}</li>
        <li style="width: 254px;">{{i.specifications_name}}</li>
        <li style="width: 86px;" class="action" @click="dialogFormVisible = true, goodsId = i.id"
            v-if="(detail.state==6 || detail.state == 13 || detail.state == 9 || detail.state==10  || detail.state==11)&&(i.service_type==0)&&(detail.groupId==4)"
        >
          申请售后
        </li>
        <li style="width: 86px;" class="action" @click="$router.push('/goods/detail/'+i.goods_id)" v-else>
          查看详情
        </li>
      </ul>
    </div>
    <div class="common card clearfix">
      <div class="title">供采信息</div>
      <div class="left">
        <div class="item">
          <span class="label">供应商：</span>
          <span class="value">{{detail.supplierName}}</span>
        </div>
        <div class="item address">
          <span class="label">收货地址：</span>
          <span class="value">{{detail.address}}</span>
        </div>
      </div>
      <div class="left">
        <div class="item">
          <span class="label">采购商：</span>
          <span class="value">{{detail.buyerName}}</span>
        </div>
        <div class="item">
          <span class="label">联系手机：</span>
          <span class="value">{{detail.phone}}</span>
        </div>
      </div>
      <div class="left">
        <div class="item">
          <span class="label">收货人：</span>
          <span class="value">{{detail.name}}</span>
        </div>
      </div>
    </div>

    <div class="common card clearfix">
      <div class="title">物流信息</div>
      <div v-if="(detail.state > 3) || (!!(detail.express) || !!(detail.expresssCode))">
        <div class="left">
          <div class="item">
            <span class="label">运单号：</span>
            <span class="value">{{detail.expressCode}}</span>
          </div>
          <div class="item">
            <span class="label">物流公司：</span>
            <span class="value">{{detail.express}}</span>
          </div>
        </div>
        <div class="left">
          <div class="item">
            <span class="label">发货日期：</span>
            <span class="value">{{detail.sendDate}}</span>
          </div>
          <div class="item">
            <span class="label">预计到达：</span>
            <span class="value">{{detail.estimatedDate}}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="empty" v-if="detail.groupId == 4">暂无物流信息</div>
      </div>
    </div>

    <div class="common card clearfix" v-if="(detail.groupId == 5) && (!detail.expressCode)">
      <div class="title">物流信息</div>
      <div>
        <div class="left" style="width:420px;">
          <div class="item">
            <span class="label">运单号：</span>
            <span class="value" style="width: 260px;">
              <el-input v-model="expressForm.expressCode"></el-input>
            </span>
          </div>
          <div class="item">
            <span class="label">物流公司：</span>
            <span class="value" style="width: 260px;">
              <el-input v-model="expressForm.express"></el-input>
            </span>
          </div>
        </div>
        <div class="left" style="width:420px;">
          <div class="item">
            <span class="label">发货日期：</span>
            <span class="value">
              <el-date-picker type="date" placeholder="请选择发货日期" style="width: 248px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="expressForm.sendDate"></el-date-picker>
            </span>
          </div>
          <div class="item">
            <span class="label">预计到达：</span>
            <span class="value">
              <el-date-picker type="date" placeholder="请选择预计到达日期" style="width: 248px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="expressForm.estimatedDate"></el-date-picker>
            </span>
          </div>
        </div>
        <div class="left" style="width:220px;">
          <div class="item" style="height: 56px;"></div>
          <div class="item">
            <span class="value">
              <el-button type="primary" @click="delivery">确定发货</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="common card clearfix" v-if="detail.groupId != 4">
      <div class="title">付款信息</div>
      <div v-if="detail.payNumber || detail.payDate || detail.payImg">
        <div class="left" style="width: 370px;">
          <div class="item">
            <span class="label">{{detail.payMethod == '转账' ? '票号' : '流水号'}}：</span>
            <span class="value">{{detail.payNumber}}</span>
          </div>
          <div class="item">
            <span class="label">{{detail.payMethod == '转账' ? '承兑日期' : '汇款日期'}}：</span>
            <span class="value">{{detail.payDate}}</span>
          </div>
        </div>
        <div class="left">
          <div class="item">
            <span class="label">{{detail.payMethod == '转账' ? '票据影像' : '汇款凭证'}}：</span>
            <span class="value" style="color:#2475e2;cursor:pointer;" @click="img = detail.payImg, show=true">查看</span>
          </div>
        </div>
      </div>
      <div class="empty" v-else>
        暂无付款信息
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  computed: {
    detail () {
      return this.$store.getters.orderDetail
    }
  },
  data () {
    return {
      img: '',
      show: false,
      expressForm: {
        express: '',
        expressCode: '',
        sendDate: '',
        estimatedDate: ''
      },
      type: -1,
      dialogFormVisible: false,
      goodsId: -1,
      service_type: '1'
    }
  },
  mounted () {
    const {params: {no, type}} = this.$route
    this.type = type * 1
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$store.dispatch('getOrderDetail', {fileds: {no}, cb: () => { loading.close() }})
  },
  methods: {
    doService () {
      const {params: {no}} = this.$route
      const goodsId = this.goodsId
      const type = this.service_type * 1
      const loading = this.$loading({
        lock: true,
        text: '售后申请中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        this.$store.dispatch('orderService', {fileds: {no, goodsId, type},
          cb: (data) => {
            const {status, msg} = data
            if (status == 0) {
              this.$message({
                type: 'success',
                message: msg
              })
              const {params: {no, type}} = this.$route
              this.type = type * 1
              const loading = this.$loading({
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              })
              this.$store.dispatch('getOrderDetail', {fileds: {no}, cb: () => { loading.close() }})
              this.dialogFormVisible = false
            } else {
              this.$message.error(msg)
            }
            loading.close()
          }
        })
      } catch (e) {
        this.$message.error('服务器开小差了，请刷新后重试')
      } finally {
        loading.close()
      }
    },
    getState (state, group) {
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
    delivery () {
      const {params: {no}} = this.$route
      if (!this.expressForm.express) {
        this.$message.error('物流公司必须填写')
        return
      }
      if (!this.expressForm.expressCode) {
        this.$message.error('物流单号必须填写')
        return
      }
      if (!this.expressForm.sendDate) {
        this.$message.error('发货日期必须填写')
        return
      }
      if (!this.expressForm.estimatedDate) {
        this.$message.error('预计到达日期必须填写')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        this.$store.dispatch('doDelivery', {fileds: {...this.expressForm, no},
          cb: (data) => {
            const {status, msg} = data
            if (status == 0) {
              const loading = this.$loading({
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              })
              this.$store.dispatch('getOrderDetail', {fileds: {no}, cb: () => { loading.close() }})
              this.$message(
                {
                  type: 'success',
                  message: msg
                }
              )
            } else {
              this.$message.error(msg)
            }
            loading.close()
          }
        })
      } catch (e) {
        this.$message.error('网络不稳定，请刷新重试')
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.order-detail-wrap
  width 1100px
  padding-bottom 40px
  .imgBox
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .5)
    position fixed
    z-index 9999
    top 0
    left 0
    img
      width 800px
      height 448px
      position absolute
      top 50%
      left 50%
      margin-left -400px
      margin-top -224px
      display block
  .title
    font-size 16px
    color #333333
    padding-left 10px
    border-left 4px solid #ff7900
  .card
    background-color #fff
    border-radius 5px
    padding 22px 20px
  .common
    margin-top 10px
    .address
      display flex
      .label
        flex-basis 78px
        display block
      .value
        overflow hidden
        height 56px
        display block
        flex-basis 212px
    .empty
      font-size 18px
      color #999
      line-height 1.8
      padding-top 20px
      padding-left 14px
      font-weight 600
    .left
      float left
      padding-left 14px
      width 320px
      .label
        color #666666
        display inline-block
        font-size 14px
        padding-top 16px
        font-weight 500
        width 78px
        text-align right
      .value
        color #666
        display inline-block
        font-size 14px
        padding-top 16px
  .info
    .label
      color #666666
      display block
      font-size 14px
      padding-top 16px
      font-weight 500
    .left
      float left
      padding-left 14px
      width 366px
    .right
      float left
      .remark-item
        display flex
      .remark
        width 528px
        display block
        height 74px
        overflow hidden
  .goods
    background-color #fff
    border-radius 5px
    margin-top 10px
    .title-bar
      padding 0 20px
      font-size 16px
      li
        float left
        height 38px
        line-height 38px
        border-bottom 1px solid #dddddd
        text-align center
    .good-item
      padding 0 20px
      font-size 14px
      &:last-child
        li
          border-bottom none
      li
        float left
        height 68px
        line-height 68px
        border-bottom 1px solid #dddddd
        text-align center
        color #666
        img
          display block
          width 62px
          height 50px
          float left
          margin-top 8px
          margin-right 8px
        .name
          float left
          line-height 1.6
          padding-top 10px
          .good-title
            color #333
            font-size 16px
            width 120px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .spec
            font-size 12px
            color #999
            width 120px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
      .action
        color #2475e2
        cursor pointer
</style>
