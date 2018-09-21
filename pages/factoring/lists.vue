<template>
  <div>
    <factoringHeeader></factoringHeeader>
    <div class="main">
      <span @click="$router.go(-1)" class="el-icon-back back">返回</span>
      <h3 class="title">服务记录</h3>
      <el-table
        :data="factoringList"
        stripe
        style="width: 1200px;margin: auto;">
        <el-table-column
          prop="dataTime"
          label="申请时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderSn"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="needAccount"
          label="申请金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="loanAccount"
          label="批复金额">
        </el-table-column>
        <el-table-column
          prop="stateName"
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
      <div class="pagination" v-if="false">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import factoringHeeader from '@/components/factoring/header'
import apiFactoring from '@/api/apiFactoring'
export default {
  name: 'factoring-lists',
  data () {
    return {
      currentPage: 1,
      total: 0,
      factoringList: []
    }
  },
  methods: {
    async getFactoringList () {
      await apiFactoring.getFactoringList((data) => {
        this.factoringList = data.data.factoringList
      })
    },
    handleClick (index, row) {
      this.$router.push(`/factoring/detail/${row.factoringId}`)
    },
    handleCurrentChange (val) {
      this.$router.push(`/factoring/${val}`)
    }
  },
  created () {
    this.getFactoringList()
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
