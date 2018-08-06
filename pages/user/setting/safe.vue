<template>
  <div class="safe-wrap">
    <div :class="{'item-wrap': true, 'open': option == 'phone'}"
    >
      <div class="title-bar" @click="option == 'phone'? option = 'none': option = 'phone'">
        <i class="icon" style="margin-right: 10px;color: #ff7900;">&#xe636;</i>
        <span class="title">绑定手机</span>
        <span class="flag">修改<i :class="{icon: true, arrow: true, open: option == 'phone'}">&#xe62b;</i></span>
      </div>
      <div class="form">
        <el-form v-show="phoneStep == 1">
          <el-form-item label="" label-width="86px" style="height: 20px;line-height: 20px;">
            <span class="step-title">1.请先解绑您的绑定手机</span>
          </el-form-item>
          <el-form-item prop="oldCode" label="验证码" label-width="86px" class="code-item">
            <el-input style="width: 230px;" type="number" v-model="phoneForm.oldCode" placeholder="请输入短信验证码"></el-input>
            <sms
              style="float: right;"
              api="/papi/code/oldPhoneSend"
              :fileds="{}"
            ></sms>
          </el-form-item>
          <el-form-item label="" label-width="86px">
            <el-button style="width: 200px;" type="primary" @click="phoneNext()"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="phoneStep == 2" ref="phoneForm" :model="phoneForm" :rules="phoneRules">
          <el-form-item label="" label-width="90px" style="height: 20px;line-height: 20px;">
            <span class="step-title">2.请重新绑定您的手机</span>
          </el-form-item>
          <el-form-item prop="phone" label="绑定手机" label-width="94px">
            <el-input v-model="phoneForm.phone" placeholder="请输入新手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="图形验证码" label-width="94px" class="code-item">
            <el-input v-model="phoneForm.code" placeholder="请输入图形验证码"></el-input>
            <img :src="`${imgSrcrand}`" class="captcha" alt="点击刷新验证码" @click="updateCaptcha" v-show="imgSrcrand"/>
          </el-form-item>
          <el-form-item prop="newCode" label="短信验证码" label-width="94px" class="code-item">
            <el-input v-model="phoneForm.newCode" style="width: 222px;" placeholder="请输入新手机短信验证码"></el-input>
            <sms
              style="float: right;"
              api="/papi/code/newPhoneSend"
              :fileds="{phone: phoneForm.phone}"
              :ok="!(/^[1][1,3,4,5,7,8][0-9]{9}$/.test(phoneForm.phone))"
            ></sms>
          </el-form-item>
          <el-form-item label="" label-width="94px">
            <el-button style="width: 200px;" type="primary" @click="submitPhone('phoneForm')"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div :class="{'item-wrap': true, 'open': option == 'password'}">
      <div class="title-bar" @click="hasPassword">
        <i class="icon" style="margin-right: 10px;color: #ff7900;">&#xe640;</i>
        <span class="title">登录密码</span>
        <span class="flag">修改<i :class="{icon: true, arrow: true, open: option == 'password'}">&#xe62b;</i></span>
      </div>
      <div class="form">
        <el-form v-show="hasPw == 1" ref="ipForm" :model="ipForm" :rules="ipRules">
          <el-form-item label="" label-width="86px" style="height: 20px;line-height: 20px;">
            <span class="step-title">请设置您的登录密码</span>
          </el-form-item>
          <el-form-item prop="password" label="设置密码" label-width="86px">
            <el-input style="width: 230px;" v-model="ipForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="再次确认" label-width="86px">
            <el-input style="width: 230px;" v-model="ipForm.confirmPassword" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="" label-width="86px">
            <el-button style="width: 200px;" type="primary" @click="initPassword('ipForm')"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >提交</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="hasPw == 2" ref="password" :model="password" :rules="passwordRules">
          <el-form-item label="" label-width="86px" style="height: 20px;line-height: 20px;">
            <span class="step-title">修改登录密码</span>
          </el-form-item>
          <el-form-item prop="password" label="旧密码" label-width="86px">
            <el-input style="width: 230px;" v-model="password.oldPassword" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码" label-width="86px">
            <el-input style="width: 230px;" v-model="password.newPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="再次确认" label-width="86px">
            <el-input style="width: 230px;" v-model="password.confirmPassword" placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-form-item label="" label-width="86px">
            <el-button style="width: 200px;" type="primary" @click="updatePassword('password')"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div :class="{'item-wrap': true, 'open': option == 'email'}">
      <div class="title-bar" @click="checkEmail">
        <i class="icon" style="margin-right: 10px;color: #ff7900;">&#xe64c;</i>
        <span class="title">电子邮箱</span>
        <span class="flag">修改<i :class="{icon: true, arrow: true, open: option == 'email'}">&#xe62b;</i></span>
      </div>
      <div class="form" v-show="hasEmail == 1">
        <el-form ref="ieForm" :model="ieForm" :rules="ieRules">
          <el-form-item label="" label-width="96px" style="height: 20px;line-height: 20px;">
            <span class="step-title">请设置您的电子邮箱</span>
          </el-form-item>
          <el-form-item prop="email" label="电子邮箱" label-width="96px">
            <el-input v-model="ieForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="邮箱验证码" label-width="96px" class="code-item">
            <el-input style="width: 230px;" v-model="ieForm.code"></el-input>
            <sms
              style="float: right;"
              api="/papi/email/sendNew"
              :fileds="{email: ieForm.email, channel: 0}"
              :ok="!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(ieForm.email))"
            ></sms>
          </el-form-item>
          <el-form-item label="" label-width="96px">
            <el-button style="width: 200px;" type="primary" @click="initEmail('ieForm')"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form" v-show="hasEmail == 2">
        <el-form v-show="emailStep == 1">
          <el-form-item label="" label-width="86px" style="height: 20px;line-height: 20px;">
            <span class="step-title">1.请先解绑您的绑定邮箱</span>
          </el-form-item>
          <el-form-item prop="code" label="验证码" label-width="86px" class="code-item">
            <el-input style="width: 230px;" type="number" v-model="emailForm.code" placeholder="请输入老邮箱验证码"></el-input>
            <sms
              style="float: right;"
              api="/papi/email/send"
              :fileds="{}"
            ></sms>
          </el-form-item>
          <el-form-item label="" label-width="86px">
            <el-button style="width: 200px;" type="primary" @click="emailNext()"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="emailStep == 2" ref="emailForm" :model="emailForm" :rules="emailRules">
          <el-form-item label="" label-width="90px" style="height: 20px;line-height: 20px;">
            <span class="step-title">2.请重新绑定您的邮箱</span>
          </el-form-item>
          <el-form-item prop="email" label="绑定邮箱" label-width="94px">
            <el-input v-model="emailForm.email" placeholder="请输入新邮箱号"></el-input>
          </el-form-item>
          <el-form-item prop="newCode" label="邮箱验证码" label-width="94px" class="code-item">
            <el-input v-model="emailForm.newCode" style="width: 222px;" placeholder="请输入新邮箱验证码"></el-input>
            <sms
              style="float: right;"
              api="/papi/email/sendNew"
              :fileds="{email: emailForm.email, channel: 1}"
              :ok="!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(emailForm.email))"
            ></sms>
          </el-form-item>
          <el-form-item label="" label-width="94px">
            <el-button style="width: 200px;" type="primary" @click="submitEmail('emailForm')"
                       element-loading-text="提交中..."
                       element-loading-spinner="el-icon-loading"
                       element-loading-lock="true"
                       v-loading="doIng"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import sms from '../../../components/smsButton'
