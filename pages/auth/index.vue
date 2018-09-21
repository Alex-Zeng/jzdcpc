<template>
  <div class="login-box">
    <div
      class="login-index-form"
      element-loading-text="登录中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
    >
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="账号：" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入账号"
          >
            <i slot="suffix" class="el-input__icon jzdc-icon jzdc-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          >
            <i slot="suffix" class="el-input__icon jzdc-icon jzdc-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="forget">
          <nuxt-link to="/auth/forget">忘记密码？</nuxt-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="submitForm('loginForm')">
            登   录
          </el-button>
        </el-form-item>
        <el-form-item class="no-password">
          <nuxt-link to="/auth/login" class="link" style="color:#ddd;">
            <i class="phone">&#xe636;</i><span>免密登录</span>
          </nuxt-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('doLoginIndex',
            {
              errorCb: msg => {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'error'
                })
                this.loading = false
              },
              successCb: msg => {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'success'
                })
                let oldUrl = localStorage.getItem('oldUrl')
                if (oldUrl) {
                  this.$router.replace(oldUrl)
                } else {
                  this.$router.replace('/')
                }
                this.loading = false
              },
              fileds: this.form
            }
          )
        } else {
          this.$message({
            showClose: true,
            message: '请按提示，检查账号和密码',
            type: 'error'
          })
          return false
        }
      })
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
  .login-index-form
    height 500px
    width 600px
    background url("~assets/img/auth/login_form_bg.png") no-repeat
    background rgba(0, 0, 0, 0.6)
    border-radius 8px
    margin 0 auto
    padding 94px 80px
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
</style>

<style lang="stylus">
//样式覆盖
.login-index-form
  .el-form-item__label
    color #ffffff
    color rgba(255, 255, 255, .8)
    font-size 16px
    &::before
      content: '' !important

  .el-input__inner
    font-size 18px
    height 52px
  .forget
      margin-top 0
      text-align right
      .el-form-item__content
        line-height 1
        a
          color #bfbfc0
</style>
