<template>
  <div>
    <indexHeader :isOpen="showMenu"></indexHeader>
    <div class="search-wrap">
      <nuxt-link to="/" class="back">返回</nuxt-link>
      <ul class="tags">
        <li class="item">
          <dl class="item-dl clearfix">
            <dt><div class="label">商品大类</div></dt>
            <dd>
              <div class="dditem" v-for="i in categoryList" :key="i.id" @click="changeCate(1, i.child, i.id)" :class="{active: i.id == selectId}">{{i.name}}</div>
            </dd>
          </dl>
        </li>
        <li class="item">
          <dl class="item-dl clearfix">
            <dt>
              <div class="label">物料类别</div>
            </dt>
            <dd>
              <div class="dditem" v-for="i in child" :key="i.id" @click="changeCate(2, i.child, i.id)" :class="{active: i.id == childId}">{{i.name}}</div>
            </dd>
          </dl>
        </li>
        <li class="item">
          <dl class="item-dl clearfix">
            <dt>
              <div class="label">物料名称</div>
            </dt>
            <dd><div class="dditem" v-for="i in superChild" :key="i.id" @click="changeCate(3, [], i.id)" :class="{active: i.id == scId}">{{i.name}}</div></dd>
          </dl>
        </li>
      </ul>
      <div class="sort-bar clearfix">
        <ul class="sorts clearfix">
          <li class="item">默认排序</li>
          <li :class="{item:true, sort: true, up}" @click="sort(!up)">价格</li>
        </ul>
        <div class="right">
          <div class="info">发现 {{all.keywords}} 共有 {{total}} 件商品</div>
        </div>
      </div>
      <empty v-if="list.length <= 0"></empty>
      <div v-else>
        <div class="result clearfix">
          <div class="item" v-for="i in list" :key="i.id" @click="$router.push('/goods/detail/'+i.id)">
            <div class="top">
              <img :src="i.url" alt="">
              <div v-if="!(i.isFavorite)" @click.stop="favorite(i.id, i)">
                <i class="star">&#xe60f;</i>
                <span>收藏</span>
              </div>
              <div style="color: #ff7900" v-else @click.stop="favoriteDelete(i.id, i)">
                <i class="star">&#xe60f;</i>
                <span>收藏</span>
              </div>
            </div>
            <div class="bottom">
              <span class="title">{{i.title}}</span>
              <h4 class="money">¥<span class="num">{{i.min_price}}-{{i.max_price}}</span></h4>
            </div>
          </div>
        </div>
        <div class="pager" style="margin-top: 20px; margin-bottom: 40px;">
          <el-pagination
            background
            :total="total"
            :page-size="12"
            :current-page="pageNumber"
            @current-change="page"
          >
          </el-pagination>
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
import apiSearch from '../../api/apiSearch'
const pageSize = 12
export default {
  components: {
    indexHeader,
    indexFooter,
    empty
  },
  computed: {
    categoryList () {
      return this.$store.getters.categoryList.data
    }
  },
  data () {
    return {
      showMenu: false,
      list: [],
      total: 0,
      pageNumber: 1,
      up: true,
      all: {},
      child: [],
      superChild: [],
      selectId: -1,
      childId: -1,
      scId: -1
    }
  },
  watch: {
    '$route': async function () {
      setTimeout(() => {
        const {params: {all}} = this.$route
        let json = JSON.parse(all)
        this.all = json
        if (json.selectId) {
          this.selectId = json.selectId
        }
        if (json.childId) {
          this.childId = json.childId
          const list = this.categoryList
          list.forEach((i) => {
            if (parseInt(i.id) === parseInt(json.selectId)) {
              this.child = i.child
            }
          })
        }
        if (json.scId) {
          const list = this.child
          list.forEach((i) => {
            if (parseInt(i.id) === parseInt(json.childId)) {
              this.superChild = i.child
            }
          })
          this.scId = json.scId
        }
        this.search()
      }, 100)
    },
    'categoryList': function () {
      setTimeout(() => {
        const {params: {all}} = this.$route
        let json = JSON.parse(all)
        if (json.selectId) {
          this.selectId = json.selectId
        }
        if (json.childId) {
          this.childId = json.childId
          const list = this.categoryList
          list.forEach((i) => {
            if (parseInt(i.id) === parseInt(json.selectId)) {
              this.child = i.child
            }
          })
        }
        if (json.scId) {
          const list = this.child
          list.forEach((i) => {
            if (parseInt(i.id) === parseInt(json.childId)) {
              this.superChild = i.child
            }
          })
          this.scId = json.scId
        }
      }, 100)
    }
  },
  methods: {
    favorite (goodsId, item) {
      this.$store.dispatch('addFavorite', {fileds: {goodsId},
        scb: (msg) => {
          this.$message({
            type: 'success',
            message: msg
          })
          item.isFavorite = 1
        },
        ecb: (msg) => {
          this.$message.error(msg)
        }
      })
    },
    favoriteDelete (id, i) {
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
            loading.close()
            i.isFavorite = 0
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
    },
    sort (isUp) {
      this.up = isUp
      this.all = {...this.all, sort: isUp ? 'asc' : 'desc'}
      this.$router.push('/goods/search/' + JSON.stringify(this.all))
    },
    page (page) {
      this.all = {...this.all, pageNumber: page}
      this.$router.push('/goods/search/' + JSON.stringify(this.all))
    },
    changeCate  (type, child, id) {
      switch (type) {
        case 1:
          this.child = child
          this.selectId = id
          this.all.selectId = id
          this.superChild = []
          break
        case 2:
          this.childId = id
          this.all.childId = id
          this.superChild = child
          break
        case 3:
          this.scId = id
          this.all.scId = id
          break
      }
      this.all.cateId = id
      this.$router.push('/goods/search/' + JSON.stringify(this.all))
    },
    async search () {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      await apiSearch.search((data) => {
        loading.close()
        const {list, total} = data
        this.list = list
        this.total = total
      }, {...this.all, pageSize})
    }
  },
  async mounted () {
    const {params: {all}} = this.$route
    let json = JSON.parse(all)
    this.all = json
    this.search()
  },
  name: 'search'
}
</script>

