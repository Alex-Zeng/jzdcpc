<template>
    <div>
      <div class="banner">
        <img src="@/assets/img/join-us/banner-text.png" alt="">
      </div>
      <div class="title">
        <img src="@/assets/img/join-us/title-01.png" alt="">
      </div>
      <ul class="advantage">
        <li>
          <span>直面一线核心采购商</span>
          <p>
            众多OEM及核心企业资源<br/>
            高效供需对接
          </p>
        </li>
        <li>
          <span>优质供应链金融服务</span>
          <p>
            产品针对家电产业<br/>
            共同开发 减轻回款压力
          </p>
        </li>
        <li>
          <span>品牌推广服务</span>
          <p>
            快速进驻打造品牌<br/>
            每月主推企业增加曝光
          </p>
        </li>
        <li>
          <span>操作系统简洁流畅</span>
          <p>
            随时随地跟踪订单
          </p>
        </li>
      </ul>
      <div class="intro">
        <h3>成为供应商之前请了解一下内容</h3>
        <img src="@/assets/img/join-us/intro-01.png" alt="">
        <p>1.主营品类：冰箱、洗衣机、空调、消毒柜原材料及零配件</p>
        <p>2.商户资质：公司成立并连续经营1年以上，无税务异常情况</p>
      </div>
      <div style="background: #f5f5f5;text-align: center;">
        <div class="title">
          <img src="@/assets/img/join-us/title-02.png" alt="">
        </div>
        <img src="@/assets/img/join-us/ruzhu.png" alt="">
      </div>
      <div class="form-container">
        <div class="form">
          <div class="title">
            方式一：<br/>
            填写表单 我们稍后与您沟通
          </div>
          <div style="padding: 30px 20px">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
              <el-form-item label="企业名称：" prop="companyName">
                <el-input v-model="form.companyName"></el-input>
              </el-form-item>
              <el-form-item label="姓名：" prop="contact">
                <el-input v-model="form.contact"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="contactNum">
                <el-input v-model="form.contactNum"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">&emsp;&emsp;&emsp;提交&emsp;&emsp;&emsp;</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <img src="@/assets/img/join-us/hezuo@2x.png" alt="">
        <div class="form">
          <div class="title">
            方式二：<br/>
            我等不及了，要马上联系商务
          </div>
          <div class="people">
            <p>梁女士：139 2217 2727</p>
            <p>白先生：186 0207 4777</p>
          </div>
        </div>
      </div>
      <div class="title">
        <img src="@/assets/img/join-us/title-03.png" alt="">
      </div>
      <ul class="partner">
        <li>
          <img src="@/assets/img/join-us/partner-01.png" alt="">
          <p>华意压缩机（荆州）有限公司</p>
        </li>
        <li>
          <img src="@/assets/img/join-us/partner-02.png" alt="">
          <p>常州市武进苏南制冷设备有限公司</p>
        </li>
        <li>
          <img src="@/assets/img/join-us/partner-03.png" alt="">
          <p>广东顺威精密塑料股份有限公司</p>
        </li>
      </ul>
      <ul class="partner">
        <li>
          <img src="@/assets/img/join-us/partner-04.png" alt="">
          <p>广东锐涂精细化工有限公司</p>
        </li>
        <li>
          <img src="@/assets/img/join-us/partner-05.png" alt="">
          <p>九江恒通自动控器有限公司</p>
        </li>
        <li>
          <img src="@/assets/img/join-us/partner-06.png" alt="">
          <p>四川格林兰电器有限公司</p>
        </li>
      </ul>
      <indexFooter></indexFooter>
    </div>
</template>

<script>
import indexFooter from '../components/index/footer'
import {phoneReg} from '@/helper/reg'
import apiCaptcha from '@/api/apiJoinUs'
export default {
  name: 'join-us',
  data () {
    var validatePhone = (rule, value, callback) => {
      const trimVal = value.trim()
      if (!phoneReg.test(trimVal)) {
        return callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {
        companyName: '',
        contactNum: '',
        contact: ''
      },
      rules: {
        companyName: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        contactNum: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: validatePhone, trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiCaptcha.merchant(
            () => {
              this.$message({
                showClose: true,
                message: '提交成功',
                type: 'success'
              })
              this.$refs[formName].resetFields()
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
            this.form
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {
    indexFooter
  }
}
</script>

<style lang="stylus" scoped>
$color = #2475E2
$font-family = "Microsoft YaHei"
$bg-color = #222438
.banner
  height 400px
  padding-top 110px
  background url("~/assets/img/join-us/banner-bg.png")
  background-size 100% 400px
  text-align center
  box-sizing border-box
  img
    height 180px
.title
  text-align center
  padding 80px
  img
    height 90px
.advantage
  display flex
  justify-content center
  font-family $font-family
  padding-bottom 80px
  li
    width 360px
    height 400px
    padding-top 270px
    text-align center
    margin 15px
    border-top 10px solid $color
    background #F5F7FA
    background-repeat no-repeat
    background-position center 30px
    span
      display inline-block
      width 240px
      height 44px
      line-height 44px
      border-radius 4px
      background $color
      font-size 20px
      font-weight bold
      color #ffffff
    p
      padding-top 15px
      color #666666
      font-size 16px
.advantage li:nth-child(1) {
  background-image url("~/assets/img/join-us/advantage-01@2x.png")
}
.advantage li:nth-child(2) {
  background-image url("~/assets/img/join-us/advantage-02@2x.png")
}
.advantage li:nth-child(3) {
  background-image url("~/assets/img/join-us/advantage-03@2x.png")
}
.advantage li:nth-child(4) {
  background-image url("~/assets/img/join-us/advantage-04@2x.png")
}
.intro
  height 890px
  background $bg-color
  text-align center
  h3
    font-size 48px
    padding 100px
    text-align center
    color #ffffff
  p
    width 1146px
    height 108px
    line-height 108px
    color #ffffff
    background rgba(245,245,245,0.6)
    border-radius 54px
    margin 5px auto
    font-size 36px
.form-container
    height 600px
    background $bg-color
    display flex
    align-items center
    justify-content center
    .form
      width 360px
      background #CFD8E6
      border-radius 10px
      overflow hidden
      .title
        background $color
        padding 20px
        color #ffffff
      .people
        padding 50px
        text-align center
        line-height 2
        font-size 16px
        color #333333
    img
      margin 0 50px
.partner
  display flex
  justify-content center
  padding-bottom 40px
  li
    width 400px
    height 160px
    border 1px solid #DBDBDB
    display flex
    justify-content center
    align-items center
    margin 0 34px
    cursor pointer
    position relative
    p
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      display none
      text-align center
      line-height 160px
      color #ffffff
    &:hover
      p
        display block
        background rgba(0,0,0,0.5)
</style>
