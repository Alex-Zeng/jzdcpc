<template>
  <div class="cert-index-wrap">
    <h4 class="title">请选择认证人的身份</h4>
    <div class="radio-box">
      <el-radio label="0" v-model="agent">我是企业法人</el-radio>
      <el-radio label="1" v-model="agent">我是企业委托代理人</el-radio>
      <el-radio label="2" v-model="agent">加入已经认证的企业</el-radio>
    </div>
    <!--<h4 class="title" style="margin-top: 30px;">请选择认证的企业类型</h4>
    <div class="radio-box">
      <el-radio label="1" v-model="type">我是采购商</el-radio>
      <el-radio label="2" v-model="type">我是供应商</el-radio>
    </div>-->
    <el-button type="primary" class="next" @click="nextStep">下一步</el-button>
    <el-dialog
      title="加入已认证的企业"
      :visible.sync="addFirstDialogVisible"
      width="500px"
      center>
      <el-form ref="form" :model="form" :rules="rules" style="margin-top: 20px;">
        <el-form-item prop="code" label="1.请输入绑定验证码：">
          <el-input
            v-model="form.code"
            type="text"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFirst('form')">下一步</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="加入已认证的企业"
      :visible.sync="addSecondDialogVisible"
      width="30%"
      center>
      <div class="el-dialog-content">
        <h3>请确认信息是否正确，如有误请关闭后联系客服</h3>
        <ul>
          <li><label>公司名称</label><div>{{depatmentData.companyName}}</div></li>
          <li><label>所属部门</label><div>{{depatmentData.organizationName}}</div></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSave()">确认加入</el-button>
        </span>
    </el-dialog>
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
  .el-dialog__header
    background: #F5F5F5;
    text-align left
  .el-dialog-content
    font-size 18px
    color #666666
    h3
      font-weight normal
      padding-bottom 20px
    ul
      font-size 16px
      border 1px solid #cccccc
      border-bottom none
      li
        border-bottom 1px solid #cccccc
        height 40px
        line-height 40px
        text-align center
        display flex
        align-items center
        label
          font-size 14px
          display inline-block
          width 120px
          border-right 1px solid #cccccc
        div
          flex 1
</style>
<style lang="stylus" scoped>
</style>
<script>
import apiCert from '@/api/apiCert'
export default {
  head () {
    return {
      title: '企业认证'
    }
  },
  data () {
    return {
      agent: '0',
      type: '1',
      form: {
        code: ''
      },
      depatmentData: {
        companyName: '',
        organizationName: ''
      },
      addFirstDialogVisible: false,
      addSecondDialogVisible: false,
      rules: {
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    nextStep () {
      if (this.agent == 0 || this.agent == 1) {
        this.$router.push('/user/setting/cert/submit/' + this.type + '/' + this.agent)
      } else {
        this.addFirstDialogVisible = true
      }
    },
    async getPushTypeAndGoods (formName) {
      await apiCert.invitationVerify({code: this.form.code}, (response) => {
        const {data, msg, status} = response
        if (status === 0) {
          this.depatmentData = data
          this.addFirstDialogVisible = false
          this.addSecondDialogVisible = true
          this.$refs[formName].resetFields()
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          })
        }
      })
    },
    submitFirst (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getPushTypeAndGoods(formName)
        }
      })
    },
    handleSave () {
      apiCert.invitationVerify({code: this.form.code}, (response) => {
        const {msg, status} = response
        if (status === 0) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          })
          this.addSecondDialogVisible = false
          this.$store.dispatch('getRole')
          this.$router.push('/user/setting/cert/submit')
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          })
        }
      })
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
      if (role == '采购商') {
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
