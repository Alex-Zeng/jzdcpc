<template>
  <div class="login-box">
    <div
      class="login-form"
      v-show="step === 1"
      element-loading-text="验证中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
    >
      <div class="title">
        <h4>验证码登录</h4>
        <span>(登录后可直接完成注册)</span>
      </div>
      <el-form ref="codeForm" :model="codeForm" :rules="codeRules">
        <el-form-item label="手机号：" prop="phone">
          <el-input
            v-model="codeForm.phone"
            placeholder="请输入手机号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="图片验证码：" prop="code">
          <el-input
            v-model="codeForm.code"
            placeholder="请输入图片验证码"
            type="password"
          >
          </el-input>
          <img :src="`${imgSrcrand}`" class="captcha" alt="点击刷新验证码" @click="updateCaptcha" v-show="imgSrcrand"/>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-button" @click="submitForm('codeForm', 'doLoginSendCode', '手机号或者图片验证码错误', codeForm)">
            下一步
          </el-button>
        </el-form-item>
        <el-form-item class="protocol">
          登录后表示您已同意<nuxt-link to="/">《集众电采用户服务协议》</nuxt-link>
        </el-form-item>
        <el-form-item class="no-password">
          <nuxt-link to="/auth" class="link">
            <i class="phone">&#xe640;</i><span>密码登录</span>
          </nuxt-link>
        </el-form-item>
      </el-form>
    </div>
    <!-- 第二步 -->
    <div
      class="login-form"
      v-show="step === 2"
      style="height:440px;"
      element-loading-text="登录中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
    >
      <div class="title">
        <h4>验证码登录</h4>
        <span>(请输入短信验证码)</span>
      </div>
      <el-form ref="validForm" :model="validForm" :rules="validRules">
        <el-form-item prop="code" class="codeInput">
          <codeInput v-model="validForm.code"></codeInput>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-button" @click="validCode">
            下一步
          </el-button>
        </el-form-item>

        <el-form-item class="no-password">
          <nuxt-link to="/auth" class="link">
            <i class="phone">&#xe640;</i><span>密码登录</span>
          </nuxt-link>
        </el-form-item>
      </el-form>
    </div>

    <!-- 第三步 -->
    <div
      class="login-form"
      v-show="step === 3"
      style="padding-top: 40px; height: 450px;"
      element-loading-text="提交中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
    >
      <div class="title">
        <h4>验证码登录</h4>
        <span>(首次登录，请设置用户名)</span>
      </div>
      <el-form ref="nameForm" :model="nameForm" :rules="nameRules">
        <el-form-item label="用户名：" prop="userName" style="margin-top: 40px">
          <el-input
            v-model="nameForm.userName"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <span style="color:#2fbeed">请输入4~20位用户名，不可纯数字</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-button" style="margin-top: 0" @click="register">
            完成
          </el-button>
        </el-form-item>

        <el-form-item class="no-password">
          <nuxt-link to="/auth" class="link">
            <i class="phone">&#xe640;</i><span>密码登录</span>
          </nuxt-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import apiCaptcha from '../../api/apiCaptcha'
import codeInput from '../../components/codeInput'
import { nameReg } from '../../helper/reg'
export default {
  name: 'login',
  components: {
    codeInput
  },
  data () {
    return {
      step: 1,
      loading: false,
      codeForm: {
        phone: '',
        code: '',
        id: '',
        codeValid: '1' // 默认验证
      },
      codeRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' }
        ]
      },
      validForm: {
        phone: '',
        code: ''
      },
      validRules: {
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      nameForm: {
        userName: ''
      },
      nameRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: nameReg, message: '用户名格式：4-20位，不能为纯数字，不可包含[. @ #]等特殊字符', trigger: 'blur' }
        ]
      },
      imgSrcrand: '',
      imgSrc: ''
    }
  },
  mounted () {
    apiCaptcha.img((data) => {
      const {src, id} = data
      this.codeForm = {...(this.codeForm), id}
      this.imgSrc = src
      this.imgSrcrand = src
    }, (msg) => {
      console.log(msg)
    })
  },
  methods: {
    submitForm (formName, action, validMsg, fileds) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch(action,
            {
              errorCb: msg => {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'error'
                })
                this.loading = false
              },
              successCb: (msg, status) => {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'success'
                })
                if (this.step === 3) {
                  this.$router.replace('/')
                } else if (this.step === 2) {
                  if (status === -3) {
                    this.step = this.step + 1
                  } else {
                    this.$router.replace('/')
                  }
                } else {
                  this.step = this.step + 1
                }
                this.loading = false
              },
              fileds: fileds
            }
          )
        } else {
          this.$message({
            showClose: true,
            message: validMsg,
            type: 'error'
          })
          return false
        }
      })
    },
    updateCaptcha () {
      this.imgSrcrand = this.imgSrc + '?' + Math.random()
    },
    validCode () {
      this.validForm = {...this.validForm, phone: this.codeForm.phone}
      this.submitForm('validForm', 'doLoginPhone', '短信验证码错误', this.validForm)
    },
    register () {
      const fileds = {
        phone: this.codeForm.phone,
        code: this.validForm.code,
        userName: this.nameForm.userName,
        channel: 0
      }
      this.submitForm('nameForm', 'doRegisterPhone', '请正确输入用户名', fileds)
    }
  }
}
</script>
<style lang="stylus" scoped>
//eslint-disable
.login-box
  background-repeat no-repeat
  background-image url("~assets/img/auth/login_bg.png")
  background-position top center
  height 699px
  padding-top 100px
  .login-form
    height 500px
    width 600px
    background url("~assets/img/auth/login_form_bg.png") no-repeat
    background rgba(0, 0, 0, 0.6)
    border-radius 8px
    margin 0 auto
    padding 22px 80px 74px 80px
    .title
      color #ffffff
      color rgba(255, 255, 255, .8)
      text-align center
      font-size 16px
      h4
        font-size 24px
    .jzdc-icon
      font-family 'jzdc'!important
      font-size 25px
      padding-right 12px
    .jzdc-icon-user
      &::before
        content '\E600'
      &::after
        content " "
        height 100%
        width 0
        display inline-block
        vertical-align middle
    .jzdc-icon-lock
      &::before
        content '\E640'
      &::after
        content " "
        height 100%
        width 0
        display inline-block
        vertical-align middle
    .login-button
      line-height 1.8
      width 100%
      font-size 20px
      margin-top 40px
    .no-password
      text-align center
      color #ffffff
      font-size 16px
      .link
          display inline-block
          .phone
            font-family 'jzdc'!important
            font-size 25px
            display inline-block
            vertical-align middle
            margin-right 8px
          span
            display inline-block
            vertical-align middle
  .codeInput
    margin-top 80px
</style>

<style lang="stylus">
//样式覆盖
.login-form
  .el-form-item
    margin-bottom 18px!important
  .el-form-item__label
    color #ffffff
    color rgba(255, 255, 255, .8)
    font-size 16px
    &::before
      content: '' !important

  .el-input__inner
    font-size 18px
    height 52px
  .el-form-item__content
    position relative
    .captcha
      height 50px
      border-left 1px solid #dfdfdf
      position absolute
      right 1px
      bottom 1px
      border-bottom-right-radius 8px
      border-top-right-radius 8px
  .protocol
      margin-top 0
      text-align left
      color #ffffff
      color rgba(255, 255, 255, .8)
      .el-form-item__content
        line-height 1
        a
          color #2fbeed
</style>
