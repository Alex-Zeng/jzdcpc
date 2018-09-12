<template>
  <div>
    <factoringHeeader></factoringHeeader>
    <div class="main">
      <nuxt-link to="/factoring/lists" replace class="el-icon-back back">返回</nuxt-link>
      <h3 class="title">查看详情</h3>
      <div class="content">
          <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">申请时间</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light">2018-08-18 12:00:00</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple">申请订单号</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">W201810213</div></el-col>
          </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">申请金额</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light">300000.00元</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">申请人</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">大卫</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">联系电话</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light">13202027178</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">状态</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">待审核</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">户名</div></el-col>
          <el-col :span="19"><div class="grid-content bg-purple">广州市某某贸易公司</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">开户支行</div></el-col>
          <el-col :span="19"><div class="grid-content bg-purple">昌岗支行</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">实际批复</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light">100000.00元</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">大写</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">壹拾萬元整</div></el-col>
        </el-row>
        <div class="reason">
          <p>审核未通过</p>
          <p>拒绝理由:未通过的展示不过通过的理由，通过的不展示</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import factoringHeeader from '@/components/factoring/header'
export default {
  name: 'factoring-detail',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleClick (index, row) {
      console.log(index)
      console.log(row)
    }
  },
  components: {
    factoringHeeader
  }
}
</script>
<style lang="stylus" scoped>
  .bg-purple{
  }
  .main
    width 1300px
    margin auto
    background #ffffff
    padding 40px 0
    margin-bottom 137px
    position relative
    .content
      width 1200px
      margin auto
      color #333333
      text-align center
      line-height 48px
      .el-row
        border 1px solid #DBDBDB
        margin-top -1px
        .el-col:last-child
          border-right none
      [class*=el-col-]
        border-right 1px solid #DBDBDB
    .back
      position absolute
      top 10px
      left 10px
      color #2475E2
      cursor pointer
    .title
      text-align center
      font-size 32px
      color #333333
      margin-bottom 20px
      &::after
        content: ''
        display block
        width 2em
        border-top 4px solid #2475E2
        margin auto
        margin-top 4px
    .reason
      margin-top 20px
      min-height 100px
      text-align left
      line-height 1.5
      padding 20px 40px
      background #F5F5F5
</style>
