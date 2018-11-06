<template>
  <div class="container">
    <div class="header">
      <span class="title">我的商品</span>
    </div>
    <el-form :inline="true" :model="searchForm" style="padding-top: 20px;">
      <el-form-item label="产品名称">
        <el-input v-model="searchForm.keyword"></el-input>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      @row-click="handleClick"
      style="width: 100%">
      <el-table-column
        prop="imgUrl"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" class="goods-img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="spuCode"
        label="SPU码">
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        label="上架时间">
      </el-table-column>
      <el-table-column
        prop="salesNumber"
        label="累积销量">
      </el-table-column>
      <template slot="empty">
        <div class="empty-box">
          <img src="@/assets/img/common/goods-empty.png" alt="">
          <p>暂无商品哦</p>
        </div>
      </template>
    </el-table>
    <div class="pager" v-if="tableData.length > 0">
      <el-pagination
        background
        :total="total"
        :page-size="10"
        :current-page="pageNumber"
        @current-change="getList"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import apiMyGoods from '@/api/apiMyGoods'
export default {
  name: 'commodity-management',
  data () {
    return {
      total: 0,
      pageNumber: 1,
      searchForm: {
        keyword: ''
      },
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      await apiMyGoods.getProductList((data) => {
        this.tableData = data.list
        this.total = data.total
      }, {pageSize: 10, pageNumber: this.pageNumber, keyword: this.searchForm.keyword})
    },
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
<style>
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td {
    background: #2475E2;
    color: #fff;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #2475E2;
    color: #fff;
  }
  .el-dialog{
    border-radius: 5px;
    overflow: hidden;
  }
  .el-dialog__header{
    background: #F5F5F5;
  }
  .container .el-table th {
    background: #DDDDDD;
    color: #333333;
    text-align: center;
  }
  .el-dialog__header{
    text-align: left;
  }
  .container td {
    text-align: center;
  }
  .container .el-table__empty-block{
    height: 560px;
  }
</style>
<style lang="stylus" scoped>
  .container
    padding 10px
    font-size 16px
    .header
      display flex
      justify-content space-between
      .title
        border-left 4px solid #FF7900
        color #333333
        padding-left 0.5em
        font-weight bold
      .button
        margin 0 10px
        background transparent
        border-color transparent
        color #2475E2
        cursor pointer
    h3
      text-align center
      padding 20px
  .dialog-header
    display flex
    justify-content space-between
    font-size 18px
    color #ffffff
    padding-bottom 40px
    .department
      background #FF7900
      margin-left -20px
      height 48px
      line-height 48px
      padding 0 50px
      border-radius 0 5px 5px 0
    button
      color #2475E2
      background transparent
      outline-color transparent
      font-size 16px
      border-color transparent
      padding 10px
      cursor pointer
  .dialog-content
    display flex
    font-size 16px
    img
      display block
      width 112px
      height 112px
      background #F5F5F5
      border-radius 50%
    .info
      flex 1
      text-align left
      padding 0 20px
      padding-bottom 80px
      li
        padding 5px 0
        p
          padding 5px 0
  .icon
    font-family 'jzdc'
    color #FF7900
  .success-content
    text-align center
    font-size 18px
    color #666666
    img
      width 68px
      height 68px
      display inline-block
      margin 20px
  .empty-box
    height auto
    text-align center
    p
      padding-top 10px
      padding-bottom 20px
  .goods-img
    display inline-block
    width 60px
    height 52px
    background #f5f5f5
</style>
