<template>
  <div class="login-box">
    <div class="login-form">
      <el-form ref="form" :model="form">
        <el-form-item label="账号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>
            登录
          </el-button>
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
      form: {
        name: ''
      }
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
</style>
