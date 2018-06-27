<template>
  <div style="text-align:center;margin-top:200px;">
    <div>
      <uploadImg></uploadImg>
    </div>

    <el-button @click="getData">组件测试</el-button>
  </div>
</template>

<style lang="stylus">
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import uploadImg from '../components/uploadImg'
export default {
  components: {
    uploadImg
  },
  computed: {
    data () {
      return this.$store.getters.favoriteList
    }
  },

  methods: {
    getData () {
      this.$store.dispatch('getFavoriteList', {pageSize: 10, pageNumber: 1, field: 'time', sort: 'asc'})
    }
  }
}
</script>
