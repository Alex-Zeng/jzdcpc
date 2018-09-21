<template>
  <div>
    <factoringHeeader></factoringHeeader>
    <div class="main">
      <h3 class="title">3步轻松搞定</h3>
      <div class="step-row">
        <el-steps :active="active" finish-status="success">
          <el-step title="意向登记"></el-step>
          <el-step title="审核签约"></el-step>
          <el-step title="放款"></el-step>
        </el-steps>
      </div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="codeRules" label-width="100px">
          <el-form-item label="订单号：" prop="number">
            <el-select v-model="form.number" placeholder="请选择" @change="onChange" style="display: block;">
              <el-option
                v-for="item in orderList"
                :key="item.value"
                :label="item.value"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单金额：" prop="account">
            <el-input :value="parseInt(form.account) === Number(form.account)? Number(form.account).toFixed(2):form.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contactUsername">
            <el-input v-model="form.contactUsername"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contactPhone">
            <el-input v-model="form.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="融资金额：" prop="needAccount">
            <el-input v-model="form.needAccount"></el-input>
          </el-form-item>
          <el-form-item label="户名：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="对公账号：" prop="bankCorporate">
            <el-input v-model="form.bankCorporate"></el-input>
          </el-form-item>
          <el-form-item label="再次输入：" prop="bankCorporateConfirm">
            <el-input v-model="form.bankCorporateConfirm"></el-input>
          </el-form-item>
          <el-form-item label="开户支行：" prop="bankAddress">
            <el-input v-model="form.bankAddress"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button style="padding-left: 100px;padding-right: 100px;" type="primary" @click="onSubmit('form')">提交意向</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="300px"
      center>
      <span>提交成功！我们将尽快与您联系</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">&emsp;&emsp;好&nbsp;的&emsp;&emsp;</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import factoringHeeader from '@/components/factoring/header'
import apiFactoring from '@/api/apiFactoring'
export default {
  name: 'factoring-form',
  data () {
    var validateneedAccount = (rule, value, callback) => {
      if (value > Number(this.form.account)) {
        callback(new Error('融资金额不能大于订单金额!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      orderList: [],
      form: {
        account: '',
        bankAddress: '',
        bankCorporate: '',
        bankCorporateConfirm: '',
        contactPhone: '',
        contactUsername: '',
        name: '',
        needAccount: '',
        number: ''
      },
      codeRules: {
        number: [
          { required: true, message: '请选择订单号', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请选择金额', trigger: 'blur' }
        ],
        contactUsername: [
          { required: true, message: '请填写联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请填写联系电话', trigger: 'blur' }
        ],
        needAccount: [
          { required: true, message: '请填融资金额', trigger: 'blur' },
          { validator: validateneedAccount, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写户名', trigger: 'blur' }
        ],
        bankCorporate: [
          { required: true, message: '请填写对公账号', trigger: 'blur' }
        ],
        bankCorporateConfirm: [
          { required: true, message: '请再次填写对公账号', trigger: 'blur' }
        ],
        bankAddress: [
          { required: true, message: '请填写开户支行', trigger: 'blur' }
        ]
      },
      centerDialogVisible: false
    }
  },
  computed: {
    token () {
      return this.$store.getters.loggedToken
    },
    user () {
      return this.$store.getters.loggedUser
    }
  },
  methods: {
    querySearch (queryString, cb) {
      var orderList = this.orderList
      var results = queryString ? orderList.filter(this.createFilter(queryString)) : orderList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (orderList) => {
        return (orderList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    onChange (item) {
      console.log(item)
      this.form.orderId = item.orderId
      this.form.account = item.account
    },
    async getName () {
      await apiFactoring.getName((data) => {
        this.form.name = data.data.name
      })
    },
    async getOrderInfo () {
      await apiFactoring.getOrderInfo({
      }, (data) => {
        const {status, msg, data: {orderList}} = data
        if (status === 0) {
          orderList.forEach((item) => {
            item.value = item.orderSn
          })
          this.orderList = orderList
        } else {
          this.$message.error(msg)
        }
      })
    },
    async onSubmit (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiFactoring.factoringAdd({
            'orderId': this.form.orderId,
            'contactUsername': this.form.contactUsername,
            'contactPhone': this.form.contactPhone,
            'needAccount': this.form.needAccount,
            'bankCorporate': this.form.bankCorporate,
            'bankCorporateConfirm': this.form.bankCorporateConfirm,
            'bankAddress': this.form.bankAddress
          }, (data) => {
            this.active = 1
            this.centerDialogVisible = true
            this.$refs[formName].resetFields()
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    if (this.token) {
      if (this.user.group === 6) {
        this.$confirm('您尚未做企业认证，去认证?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/user/setting/cert')
        }).catch(() => {
          this.$router.replace('/')
        })
      } else {
        this.getName()
        this.getOrderInfo()
      }
    } else {
      this.$confirm('您尚未登录，去登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.setItem('oldUrl', this.$route.path)
        this.$router.push('/auth')
      }).catch(() => {
        this.$router.replace('/')
      })
    }
  },
  components: {
    factoringHeeader
  }
}
</script>
<style lang="stylus">
  .step-row
    .is-success
      color #2475E2
      border-color #2475E2
</style>
<style lang="stylus" scoped>
  .main
    width 1300px
    margin auto
    background #ffffff
    padding 40px 0
    margin-bottom 137px
    .title
      text-align center
      font-size 32px
      color #333333
      margin-bottom 20px
      &::after
        content: ''
        display block
        width 2em
        border-top 4px solid #2475E2
        margin auto
        margin-top 4px
    .step-row
      width 600px
      margin auto
    .form
      width 400px
      margin auto
      padding-top 40px
</style>
