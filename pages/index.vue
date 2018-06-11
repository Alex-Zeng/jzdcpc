<template>
  <div>
    <el-button>我的测试</el-button>
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
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>