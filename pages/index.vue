<template>
  <div>
    <indexHeader></indexHeader>
    <div>
    </div>
    <el-button @click="getData">组件测试</el-button>
  </div>
</template>

<style lang="stylus" scoped>
.el-header
  background-color #B3C0D1
  color #333
  line-height 60px
.header
  height 60px
  line-height 1
</style>

<script>
import indexHeader from '../components/index/header'
export default {
  components: {
    indexHeader
  },
  data () {
    return {
      filename: ''
    }
  },
  computed: {
    data () {
      return this.$store.getters.favoriteList
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      this.$store.dispatch('getFavoriteList', {pageSize: 10, pageNumber: 1, field: 'time', sort: 'asc'})
    }
  }
}
</script>
