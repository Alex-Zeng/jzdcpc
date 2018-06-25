<template>
  <div class="favorite-wrap">
    <div class="title">收藏夹</div>
    <!--动态计算宽度-->
    <div class="favorite-tabs clearfix" :style="{width: (favoriteType.length+1)*130+'px'}">
        <nuxt-link to="/user/workbench/favorite/-1/1" :class="{active: type == -1, 'tabs-item': true}">
            所有
        </nuxt-link>
        <nuxt-link v-for="i in favoriteType" v-bind:to="`/user/workbench/favorite/${i.id}/1`" :class="{active: type == i.id, 'tabs-item': true}" :key="i.id">
            {{i.name}}({{i.count}})
        </nuxt-link>
    </div>
    <div class="content clearfix">
      <div class="list">
        <div class="item" v-for="i in favoriteList" :key="i.id">
          <i class="delete" @click="doDelete(i.id)">&#xe61d;</i>
          <div class="img">
            <img :src="i.icon" alt="">
          </div>
          <div class="goods-title">
            {{i.title}}
          </div>
          <div class="bottom">
            <div class="left">
              ￥<span>{{i.min_price}}~{{i.max_price}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pager" style="margin-top: 20px;">
        <el-pagination
          background
          :total="total"
          :page-size="14"
          :current-page="pageNumber"
          @current-change="getList"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .favorite-wrap
    padding 40px
    .content
      width 1430px
      .list
        width 1470px
        margin-left -40px
        overflow hidden
        .item
          width 170px
          height 190px
          float left
          margin-left 40px
          margin-top 40px
          border 1px solid #ccc
          .delete
            font-family 'jzdc'
            text-align right
            /*display block*/
            cursor pointer
            margin 7px 10px 0 0
            display none
            color #ccc
            &:hover
              color #2fbeed
          .goods-title
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            width 168px
            height 26px
          .bottom
            font-size 13px
            padding 0 9px
            .left
              float left
              color #2fbeed
              span
                font-size 16px
                font-weight bold
            .right
              float right
              color #737373
          .img
            width 148px
            height 120px
            margin 10px auto
            /*background-color #000000*/
            img
              width 100%
              height 100%
          &:hover
            margin-top 16px
            height 214px
            border 1px solid #2fbeed
            .delete
              display block
    .title
      font-size 26px
      color #2fbeed
      padding-left 10px
      border-left 10px solid #2fbeed
    .favorite-tabs
      margin-top 28px
      margin-left -10px
      width 1520px
      overflow hidden
      height 46px
      .tabs-item
        -webkit-transition all 0.8s
        -moz-transition all 0.8s
        -ms-transition all 0.8s
        -o-transition all 0.8s
        transition all 0.8s
        cursor pointer
        color #2fbeed
        text-align center
        background-color #ccf2ff
        float left
        width 120px
        height 40px
        line-height 40px
        font-size 14px
        margin-left 10px
        position relative
        &.active
          background-color #2fbeed
          color #fff
        &:after
          content ' '
          display block
          position absolute
          bottom -6px
          left 0
          width 130px
          z-index 100
          border-bottom 6px solid #2fbeed
</style>

<script>
const pageSize = 14
export default {
  data () {
    return {
      type: -1,
      pageNumber: 1
    }
  },
  computed: {
    favoriteType () {
      return this.$store.getters.favoriteType
    },
    favoriteList () {
      return this.$store.getters.favoriteList
    },
    total () {
      return this.$store.getters.favoriteTotal
    }
  },
  watch: {
    '$route': function () {
      const {params: {type, page}} = this.$route
      this.pageNumber = Number(page)
      this.type = type
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const fileds = {cateId: type, pageSize, pageNumber: page}
      this.$store.dispatch('getFavoriteList', {fileds, cb: () => loading.close()})
    }
  },
  mounted () {
    this.$store.dispatch('getFavoriteType')
    const {type, pageNumber} = this
    const fileds = {cateId: type, pageSize, pageNumber}
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$store.dispatch('getFavoriteList', {fileds, cb: () => loading.close()})
  },
  methods: {
    getList (page) {
      const {params: {type}} = this.$route
      this.$router.push(`/user/workbench/favorite/${type}/${page}`)
    },
    doDelete (id) {
      this.$confirm('此操作将永久删除该收藏记录, 是否继续?', '提示', {
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
        this.$store.dispatch('deleteFavorite', {
          fileds: {goodsId: id},
          successCb: (msg) => {
            this.$message({
              type: 'success',
              message: msg
            })
            const {type, pageNumber} = this
            const fileds = {type, pageNumber}
            this.$store.dispatch('getFavoriteList', {fileds, cb: () => loading.close()})
          },
          errorCb: (msg) => {
            this.$message.error(msg)
            loading.close()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
