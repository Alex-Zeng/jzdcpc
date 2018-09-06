<template>
  <div>
    <factoringHeeader></factoringHeeader>
    <div class="main">
      <h3 class="title">3步轻松搞定</h3>
      <div class="step-row">
        <el-steps :active="active" finish-status="success">
          <el-step title="意向登记"></el-step>
          <el-step title="审核签约"></el-step>
          <el-step title="放款"></el-step>
        </el-steps>
      </div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="订单号：">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="订单金额：">
            <el-input v-model="form.goodsMoney"></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="投资金额：">
            <el-input v-model="form.money"></el-input>
          </el-form-item>
          <el-form-item label="户名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="对公账号：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="再次输入：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开户支行：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button style="padding-left: 100px;padding-right: 100px;" type="primary" @click="next">提交意见</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="300px"
      center>
      <span>提交成功！我们将尽快与您联系</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">&emsp;&emsp;好&nbsp;的&emsp;&emsp;</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import factoringHeeader from '@/components/factoring/header'
export default {
  name: 'factoring-form',
  data () {
    return {
      active: 0,
      form: {

      },
      centerDialogVisible: false
    }
  },
  methods: {
    next () {
      this.active = 1
      this.centerDialogVisible = true
    }
  },
  components: {
    factoringHeeader
  }
}
</script>
<style lang="stylus">
  .step-row
    .is-success
      color #2475E2
      border-color #2475E2
</style>
<style lang="stylus" scoped>
  .main
    width 1300px
    margin auto
    background #ffffff
    padding 40px 0
    margin-bottom 137px
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
</style>
