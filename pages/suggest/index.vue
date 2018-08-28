<template>
  <div>
    <SuggestHeader></SuggestHeader>
    <div class="form">
      <h3 class="title">建议反馈</h3>
      <p>由衷感谢您的热心建议，我们将第一时间处理您的反馈</p>
      <el-form ref="form" :model="form" :rules="codeRules" label-width="120px">
        <el-form-item label-width="0px" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="点击输入建议内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="如何联系您？" prop="contact">
              <el-input v-model="form.contact" placeholder="称呼"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label="" label-width="0px" prop="phone">
              <el-input v-model="form.phone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmit('form')">&emsp;&emsp;提交&emsp;&emsp;</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="300px"
      center>
      <span>提交成功！感谢您的反馈</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">&emsp;&emsp;好&nbsp;的&emsp;&emsp;</el-button>
      </span>
    </el-dialog>
    <SuggestFooter style="background: none"></SuggestFooter>
  </div>
</template>

<script>
import apiSuggest from '@/api/apiSuggest'
import SuggestHeader from '@/components/suggest/header'
import SuggestFooter from '@/components/user/footer'
import { phoneReg } from '@/helper/reg'
export default {
  name: 'suggest-index',
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
      form: {
        phone: '',
        contact: '',
        content: ''
      },
      centerDialogVisible: false,
      codeRules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入称呼', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入反馈建议内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          apiSuggest.suggestion({
            'contact': this.form.contact,
            'contactNum': this.form.phone,
            'content': this.form.content
          }, (data) => {
            this.centerDialogVisible = true
            this.$refs[form].resetFields()
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    SuggestHeader,
    SuggestFooter
  }
}
</script>
<style lang="stylus">
  form
    .el-form-item__label
    .el-input
    .el-button
      font-size 16px
</style>
<style lang="stylus" scoped>
  .form
    width 1300px
    margin auto
    background #ffffff
    border-radius 5px
    padding 60px 40px
    box-sizing border-box
    .title
      font-size 32px
      margin-bottom 40px
      &:after
        content ''
        display block
        width 2em
        border-top 2px solid #2475E2
        margin-top 4px
    p
      padding-bottom 20px
</style>