<style lang="stylus" scoped>
.search-wrap
  width 1300px
  margin 0 auto
  .tags
    font-size 14px
    .item + .item
      border-top 1px solid #dedede
    .item-dl
      height auto !important
      height 43px
      min-height 43px
      display flex
      dt
        height auto !important
        height 43px
        min-height 43px
        background-color #2475e2
        color #ffffff
        width 150px
        text-align center
        height auto
        position relative
        .label
          position absolute
          left 50%
          top 50%
          transform translateX(-50%) translateY(-50%)
          -ms-transform translateX(-50%) translateY(-50%)
      dd
        text-align center
        width 1150px
        background-color #fff
        color #666666
        cursor pointer
        .dditem
          float left
          padding 12px 20px
          &:hover
            color #2475e2
          &.active
            color #2475e2
  .sort-bar
    font-size 16px
    color #333333
    margin-top 20px
    background-color #f5f7fa
    border 1px solid #dddddd
    .right
      float right
      padding 12px 19px
    .sorts
      float left
      cursor pointer
      .item
        float left
        padding 12px 19px
        min-width 103px
        text-align center
        border-right 1px solid #ddd
        &.sort
          position relative
          font-family 'jzdc'
          display block
          padding-left 12px
          &.up
            &:after
              content '\e635'
              position absolute
              right 24px
              top 10px
              font-size 12px
              color #ff7900
            &:before
              content '\e62b'
              position absolute
              right 24px
              bottom 10px
              font-size 12px
              color #999
          &:after
            content '\e635'
            position absolute
            right 24px
            top 10px
            font-size 12px
            color #999
          &:before
            content '\e62b'
            position absolute
            right 24px
            bottom 10px
            font-size 12px
            color #ff7900

  .back
    color #2475e2
    font-size 14px
    font-weight 600
    padding 20px 0 22px 0
    display block
    &:before
      content '\e67d'
      font-family 'jzdc'
      margin-right 10px
  .result
    margin-top 20px
    .item
      float left
      width 310px
      box-sizing border-box
      background-color #ffffff
      margin-bottom 20px
      border 1px solid #ddd
      .bottom
        padding 20px 15px
        .title
          font-size 14px
          color #333
          height 38px
          display block
          overflow hidden
          cursor pointer
        .money
          padding-top 6px
          color #ff0000
          .num
            font-size 18px
      .top
        padding 20px 15px 10px
        border-bottom 1px solid #ddd
        font-size 16px
        color #666666
        .star
          font-family 'jzdc'
          font-size 24px
          float left
          margin-right 6px
          cursor pointer
        span
          line-height 26px
          cursor pointer
        img
          width 100%
          height 280px
          display block
          padding-bottom 10px
    .item
      margin-right 19px
      &:nth-child(4n)
        margin-right 0
</style>
