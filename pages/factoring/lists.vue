<template>
  <div>
    <factoringHeeader></factoringHeeader>
    <div class="main">
      <span @click="$router.go(-1)" class="el-icon-back back">返回</span>
      <h3 class="title">服务记录</h3>
      <el-table
        :data="tableData"
        stripe
        style="width: 1200px;margin: auto;">
        <el-table-column
          prop="date"
          label="申请时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="申请金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="批复金额">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope, scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import factoringHeeader from '@/components/factoring/header'
export default {
  name: 'factoring-lists',
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
      }],
      currentPage: 2
    }
  },
  methods: {
    handleClick (index, row) {
      console.log(index)
      console.log(row)
      this.$router.push('/factoring/detail')
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  components: {
    factoringHeeader
  }
}
</script>
<style lang="stylus">
  .pagination
    .el-pager
      li
        &.active
          color #fff
          background #2475E2
</style>
<style lang="stylus" scoped>
  .main
    width 1300px
    margin auto
    background #ffffff
    padding 40px 0
    margin-bottom 137px
    position relative
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
    .step-row
      width 600px
      margin auto
    .form
      width 400px
      margin auto
      padding-top 40px
    .pagination
      padding-top 50px
      text-align center
      font-size 16px
</style>
