<template>
  <div>
    <factoringHeeader></factoringHeeader>
    <div class="main">
      <nuxt-link to="/factoring/lists/1" replace class="el-icon-back back">返回</nuxt-link>
      <h3 class="title">查看详情</h3>
      <div class="content">
          <el-row>
            <el-col :span="5"><div class="grid-content bg-purple">申请时间</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light">{{factoringDetail.dataTime? factoringDetail.dataTime: '&emsp;'}}</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple">申请订单号</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">{{factoringDetail.orderSn? factoringDetail.orderSn: '&emsp;'}}</div></el-col>
          </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">申请金额</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light">{{factoringDetail.needAccount? factoringDetail.needAccount: '&emsp;'}}元</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">申请人</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">{{factoringDetail.contactUsername? factoringDetail.contactUsername: '&emsp;'}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">联系电话</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light">{{factoringDetail.contactphone? factoringDetail.contactphone: '&emsp;'}}</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">状态</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">{{factoringDetail.stateName? factoringDetail.stateName: '&emsp;'}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">户名</div></el-col>
          <el-col :span="19"><div class="grid-content bg-purple">{{factoringDetail.name? factoringDetail.name: '&emsp;'}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">对公账号</div></el-col>
          <el-col :span="19"><div class="grid-content bg-purple">{{factoringDetail.bankCorporate? factoringDetail.bankCorporate: '&emsp;'}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">开户支行</div></el-col>
          <el-col :span="19"><div class="grid-content bg-purple">{{factoringDetail.bankAddress? factoringDetail.bankAddress: '&emsp;'}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="5"><div class="grid-content bg-purple">实际批复</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light">{{factoringDetail.loanAccount? factoringDetail.loanAccount: '&emsp;'}}元</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">大写</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">{{UpperCase}}</div></el-col>
        </el-row>
        <div class="reason">
          <p>{{factoringDetail.stateName}}</p>
          <p v-show="factoringDetail.reasons">拒绝理由：{{factoringDetail.reasons}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import factoringHeeader from '@/components/factoring/header'
import apiFactoring from '@/api/apiFactoring'
export default {
  name: 'factoring-detail',
  head () {
    return {
      title: '保理详情'
    }
  },
  data () {
    return {
      UpperCase: '',
      factoringDetail: {}
    }
  },
  methods: {
    async getFactoringDetail () {
      await apiFactoring.getFactoringDetail({factoringId: this.$route.params.page}, (data) => {
        this.factoringDetail = data.data.factoringDetail
        this.UpperCase = this.DX(this.factoringDetail.loanAccount)
      })
    },
    handleClick (index, row) {
      console.log(index)
      console.log(row)
    },
    DX (n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) { return '数据非法' }
      let unit = '千百拾亿千百拾万千百拾元角分'
      let str = ''
      n += '00'
      var p = n.indexOf('.')
      if (p >= 0) { n = n.substring(0, p) + n.substr(p + 1, 2) }
      unit = unit.substr(unit.length - n.length)
      for (var i = 0; i < n.length; i++) { str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i) }
      return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
    }
  },
  created () {
    this.getFactoringDetail()
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
