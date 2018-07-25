<template>
  <div class="empty-wrap">
    <img src="~assets/img/goods/empty.png" alt="">
    <span class="message">找呀找，啥也没找到</span>
    <div class="btn-wrap">
      <el-button type="primary" @click="$router.replace('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'empty'
}
</script>

<style lang="stylus" scoped>
.empty-wrap
  text-align center
  padding 100px 0
  .btn-wrap
    margin-top 50px
  img
    width 400px
    margin 0 auto
    display block
  .message
    font-size 28px
    font-weight 600
</style>
