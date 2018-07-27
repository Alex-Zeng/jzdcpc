<template>
  <div class="message-wrap">
    <div class="back" @click="back"><i class="back_icon">&#xe67a;</i>返回</div>
    <div class="title">消息中心</div>
    <ul class="msg-list">
      <li class="msg-item" v-for="i in list" :key="i.id">
        <h4 class="time">{{i.release_time}}</h4>
        <div class="content clearfix">
          <img :src="i.icon" alt="">
          <span class="name">{{i.title}}</span>
          <span class="text">{{i.content}}，订单号：{{i.orderNo}}</span>
          <nuxt-link :to="'/user/order-detail/'+i.orderNo+'/-1'" class="link">查看详情</nuxt-link>
        </div>
      </li>
    </ul>
    <div class="pager" style="margin-top: 20px;">
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
const pageSize = 10
export default {
  name: 'message',
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
    padding 40px
    .title
      font-size 18px
      color #333333
      padding-left 10px
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
      .msg-item
        .time
          font-size 20px
          color #737373
          font-weight 400
          line-height 54px
        .content
          background-color #fff
          border 1px solid #ccc
          padding 20px
          display flex
          flex-flow row
          align-items center
          img
            width 74px
            height 60px
            margin-right 40px
          .link
            float right
            width 80px
            color #2fbeed
          .text
            flex 1
          .name
            width 280px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
</style>
