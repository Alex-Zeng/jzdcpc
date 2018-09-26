<template>
  <div>
    <indexHeader></indexHeader>
    <div class="content-wrap">
      <div class="back">
        <span @click="back">
          <i class="back_icon">&#xe67a;</i>返回
        </span>
        <nuxt-link to="/notice" replace style="float: right;">
          返回列表
        </nuxt-link>
      </div>
      <h3>
        {{detail.title}}
      </h3>
      <div class="content" v-html="detail.content"></div>
      <div class="footer">
        <p>集众电采</p>
        <p>{{detail.release_time}}</p>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header'
import indexFooter from '@/components/index/footer'
import apiNotice from '@/api/apiNotice'
export default {
  name: 'notice-detail',
  head () {
    return {
      title: '公告详情'
    }
  },
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    async getNoticeInfo () {
      let id = this.$route.params.page
      await apiNotice.getNoticeInfo((data) => {
        this.detail = data
      }, {id: id})
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getNoticeInfo()
  },
  components: {
    indexHeader,
    indexFooter
  }
}
</script>

<style lang="stylus" scoped>
  .content-wrap
    padding 5px
    width 1300px
    min-height 558px
    margin auto
    font-size 18px
    .back
      font-size 18px
      cursor pointer
      color #2475E2
      margin-bottom 16px
      a
        color #2475E2
      .back_icon
        font-family 'jzdc'
        font-size 18px
    h3
      width 660px
      padding-bottom 20px
      text-align center
      margin auto
    .content
      width 660px
      font-size 14px
      color #666666
      line-height 1.5
      text-align left
      margin auto
    .footer
      padding-top 50px
      text-align right
</style>
