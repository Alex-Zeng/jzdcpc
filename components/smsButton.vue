<template>
  <div>
    <el-button
      type="primary"
      class="smsButton"
      @click="send"
      :disabled="ok || locking"
      v-loading="sending"
      element-loading-spinner="el-icon-loading"
      element-loading-lock="true"
      element-loading-text="发送中"
    >
        {{locking? count + 's' : '获取验证码'}}
    </el-button>
  </div>
</template>

<style lang="stylus" scoped>
.smsButton
  height 100%
  width 112px
</style>

<script>
import request from '../service'
export default {
  name: 'smsButton',
  props: {
    api: String,
    fileds: Object,
    ok: Boolean
  },
  data () {
    return {
      sending: false,
      locking: false,
      count: 0
    }
  },
  methods: {
    async send () {
      this.sending = true
      const { msg, status } = await request.post(this.api, this.fileds)
      if (status === 1) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        })
        this.locking = true
        this.count = 60
        this.doCount()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      }
      this.sending = false
    },
    doCount () {
      setTimeout(() => {
        if (this.count <= 0) {
          this.locking = false
          return
        }
        this.doCount()
        this.count -= 1
      }, 1000)
    }
  }
}
</script>
