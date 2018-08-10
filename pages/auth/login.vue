<template>
  <div class="login-box">
    <div
      class="login-form"
      v-show="step == 1"
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
          >
          </el-input>
          <img :src="`${imgSrcrand}`" class="captcha" alt="点击刷新验证码" @click="updateCaptcha" v-show="imgSrcrand"/>
        </el-form-item>
        <el-form-item prop="smsCode" label="短信验证码：">
          <el-input
            v-model="codeForm.smsCode"
            placeholder="请输入短信验证码"
            type="number"
          >
          </el-input>
          <smsButton
            class="sms-button"
            api="/papi/code/loginSend"
            :fileds="this.codeForm"
            :ok="!(codeForm.code)"
          ></smsButton>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-button" @click="validCode">
            下一步
          </el-button>
        </el-form-item>
        <el-form-item class="protocol">
          登录后表示您已同意<nuxt-link to="/">《集众电采用户服务协议》</nuxt-link>
        </el-form-item>
        <el-form-item class="no-password" style="height: 30px;">
          <nuxt-link to="/auth" class="link" style="color:#ddd;">
            <i class="phone">&#xe640;</i><span>密码登录</span>
          </nuxt-link>
        </el-form-item>
      </el-form>
    </div>

    <!-- 第2步 -->
    <div
      class="login-form"
      v-show="step == 2"
      style="padding-top: 100px; height: 450px;"
      element-loading-text="提交中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-lock="true"
      v-loading="loading"
    >
      <div class="title">
        <span>(首次登录，请设置用户名)</span>
      </div>
      <el-form ref="nameForm" :model="nameForm" :rules="nameRules">
        <el-form-item label="用户名：" prop="userName" style="margin-top: 10px">
          <el-input
            v-model="nameForm.userName"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" style="margin-top: 20px">
          <el-input
            v-model="nameForm.password"
            placeholder="请输入密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-button" style="margin-top: 10px" @click="register">
            完成
          </el-button>
        </el-form-item>

        <el-form-item class="no-password">
          <nuxt-link to="/auth" class="link" style="color:#ddd;">
            <i class="phone">&#xe640;</i><span>密码登录</span>
          </nuxt-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import apiCaptcha from '../../api/apiCaptcha'
import { nameReg, passwordReg } from '../../helper/reg'
import smsButton from '../../components/smsButton'
export default {
  name: 'login',
  components: {
    smsButton
  },
  data () {
    return {
      step: 1,
      loading: false,
      codeForm: {
        phone: '',
        code: '',
        id: '',
        smsCode: '',
        codeValid: '1' // 默认验证
      },
      codeRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      nameForm: {
        userName: '',
        password: ''
      },
      nameRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: nameReg, message: '用户名格式：4-20位，不能为纯数字，不可包含[. @ #]等特殊字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式由长度6-20位的字母、数字、符号至少两种组成' }
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
                if (this.step == 2) {
                  this.$router.replace('/')
                } else if (this.step == 1) {
                  if (status == -3) {
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
      this.validForm = {phone: this.codeForm.phone, code: this.codeForm.smsCode}
      this.submitForm('codeForm', 'doLoginPhone', '短信验证码错误', this.validForm)
    },
    register () {
      const fileds = {
        phone: this.codeForm.phone,
        code: this.validForm.code,
        userName: this.nameForm.userName,
        password: this.nameForm.password,
        channel: 0
      }
      this.submitForm('nameForm', 'doRegisterPhone', '请正确输入用户名和密码', fileds)
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
  padding-top 60px
  .login-form
    height 600px
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
      margin-top 20px
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
    .sms-button
      position absolute
      right 1px
      height 50px
      bottom 1px
      border-top-left-radius 0
      border-bottom-left-radius 0
      border-left 1px solid #dfdfdf
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
