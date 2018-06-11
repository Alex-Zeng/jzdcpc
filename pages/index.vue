<template>
  <div style="text-align:center;margin-top:200px;">
    <div>
      {{
        data.list[0].title
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
  import request from '../service'
  export default {
    async asyncData() {
      // 数据测试
      const {data} = await request.post('/papi/goods/getRecommend')
      return {data}
    }
  };
</script>
