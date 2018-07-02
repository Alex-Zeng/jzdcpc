<template>
  <div class="cert-index-wrap">
    <h4 class="title">请选择认证人的身份</h4>
    <div class="radio-box">
      <el-radio label="0" v-model="agent">我是企业法人</el-radio>
      <el-radio label="1" v-model="agent">我是企业委托代理人</el-radio>
    </div>
    <h4 class="title" style="margin-top: 30px;">请选择认证的企业类型</h4>
    <div class="radio-box">
      <el-radio label="1" v-model="type">我是采购商</el-radio>
      <el-radio label="2" v-model="type">我是供应商</el-radio>
    </div>
    <el-button type="primary" class="next" @click="nextStep">下一步</el-button>
  </div>
</template>

<style lang="stylus">
  .cert-index-wrap
    padding 40px 24px
    .title
      color #2fbeed
      font-size 18px
      font-weight 400
    .radio-box
      margin-top 14px
      margin-bottom 8px
    .next
      margin-top 24px
      width 366px
      height 42px
</style>

<script>
export default {
  data () {
    return {
      agent: '0',
      type: '1'
    }
  },
  methods: {
    nextStep () {
      this.$router.push('/user/setting/cert/submit/' + this.type + '/' + this.agent)
    }
  },
  mounted () {
    this.$store.dispatch('getCert', (data) => {
      const {agentIdentityCard, role, status} = data
      if (agentIdentityCard) {
        this.agent = '1'
      } else {
        this.agent = '0'
      }
      if (role === '采购商') {
        this.type = '1'
      } else {
        this.type = '2'
      }
      if (status) {
        this.$router.push('/user/setting/cert/submit/' + this.type + '/' + this.agent)
      }
    })
  }
}
</script>
