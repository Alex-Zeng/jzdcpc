<template>
  <div>
    <indexHeader></indexHeader>
    <div class="message-wrap">
      <div class="back" @click="back"><i class="back_icon">&#xe67a;</i>返回</div>
      <div class="title">平台公告</div>
      <table>
        <thead>
        <tr>
          <th>&emsp;日期</th>
          <th>标题</th>
          <th>摘要</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="$router.replace('/notice/notice-detail/'+ item.id)" :key="item.id">
          <td style="width: 200px;padding-left: 1em;">{{item.release_time}}</td>
          <td><div style="width: 287px">{{item.title}}</div></td>
          <td><div style="width: 770px">{{item.summary}}</div></td>
        </tr>
        </tbody>
      </table>
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
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header'
import indexFooter from '@/components/index/footer'
const pageSize = 10
export default {
  name: 'index',
  data () {
    return {
      pageNumber: 1
    }
  },
  methods: {
    getList (page) {
      this.$router.push(`/notice/notice-detail/${page}`)
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$store.dispatch('getNoticeList', {fileds: {pageNumber: this.pageNumber, pageSize}, cb: () => loading.close()})
  },
  computed: {
    total () {
      return this.$store.getters.noticeTotal
    },
    list () {
      return this.$store.getters.noticeList
    }
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
      this.$store.dispatch('getNoticeList', {fileds, cb: () => loading.close()})
    }
  },
  components: {
    indexHeader,
    indexFooter
  }
}
</script>

<style lang="stylus" scoped>
  .message-wrap
    padding 5px
    width 1300px
    min-height 558px
    margin auto
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
    table
      width 100%
      line-height 40px
      thead
        border 1px solid #DDDDDD
        background #ffffff
      th
        text-align left
      td
        div
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
</style>
