<template>
  <div class="message-wrap">
    <div class="back" @click="back"><i class="back_icon">&#xe67a;</i>返回</div>
    <div class="title">消息中心</div>
    <ul class="msg-list" v-if="list.length > 0">
      <li class="msg-item" v-for="i in list" :key="i.id">
        <h4 class="time">{{i.release_time}}</h4>
        <div class="content clearfix">
          <img :src="i.icon" alt="">
          <span class="name">{{i.goodsName}}</span>
          <span class="text">{{i.title}}，订单号：{{i.orderNo}}</span>
          <nuxt-link :to="'/user/order-detail/'+i.orderNo+'/-1'" class="link">查看详情</nuxt-link>
        </div>
      </li>
    </ul>
    <empty text="抱歉，暂无个人消息" link="" img="/empty/msg_empty.png" :styles="{width: '220px'}" v-if="list.length <= 0"></empty>
    <div class="pager" style="margin-top: 20px;" v-if="list.length > 0">
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
</template>

<script>
import empty from '../../components/empty'
const pageSize = 10
export default {
  name: 'message',
  components: {
    empty
  },
  watch: {
    '$route': function () {
      const {params: {page}} = this.$route
      this.pageNumber = Number(page)
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const fileds = {pageSize, pageNumber: page}
      this.$store.dispatch('getMessageList', {fileds, cb: () => loading.close()})
    }
  },
  data () {
    return {
      pageNumber: 1
    }
  },
  computed: {
    total () {
      return this.$store.getters.messageTotal
    },
    list () {
      return this.$store.getters.messageList
    }
  },
  mounted () {
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$store.dispatch('getMessageList', {fileds: {pageNumber: this.pageNumber, pageSize}, cb: () => loading.close()})
  },
  methods: {
    getList (page) {
      this.$router.push(`/user/message/${page}`)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .message-wrap
    padding 5px
    .title
      font-size 18px
      color #333333
      padding-left 10px
      margin-bottom 10px
      border-left 4px solid #ff7900
    .back
      font-size 18px
      cursor pointer
      color #ff7900
      margin-bottom 16px
      .back_icon
        font-family 'jzdc'
        font-size 18px
    .msg-list
      margin-left 130px
      padding-left 26px
      padding-bottom 20px
      border-left 5px solid #DEDEDE
      .msg-item
        position relative
        margin-bottom 30px
        .time
          width 104px
          font-size 14px
          color #737373
          font-weight 400
          text-align center
          position absolute
          left -150px
          &:after
            display block
            content ''
            width 16px
            height 16px
            border-radius 50%
            background #FF7900
            position absolute
            right -25px
            top 0
        .content
          background-color #fff
          border 1px solid #ccc
          padding 5px 10px
          display flex
          flex-flow row
          align-items center
          img
            width 62px
            height 50px
            margin-right 20px
          .link
            float right
            text-align right
            width 80px
            font-size 14px
            color #2fbeed
          .text
            flex 1
            font-size 14px
          .name
            width 280px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
</style>
