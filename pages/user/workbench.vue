<template>
  <div>
    <!--<nuxt-child></nuxt-child>-->
    <div class="main-row">
      <div class="main-row-left">
        <h3>累计交易额</h3>
        <p>{{total.turnoverAll}}<span>元</span></p>
      </div>
      <div class="main-row-right">
        <div class="title">
          <img src="@/assets/img/user/notice.png" alt=""><span>系统公告</span>
          <nuxt-link to="/notice">更多>></nuxt-link>
        </div>
        <ul>
          <li v-for="(item, index) in noticeLists"  @click="$router.push('/notice/notice-detail/'+ item.id)" :key="index">
            <span>{{item.release_time}}</span>
            <p>{{item.summary}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-row">
      <div class="main-row-left">
        <ul v-if="user.group == 4">
          <li>
            <h4>待发货（单）</h4>
            <p>{{buyerOrderInfo.deliver}}</p>
          </li>
          <li>
            <h4>待收货（单）</h4>
            <p>{{buyerOrderInfo.recieve}}</p>
          </li>
          <li>
            <h4>待付款订单（单）</h4>
            <p>{{buyerOrderInfo.pay}}</p>
          </li>
          <li>
            <h4>售后处理中（单）</h4>
            <p>{{buyerOrderInfo.service}}</p>
          </li>
        </ul>
        <ul v-if="user.group == 5">
          <li>
            <h4>昨日成交（笔）</h4>
            <p>{{supplierOrderInfo.yesterday}}</p>
          </li>
          <li>
            <h4>累计成交（笔）</h4>
            <p>{{supplierOrderInfo.total}}</p>
          </li>
          <li>
            <h4>在售商品（件）</h4>
            <p>{{supplierOrderInfo.goodsNumber}}</p>
          </li>
          <li>
            <h4>累计浏览量（次）</h4>
            <p>{{supplierOrderInfo.visit}}</p>
          </li>
        </ul>
      </div>
      <div class="main-row-right">
        <div class="title">
          <img src="@/assets/img/user/message.png" alt=""><span>个人消息</span>
          <nuxt-link to="/user/message">更多>></nuxt-link>
        </div>
        <ul>
          <li v-for="(item, index) in messageLists"  @click="$router.push('/user/order-detail/'+item.orderNo+'/-1')" :key="index">
            <span>{{item.release_time}}</span>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-row">
      <img src="@/assets/img/user/ad.png" alt="">
      <a href="/service/index.html" class="link" target="_blank">点击申请</a>
    </div>
    <div class="main-row">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="近期成交" name="1">
          <el-table
            :data="tableData1"
            height="500"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="orderTime"
              label="创建时间"
              width="160">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商名称">
            </el-table-column>
            <el-table-column
              prop="orderNo"
              label="订单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsNumber"
              label="商品总数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="totalMoney"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="stateInfo"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="90">
              <template slot-scope="scope">
                <el-button @click="handleClickRow(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="2">
          <el-table
            :data="tableData2"
            height="500"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="orderTime"
              label="创建时间"
              width="160">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商名称">
            </el-table-column>
            <el-table-column
              prop="orderNo"
              label="订单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsNumber"
              label="商品总数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="totalMoney"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="stateInfo"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="90">
              <template slot-scope="scope">
                <el-button @click="handleClickRow(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="售后处理中" name="3">
          <el-table
            :data="tableData3"
            height="500"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="orderTime"
              label="创建时间"
              width="160">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商名称">
            </el-table-column>
            <el-table-column
              prop="orderNo"
              label="订单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsNumber"
              label="商品总数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="totalMoney"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="stateInfo"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="90">
              <template slot-scope="scope">
                <el-button @click="handleClickRow(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .main-row
    margin-bottom 10px
    overflow hidden
    position relative
    .main-row-left
      width 660px
      height 192px
      margin-right 10px
      background #ffffff
      float left
      font-size 18px
      color #333333
      padding 40px
      box-sizing border-box
      p
        font-size 60px
        color #2475E2
        span
          font-size 18px
          color #333333
      ul
        overflow hidden
        li
          width 25%
          float left
          text-align center
          h4
            font-size 14px
    .main-row-right
      float left
      width 438px
      height 192px
      padding 20px
      box-sizing border-box
      background #ffffff
      .title
        font-size 16px
        color #333333
        img
          vertical-align middle
          padding-right 10px
        a
          color #2475E2
          float right
      ul
        padding-top 10px
        li
          display flex
          padding 5px
          cursor pointer
          span
            width 130px
            height 20px
            overflow hidden
          p
            flex 1
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
    .link
      width 240px
      height 30px
      line-height 30px
      text-align center
      border-radius 8px
      color #2477E3
      background rgba(255, 255, 255, 0.4)
      position absolute
      top 87px
      left 0
      right 0
      margin auto
</style>

<script>
import apiWorkbench from '@/api/apiWorkbench'
export default {
  name: 'workbench',
  data  () {
    return {
      Buyer: true,
      noticeLists: {},
      total: {
        turnoverAll: ''
      },
      messageLists: {},
      buyerOrderInfo: {
        pay: 0,
        recieve: 0,
        deliver: 0,
        service: 0
      },
      supplierOrderInfo: {
        yesterday: 0,
        total: 0,
        pending: 0,
        service: 0,
        goodsNumber: 0,
        visit: 0
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
      activeName: '1'
    }
  },
  methods: {
    async getNotice () {
      await apiWorkbench.getNotice({pageSize: 3, pageNumber: 1}, (data) => {
        const {data: {list}} = data
        this.noticeLists = list
      })
    },
    async getTotal () {
      await apiWorkbench.getTotal((data) => {
        this.total = data.data
      })
    },
    async messageList () {
      await apiWorkbench.messageList({pageSize: 3, pageNumber: 1}, (data) => {
        const {list} = data
        this.messageLists = list
      })
    },
    async getBuyerOrderInfo () {
      await apiWorkbench.getBuyerOrderInfo((data) => {
        this.buyerOrderInfo = data.data
      })
    },
    async getSupplierOrderInfo () {
      await apiWorkbench.getSupplierOrderInfo((data) => {
        this.supplierOrderInfo = data.data
      })
    },
    async getDeskList (index) {
      await apiWorkbench.getDeskList({type: index}, (data) => {
        const {data: {list}} = data
        if (index === 1) {
          this.tableData1 = list
        } else if (index === 2) {
          this.tableData2 = list
        } else {
          this.tableData3 = list
        }
      })
    },
    handleClick (tab, event) {
      this.getDeskList(parseInt(tab.index) + 1)
    },
    handleClickRow (index) {
      console.log(index)
      this.$router.push('/user/order-detail/' + index.orderNo)
      // @click="$router.push('/user/order-detail/'+order.out_id+'/'+type)"
      // this.$router.push('/user/order-detail/'+order.out_id+'/'+type)
    }
  },
  created () {
    this.getNotice()
    this.getTotal()
    this.messageList()
    if (parseInt(this.user.group) === 4) {
      this.getBuyerOrderInfo()
    }
    if (parseInt(this.user.group) === 5) {
      this.getSupplierOrderInfo()
    }
    this.getDeskList(1)
  },
  mounted () {
  },
  computed: {
    user () {
      return this.$store.getters.loggedUser
    }
  }
}
</script>
