<template>
  <div class="submit-wrap">
    <div v-show="form.status !== 0" class="cert-status">
      <div v-show="form.status == '1'">
        工作人员努力审核中，请耐心等待
      </div>
      <div v-show="form.status == '2'">
        您的企业认证已经通过审核
      </div>
      <div v-show="form.status == '3'">
        您的企业认证已被拒绝，拒绝原因：{{this.form.refuseReason}}
      </div>
    </div>
    <div class="title">企业基本信息<span>（请按营业执照填写）</span></div>
    <div class="form-wrap">
      <el-form ref="certform" :model="form" :rules="rules" label-width="80px" style="width: 1060px;">
        <div class="clearfix">
          <el-form-item prop="companyName" label="企业名称" style="width: 520px;float: left;">
            <el-input v-model="form.companyName" :disabled="form.status == '1'?true:false"></el-input>
          </el-form-item>
          <el-form-item label="注册类型" prop="property" style="width: 520px;float: right;">
            <el-select style="width: 100%;" v-model="form.property" :disabled="form.status == '1'?true:false">
              <el-option label="有限责任公司" value="0"></el-option>
              <el-option label="股份有限公司" value="1"></el-option>
              <el-option label="个体工商户" value="2"></el-option>
              <el-option label="合伙企业" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="clearfix">
          <el-form-item label="法人代表" prop="representative" style="width: 520px;float: left;">
            <el-input v-model="form.representative" :disabled="form.status == '1'?true:false"></el-input>
          </el-form-item>
          <el-form-item label="注册资本" prop="capital" style="width: 520px;float: right;">
            <el-input v-model="form.capital" :disabled="form.status == '1'?true:false">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </div>

        <el-form-item label="住所" prop="address">
          <el-input v-model="form.address" :disabled="form.status == '1'?true:false"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">证件影像资料上传<span>（仅限JPG/JEPG/BMP/PNG等格式，单张8M以内）</span></div>
    <div class="label"><span>*</span>必传资料：<a style="color:#2475e2;cursor:pointer;" href="/template/授权委托书模板.docx" target="_blank">(点击查看委托授权书模板)</a></div>
    <div class="imgBox clearfix">
      <div class="item">
        <uploadImg id="1" v-model="form.business" :defaultPath="form.businessPath" title="工商营业执照"></uploadImg>
      </div>
      <div class="item">
        <uploadImg id="2" v-model="form.permitsAccount" :defaultPath="form.permitsAccountPath" title="开户许可证"></uploadImg>
      </div>
      <div class="item">
        <uploadImg id="3" v-model="form.legalIdentityCard" :defaultPath="form.legalIdentityCardPath" title="企业法人身份证"></uploadImg>
      </div>
      <div class="item" v-show="form.agent == 1">
        <uploadImg id="4" v-model="form.attorney" :defaultPath="form.attorneyPath" title="授权委托书"></uploadImg>
      </div>
    </div>
    <div class="imgBox clearfix">
      <div class="item" v-show="form.agent == 1">
        <uploadImg id="5" v-model="form.agentIdentityCard" :defaultPath="form.agentIdentityCardPath" title="代理人身份证"></uploadImg>
      </div>
    </div>

    <div class="label">选填资料（未三证合一）：</div>
    <div class="imgBox clearfix">
      <div class="item">
        <uploadImg id="6" v-model="form.orgStructureCode" :defaultPath="form.orgStructureCodePath" title="组织机构代码证"></uploadImg>
      </div>
      <div class="item">
        <uploadImg id="7" v-model="form.taxRegistrationCert" :defaultPath="form.taxRegistrationCertPath" title="税务登记证"></uploadImg>
      </div>
    </div>
    <div class="button-box">
      <el-button type="primary" style="width: 180px;" @click="cert">提交</el-button>
    </div>
  </div>
</template>

<script>
import uploadImg from '../../../../components/uploadImg'
export default {
  components: {
    uploadImg
  },
  data () {
    return {
      form: {
        type: 1,
        agent: 1,
        companyName: '',
        representative: '',
        property: 0,
        address: '',
        business: '',
        businessPath: '',
        permitsAccount: '',
        legalIdentityCard: '',
        agentIdentityCard: '',
        orgStructureCode: '',
        taxRegistrationCert: '',
        attorney: '',
        permitsAccountPath: '',
        legalIdentityCardPath: '',
        agentIdentityCardPath: '',
        orgStructureCodePath: '',
        taxRegistrationCertPath: '',
        attorneyPath: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名', trigger: 'blur' }
        ],
        property: [
          { required: true, message: '请选择注册类型', trigger: 'blur' }
        ],
        representative: [
          { required: true, message: '请输入法定代表人姓名', trigger: 'blur' }
        ],
        capital: [
          { required: true, message: '请输入注册资金', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$store.dispatch('getCert', (data) => {
      const {params: {type, agent}} = this.$route
      this.form = {...data, type, agent}
    })
  },
  methods: {
    cert () {
      this.$refs['certform'].validate((valid) => {
        if (valid) {
          if (!(this.form.business)) {
            this.$message.error('请上传营业执照!')
            return ''
          }
          if (!(this.form.permitsAccount)) {
            this.$message.error('请上传开户许可证!')
            return ''
          }
          if (!(this.form.legalIdentityCard)) {
            this.$message.error('请上传法人身份证!')
            return ''
          }
          if (this.form.agent == 1 || this.form.agent == '1') {
            if (!(this.form.attorney)) {
              this.$message.error('请上传代办人委托书!')
              return ''
            }
            if (!(this.form.agentIdentityCard)) {
              this.$message.error('请上传代理人身份证!')
              return ''
            }
          }
          const loading = this.$loading({
            lock: true,
            text: '提交中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$store.dispatch('doCert', {
            fileds: this.form,
            successCb: (msg) => {
              this.$message(
                {
                  type: 'success',
                  message: msg
                }
              )
              loading.close()
              this.$router.replace('/user/setting/cert')
            },
            errorCb: (msg) => {
              loading.close()
              this.$message.error(msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .submit-wrap
    padding 44px 0
    .preview
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      background-color rgba(0, 0, 0, 0.4)
      z-index 9999
      img
        width 900px
        height 648px
        display block
        left 50%
        top 50%
        position absolute
        margin-left -450px
        margin-top -324px
    .cert-status
      background-color #2475e2
      padding: 40px
      color #fff
      text-align center
      font-size 16px
      margin-bottom 40px
      margin-top -24px
    .button-box
      width 1080px
      text-align center
    .title
      font-size 18px
      color #2475e2
      padding-left 10px
      border-left 10px solid #2475e2
      span
        font-size 16px
    .form-wrap
      margin-top 26px
    .label
      color #737373
      font-size 16px
      margin-top 18px
      margin-bottom 9px
      span
        color #ff0101
    .imgBox
      width 1080px
      margin-bottom 40px
      .item
        width 220px
        float left
        margin-right 40px
        &:last-child
          margin-right 0
</style>
