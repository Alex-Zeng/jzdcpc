<template>
  <div style="text-align:center;margin-top:200px;">
    <div>
      {{
        data
      }}
    </div>

    <el-button>组件测试</el-button>
  </div>
</template>

<style lang="stylus">
  .el-header
    background-color #B3C0D1;
    color #333;
    line-height 60px;

  .el-aside
    color #333
</style>

<script>
  export default {
    computed: {
      data() {
        return this.$store.state.test.goodsRecommend;
      }
    },

    async asyncData({store}) {
      // 数据测试
      store.dispatch('getGoodsRecommend')
    }
  };
</script>
