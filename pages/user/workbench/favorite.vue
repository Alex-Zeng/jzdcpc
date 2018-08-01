<template>
  <div class="favorite-wrap">asdasdas
    <div class="title">收藏夹</div>
    <div class="favorite-tabs clearfix">
        <nuxt-link v-for="i in favoriteType" v-bind:to="`/user/workbench/favorite/${i.typeId}/1`" :class="{active: type == i.typeId, 'tabs-item': true}" :key="i.typeId">
            {{i.name}}({{i.count}})
        </nuxt-link>
    </div>
    <div class="content clearfix">
      <div class="list">
        <div @click="$router.push('/goods/detail/'+i.id)" class="item" v-for="i in favoriteList" :key="i.id">
          <i class="delete" @click.stop="doDelete(i.id)">&#xe61d;</i>
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
          layout="prev, pager, next"
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
    padding 30px
    .content
      width 1096px
      background-color #fff
      padding-bottom 20px
      border-radius 10px
      .list
        width 1096px
        margin-left 0px
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
              color #2475e2
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
              color #2475e2
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
            border 1px solid #2475e2
            .delete
              display block
    .title
      font-size 16px
      color #333333
      padding-left 10px
      border-left 4px solid #ff7900
    .favorite-tabs
      margin-top 28px
      margin-bottom 20px
      overflow hidden
      height 40px
      width 1096px
      border-radius 5px
      background-color #fff
      .tabs-item
        -webkit-transition all 0.8s
        -moz-transition all 0.8s
        -ms-transition all 0.8s
        -o-transition all 0.8s
        transition all 0.8s
        cursor pointer
        color #666666
        padding 0 18px
        text-align center
        float left
        height 40px
        line-height 40px
        font-size 16px
        position relative
        &+.tabs-item
          &:after
            content: '|'
            position absolute
            top -1px
            left 0
        &.active
          color #2475e2
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