import apiCaptcha from '../../../api/apiCaptcha'
import apiSetting from '../../../api/apiSetting'
import { phoneReg, passwordReg, emailReg } from '../../../helper/reg'
export default {
  name: 'safe',
  components: {
    sms
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
    var confirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('确认密码不能为空'))
      }
      const trimVal = value.trim()
      const now = this.hasPw == 1 ? this.ipForm.password : this.password.newPassword
      if (!trimVal) {
        return callback(new Error('确认密码不能为空'))
      } else if (now != trimVal) {
        return callback(new Error('两次输入密码不相同'))
      } else {
        callback()
      }
    }
    return {
      option: 'none',
      phoneStep: 1,
      emailStep: 1,
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
        ],
        code: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' }
        ],
        newCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        oldCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      ipForm: {
        password: '',
        confirmPassword: ''
      },
      ipRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式为长度6-20位的字母、数字、符号组成' }
        ],
        confirmPassword: [
          { validator: confirmPassword, trigger: 'blur' }
        ]
      },
      password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式为长度6-20位的字母、数字、符号组成' }
        ],
        confirmPassword: [
          { validator: confirmPassword, trigger: 'blur' }
        ]
      },
      ieForm: {
        email: '',
        code: ''
      },
      ieRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: emailReg, message: '电子邮箱格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      emailForm: {
        email: '',
        code: '',
        newCode: ''
      },
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: emailReg, message: '电子邮箱格式错误' }
        ],
        code: [
          { required: true, message: '请输入老邮箱验证码', trigger: 'blur' }
        ],
        newCode: [
          { required: true, message: '请输入新邮箱验证码', trigger: 'blur' }
        ]
      },
      imgSrcrand: '',
      imgSrc: '',
      doIng: false,
      hasPw: -1, // 1 没有设置，2设置
      hasEmail: -1 // 同上
    }
  },
  methods: {
    initPassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('提交后将修改密码，请确定修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.doIng = true
            try {
              apiSetting.passwordInit((data) => {
                const {status, msg} = data
                if (status == 0) {
                  this.$message.success(msg)
                  this.hasPw = -1
                  this.option = 'none'
                } else {
                  this.$message.error(msg)
                }
              }, this.ipForm)
            } catch (e) {
              this.$message.error('网络有点小问题，请刷新后重试')
            } finally {
              this.doIng = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    },
    initEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('提交后将修改邮箱，请确定修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.doIng = true
            try {
              apiSetting.emailInit((data) => {
                const {status, msg} = data
                if (status == 0) {
                  this.$message.success(msg)
                  this.hasEmail = -1
                  this.option = 'none'
                } else {
                  this.$message.error(msg)
                }
              }, this.ieForm)
            } catch (e) {
              this.$message.error('网络有点小问题，请刷新后重试')
            } finally {
              this.doIng = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    },
    hasPassword () {
      this.option == 'password' ? this.option = 'none' : this.option = 'password'
      if (this.hasPw != -1) {
        return
      }
      this.doIng = true
      try {
        apiSetting.passwordStatus((data) => {
          const {data: {password}} = data
          if (password == 0) {
            this.hasPw = 1
          } else {
            this.hasPw = 2
          }
        })
      } catch (e) {
        this.$message.error('网络有点小问题，请刷新后重试')
      } finally {
        this.doIng = false
      }
    },
    checkEmail () {
      this.option == 'email' ? this.option = 'none' : this.option = 'email'
      if (this.hasEmail != -1) {
        return
      }
      this.doIng = true
      try {
        apiSetting.emailStatus((data) => {
          const {data: {email}} = data
          if (email == 0) {
            this.hasEmail = 1
          } else {
            this.hasEmail = 2
          }
        })
      } catch (e) {
        this.$message.error('网络有点小问题，请刷新后重试')
      } finally {
        this.doIng = false
      }
    },
    loadCaptcha () {
      apiCaptcha.img((data) => {
        const {src, id} = data
        this.phoneForm = {...(this.phoneForm), id}
        this.imgSrc = src
        this.imgSrcrand = src
      }, (msg) => {
        console.log(msg)
      })
    },
    updateCaptcha () {
      this.imgSrcrand = this.imgSrc + '?' + Math.random()
    },
    phoneNext () {
      if (this.phoneForm.oldCode !== '') {
        this.doIng = true
        try {
          apiSetting.oldPhoneValid((data) => {
            const {status, msg} = data
            if (status == 0) {
              this.$message.success(msg)
              this.phoneStep = 2
              this.loadCaptcha()
            } else {
              this.$message.error(msg)
            }
          }, {code: this.phoneForm.oldCode})
        } catch (e) {
          this.$message.error('网络有点小问题，请刷新后重试')
        } finally {
          this.doIng = false
        }
      } else {
        this.$message.error('请填入短信验证码')
      }
    },
    emailNext () {
      if (this.emailForm.code !== '') {
        this.doIng = true
        try {
          apiSetting.oldEmailValid((data) => {
            const {status, msg} = data
            if (status == 0) {
              this.$message.success(msg)
              this.emailStep = 2
            } else {
              this.$message.error(msg)
            }
          }, {code: this.emailForm.code})
        } catch (e) {
          this.$message.error('网络有点小问题，请刷新后重试')
        } finally {
          this.doIng = false
        }
      } else {
        this.$message.error('请填入邮箱验证码')
      }
    },
    submitEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('提交后将完成改变绑定邮箱，请确定修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const form = {
              ...this.emailForm
            }
            this.doIng = true
            try {
              apiSetting.emailUpdate((data) => {
                const {status, msg} = data
                if (status == 0) {
                  this.$message.success(msg)
                  this.emailStep = 1
                  this.emailForm = {code: '', newCode: '', email: ''}
                } else {
                  this.$message.error(msg)
                }
              }, form)
            } catch (e) {
              this.$message.error('网络有点小问题，请刷新后重试')
            } finally {
              this.doIng = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    },
    submitPhone (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('提交后将完成改变绑定手机，请确定修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const form = {
              ...this.phoneForm
            }
            this.doIng = true
            try {
              apiSetting.bindPhone((data) => {
                const {status, msg} = data
                if (status == 0) {
                  this.$message.success(msg)
                  this.phoneStep = 1
                } else {
                  this.$message.error(msg)
                }
              }, form)
            } catch (e) {
              this.$message.error('网络有点小问题，请刷新后重试')
            } finally {
              this.doIng = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    },
    updatePassword (f) {
      this.$refs[f].validate((valid) => {
        if (valid) {
          this.$confirm('提交后将修改密码，请确定修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.doIng = true
            try {
              apiSetting.passwordUpdate((data) => {
                const {status, msg} = data
                if (status == 0) {
                  this.$message.success(msg)
                  this.hasPw = -1
                  this.password = {
                    newPassword: '',
                    oldPassword: ''
                  }
                  this.option = 'none'
                } else {
                  this.$message.error(msg)
                }
              }, this.password)
            } catch (e) {
              this.$message.error('网络有点小问题，请刷新后重试')
            } finally {
              this.doIng = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
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
    position absolute
    top 0
    right 0
  img
    top 1px
    right 1px
    position absolute
    border-top-right-radius 4px
    border-bottom-right-radius 4px
    height 38px
    display block
</style>
