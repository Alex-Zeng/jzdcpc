<template>
  <div class="forget-box">
    <div
      class="forget-form"
      v-show="step === 1"
      element-loading-text="验证中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
    >
      <el-form ref="phoneForm" :model="phoneForm" :rules="phoneRules" style="margin-top: 120px;">
        <el-form-item label="手机号：" prop="phone">
          <el-input
            v-model="phoneForm.phone"
            placeholder="请输入手机号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="next-button" @click="checkPhone">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 第二步 -->
    <div
      class="forget-form"
      v-show="step === 2"
      element-loading-text="提交中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-lock="true"
      v-loading="loading"
    >
      <div class="title">
        <h4>{{phoneForm.phone}}</h4>
      </div>
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" style="margin-top: 20px;">
        <el-form-item prop="imgCode" label="图片验证码：">
          <el-input
            v-model="passwordForm.imgCode"
            placeholder="请输入图片验证码"
          >
          </el-input>
          <img :src="`${imgSrcrand}`" class="captcha" alt="点击刷新验证码" @click="updateCaptcha" v-show="imgSrcrand"/>
        </el-form-item>
        <el-form-item prop="smsCode" label="短信验证码：">
          <el-input
            v-model="passwordForm.smsCode"
            placeholder="请输入短信验证码"
            type="number"
          >
          </el-input>
          <smsButton
            class="sms-button"
            api="/papi/code/passwordSend"
            :fileds="{
              phone: phoneForm.phone,
              code: passwordForm.imgCode,
              codeValid: 1,
              id: passwordForm.id
            }"
            :ok="!(passwordForm.imgCode)"
          ></smsButton>
        </el-form-item>
        <el-form-item prop="password" label="新密码：">
          <el-input
            v-model="passwordForm.password"
            placeholder="请输入新密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="submit-button" @click="submitForm('passwordForm')">
            确定修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import apiCaptcha from '../../api/apiCaptcha'
import apiPassword from '../../api/apiPassword'
import { phoneReg, codeReg, passwordReg } from '../../helper/reg'
import smsButton from '../../components/smsButton'
export default {
  name: 'forget',
  components: {
    smsButton
  },
  data () {
    var validatePhone = (rule, value, callback) => {
      const trimVal = value.trim()
      if (!trimVal) {
        return callback(new Error('手机号不能为空'))
      } else if (!phoneReg.test(trimVal)) {
        return callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      loading: false,
      phoneForm: {
        phone: ''
      },
      phoneRules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      passwordForm: {
        phone: '',
        smsCode: '',
        imgCode: '',
        id: '',
        password: '',
        codeValid: '1' // 默认验证
      },
      passwordRules: {
        imgCode: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { pattern: codeReg, message: '短信验证码必须为四位数字' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式为长度6-20位的字母、数字、符号组成' }
        ]
      },
      imgSrcrand: '',
      imgSrc: ''
    }
  },
  mounted () {
    apiCaptcha.img((data) => {
      const {src, id} = data
      this.passwordForm = {...(this.passwordForm), id}
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
          this.$confirm('提交后将完成修改密码，请确定修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const form = {
              password: this.passwordForm.password,
              confirmPassword: this.passwordForm.password,
              code: this.passwordForm.smsCode,
              phone: this.passwordForm.phone
            }
            this.loading = true
            apiPassword.passwordUpdate(
              (msg) => {
                this.$message({
                  showClose: true,
                  message: '修改成功，请重新登录',
                  type: 'success'
                })
                this.loading = false
                this.$router.replace('/auth')
              },
              (msg) => {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'error'
                })
                this.loading = false
              },
              form
            )
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    },
    updateCaptcha () {
      this.imgSrcrand = this.imgSrc + '?' + Math.random()
    },
    updatePassword () {
      const fileds = {
        phone: this.codeForm.phone,
        code: this.validForm.code,
        userName: this.nameForm.userName,
        channel: 0
      }
      this.submitForm('nameForm', 'doRegisterPhone', '请正确输入用户名', fileds)
    },
    checkPhone () {
      this.$refs['phoneForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          apiPassword.checkPhone(
            () => {
              this.step = 2
              this.passwordForm = {...this.passwordForm, phone: this.phoneForm.phone}
              this.loading = false
            },
            (msg) => {
              this.$message({
                showClose: true,
                message: msg,
                type: 'error'
              })
              this.loading = false
            },
            this.phoneForm
          )
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
//eslint-disable
.forget-box
  background-repeat no-repeat
  background-image url("~assets/img/auth/login_bg.png")
  background-position top center
  height 699px
  padding-top 100px
  .forget-form
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
    .submit-button
      line-height 1.8
      width 100%
      font-size 20px
      margin-top 20px
    .next-button
      line-height 1.8
      width 100%
      font-size 20px
      margin-top 20px
  .codeInput
    margin-top 80px
</style>

<style lang="stylus">
//样式覆盖
.forget-form
  .el-form-item
    margin-bottom 8px!important
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
</style>
