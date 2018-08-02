<template>
  <div class="safe-wrap">
    <div :class="{'item-wrap': true, 'open': phone}">
      <div class="title-bar" @click="phone = !phone">
        <i class="icon" style="margin-right: 10px;color: #ff7900;">&#xe636;</i>
        <span class="title">绑定手机</span>
        <span class="flag">修改<i :class="{icon: true, arrow: true, open: phone}">&#xe62b;</i></span>
      </div>
      <div class="form">
        <el-form v-show="phoneStep == 1">
          <el-form-item label="" label-width="86px" style="height: 20px;line-height: 20px;">
            <span class="step-title">1.请先解绑您的绑定手机</span>
          </el-form-item>
          <el-form-item label="绑定手机" label-width="86px" class="code-item">
            <el-input style="width: 230px;" type="number" v-model="phoneForm.oldCode"></el-input>
            <sms
              style="float: right;"
              api="/papi/code/oldPhoneSend"
              :fileds="{}"
            ></sms>
          </el-form-item>
          <el-form-item label="" label-width="86px">
            <el-button style="width: 200px;" type="primary" @click="phoneNext()">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="phoneStep == 2" ref="phoneForm" :model="phoneForm" :rules="phoneRules">
          <el-form-item label="" label-width="78px" style="height: 20px;line-height: 20px;">
            <span class="step-title">2.请重新绑定您的手机</span>
          </el-form-item>
          <el-form-item prop="phone" label="绑定手机" label-width="86px">
            <el-input v-model="phoneForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="图形验证码" label-width="86px" class="code-item">
            <el-input v-model="phoneForm.code"></el-input>
            <img :src="`${imgSrcrand}`" class="captcha" alt="点击刷新验证码" @click="updateCaptcha" v-show="imgSrcrand"/>
          </el-form-item>
          <el-form-item label="短信验证码" label-width="86px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="" label-width="78px">
            <el-button style="width: 200px;" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="item-wrap">
      <div class="title-bar">
        <i class="icon" style="margin-right: 10px;color: #ff7900;">&#xe640;</i>
        <span class="title">登录密码</span>
        <span class="flag">修改<i class="icon">&#xe62b;</i></span>
      </div>
    </div>

    <div class="item-wrap">
      <div class="title-bar">
        <i class="icon" style="margin-right: 10px;color: #ff7900;">&#xe64c;</i>
        <span class="title">电子信箱</span>
        <span class="flag">修改<i class="icon">&#xe62b;</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import sms from '../../../components/smsButton'
import apiCaptcha from '../../../api/apiCaptcha'
import { phoneReg } from '../../../helper/reg'
export default {
  name: 'safe',
  components: {
    sms
  },
  mounted () {
    apiCaptcha.img((data) => {
      const {src, id} = data
      this.phoneForm = {...(this.phoneForm), id}
      this.imgSrc = src
      this.imgSrcrand = src
    }, (msg) => {
      console.log(msg)
    })
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
      phone: false,
      phoneStep: 1,
      phoneForm: {
        oldCode: '',
        phone: '',
        code: '',
        id: '',
        newCode: ''
      },
      phoneRules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      imgSrcrand: '',
      imgSrc: ''
    }
  },
  methods: {
    updateCaptcha () {
      this.imgSrcrand = this.imgSrc + '?' + Math.random()
    },
    phoneNext () {
      if (this.phoneForm.oldCode !== '') {
        this.phoneStep = 2
      } else {
        this.$message.error('请填入短信验证码')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.safe-wrap
  width 1028px
  .item-wrap
    width 100%
    margin 10px 0
    background-color #fff
    border-radius 5px
    font-size 16px
    color #737373
    overflow hidden
    height 61px
    transition height 0.5s
    .title-bar
      padding 20px
    .form
      width 428px
      margin 4px auto
      .step-title
        font-size 14px
        color #2475e2
    &.open
      height 380px
    .title
      cursor pointer
    .icon
      font-family 'jzdc'
      cursor pointer
      &.arrow
        transition transform 0.4s
        display block
        float right
        line-height 21px
        &.open
          transform rotate(-180deg)
    .flag
      float right
      cursor pointer
      color #2475e2
      &:hover
        color #737373
</style>

<style lang="stylus">
.code-item
  position relative
  .el-input__inner
    border-top-right-radius 0
    border-bottom-right-radius 0
  .el-button
    border-top-left-radius 0
    border-bottom-left-radius 0
  img
    top 1px
    right 1px
    position absolute
    border-top-right-radius 4px
    border-bottom-right-radius 4px
    height 38px
    display block
</style>
