<template>
  <div>
    <indexHeader></indexHeader>
    <div class="cart-wrap">
      <div class="breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item to="/goods/cart">采购清单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <empty v-if="list.length <= 0" text="购物车中暂无商品" link="/" img="/empty/order_empty.png" :styles="{width: '230px'}"></empty>
      <div v-else>
        <div class="title-bar">
          <ul class="clearfix">
            <li class="item" style="width: 155px;padding-left: 20px;">
              <el-checkbox v-model="all">全选</el-checkbox>
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
            <el-checkbox v-model="groupAll[k]" :disabled="i.buyAble==0">{{i.supplierName}}</el-checkbox>
          </div>
          <div class="goods-list" v-for="(item, key) in i.list" :key="'cart-item'+key">
            <ul class="clearfix">
              <li class="item" style="width: 155px;padding-left: 20px;">
                <el-checkbox v-model="checkedList[k][key]" :disabled="i.buyAble==0">
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
                <el-input-number style="width: 138px;" v-model="item.quantity" :min="item.moq?Number(item.moq):1" @change="updateNum(item,item.cartId, item.quantity)"></el-input-number>
              </li>
              <li class="item" style="width: 280px; text-align: center;">{{parseInt(item.quantity*item.price) === (item.quantity*item.price)? (item.quantity*item.price).toFixed(2):(item.quantity*item.price).toFixed(4)}}</li>
              <li class="item action" style="width: 210px;text-align: center;">
                <span class="op" @click="favorite(item.goodsId)">收藏商品</span>
                <span class="op" @click="deleteIds(item.cartId)">删除</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="all-action">
          <el-checkbox v-model="all" style="margin-right: 20px;">全选</el-checkbox>
          <span class="action" @click="$router.replace('/')">返回继续购物</span>
          <span class="action" @click="deleteAll">删除选中商品</span>
          <div class="right">
            <span>已选择 {{count}} 件商品，总计<span style="color: #ff0000;">{{total}}</span>元</span>
            <el-button
              class="order-btn"
              style="height: 80px;border:none;border-radius: 0;width: 150px;color: #ffffff;background-color: #ff0000;font-size: 18px;margin-left: 40px;"
              v-if="count > 0"
              @click="toOrder"
            >
              去结算
            </el-button>
            <el-button
              class="order-btn"
              style="height: 80px;border:none;border-radius: 0;width: 150px;color: #ffffff;background-color: #666;font-size: 18px;margin-left: 40px;"
              v-else
            >
              去结算
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '../../components/index/header'
import indexFooter from '../../components/index/footer'
import empty from '../../components/empty'
import apiMallCart from '../../api/apiMallCart'
export default {
  name: 'cart',
  middleware: 'lockGroup',
  head () {
    return {
      title: '购物清单'
    }
  },
  components: {
    indexFooter,
    indexHeader,
    empty
  },
  watch: {
    all: function (val, oldVal) {
      if (this.checkedList.length > 0) {
        let check = []
        this.checkedList.forEach((i) => {
          check.push(i.fill(this.all))
        })
        this.$set(this.checkedList, check)
        this.groupAll.fill(this.all)
        this.groupAll.forEach((item, index) => {
          if (this.list[index].buyAble == 0) {
            this.groupAll.fill(false, index, index + 1)
            this.checkedList[index].fill(false)
          }
        })
        this.countAll()
      }
    },
    groupAll: function () {
      if (this.groupAll.length > 0) {
        this.groupAll.forEach((i, k) => {
          const temp = new Array(this.checkedList[k].length).fill(i)
          this.$set(this.checkedList, k, temp)
        })
        this.countAll()
      }
    },
    checkedList: function () {
      if (this.checkedList.length > 0) {
        this.countAll()
      }
    }
  },
  data () {
    return {
      list: [],
      checkedList: [],
      all: false,
      groupAll: [],
      total: 0,
      count: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    toOrder () {
      let cart = []
      this.checkedList.forEach((i, k) => {
        const temp = {supplierName: this.list[k].supplierName, list: []}
        i.forEach((item, key) => {
          if (item) {
            temp.list.push(this.list[k].list[key])
          }
        })
        if (temp.list.length > 0) {
          cart.push(temp)
        }
      })
      sessionStorage.setItem('carts', JSON.stringify(cart))
      const loading = this.$loading({
        lock: true,
        text: '生成订单中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(
        () => {
          this.$router.push('/goods/order')
          loading.close()
        },
        700
      )
    },
    changeNum (val, i) {
      if (i.specPriceDetails) {
        i.specPriceDetails.forEach((item) => {
          if (item.minOrderQty <= val && item.maxOrderQty >= val) {
            i.price = item.price
          }
        })
      }
    },
    updateNum (item, id, number) {
      setTimeout(() => {
        apiMallCart.update((data) => {
        }, {id, number})
      })
      this.countAll()
      this.changeNum(item.quantity, item)
    },
    countAll () {
      let count = 0
      let total = 0
      this.checkedList.forEach((i, k) => {
        i.forEach((item, key) => {
          if (item) {
            count++
            total += this.list[k].list[key].price * this.list[k].list[key].quantity
          }
        })
      })
      this.total = total
      this.count = count
    },
    deleteAll () {
      let ids = []
      this.checkedList.forEach((i, k) => {
        i.forEach((item, key) => {
          if (item) {
            ids.push(this.list[k].list[key].cartId)
          }
        })
      })
      if (ids.length < 1) {
        this.$message.error('请选择需要删除的商品!')
        return
      }
      this.deleteIds(ids.join(','))
    },
    deleteIds (ids) {
      this.$confirm('此操作将永久删除购物车的商品, 是否继续?', '提示', {
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
        try {
          apiMallCart.delete((data) => {
            const {status, msg} = data
            if (status !== 0) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: msg
              })
              this.$store.dispatch('getCartNum')
              this.getList()
            }
          }, {ids})
        } catch (e) {
          this.$message({
            type: 'error',
            message: '网络开小差'
          })
        } finally {
          loading.close()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    favorite (goodsId) {
      this.$store.dispatch('addFavorite', {fileds: {goodsId},
        scb: (msg) => {
          this.$message({
            type: 'success',
            message: msg
          })
        },
        ecb: (msg) => {
          this.$message.error(msg)
        }
      })
    },
    getList () {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        let group = []
        let check = []
        apiMallCart.getMallCart((data) => {
          data.forEach((i) => {
            const len = i.list.length
            group.push(false)
            check.push(new Array(len).fill(false))
            i.list.forEach((item) => {
              // 根据价格梯度显示价格
              this.changeNum(item.quantity, item)
            })
          })
          this.list = data
          this.groupAll = group
          this.checkedList = check
        }, {})
      } catch (e) {
        this.$message({
          type: 'error',
          message: '网络开小差'
        })
      } finally {
        loading.close()
      }
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
  .all-action
    height 80px
    line-height 80px
    background-color #ededed
    padding-left 20px
    margin-top 20px
    font-size 14px
    color #666
    .action
      margin-left 40px
      cursor pointer
    .right
      float right
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
    font-size 16px
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
      &.action
        padding-top 30px
        .op
          height 20px
          line-height 20px
          color #666666
          display block
          cursor pointer
          font-weight 600
          &:hover
            color #2475e2
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
