<template>
  <div>
    <div class="top-wrap">
      <div class="content">
        <span class="welcome">集众电采欢迎您！！</span>
        <ul class="top-menu">
          <li class="item">
            <i class="icon">&#xe60f;</i>
            <span class="name">收藏(<span class="num">100</span>)</span>
          </li>
          <li class="item">
            <i class="icon">&#xe611;</i>
            <span class="name">消息(<span class="num">100</span>)</span>
          </li>
          <li class="item">
            <span class="name">退出</span>
          </li>
          <li class="item">
            <span class="name">下载手机app</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexTop'
}
</script>

<style lang="stylus" scoped>

.top-wrap
  height 50px
  background-color #dedede
  .welcome
    cursor pointer
  .content
    font-size 14px
    color #999999
    line-height 50px
.content
  width 1300px
  margin 0 auto
  position relative
.top-menu
  float right
  display flex
  .item
    cursor pointer
    display flex
    margin-left 20px
    .name
      color #666666
      padding-left 6px
  .icon
    font-family 'jzdc'
    font-size 24px
  .num
    color #ff7900
</style>
