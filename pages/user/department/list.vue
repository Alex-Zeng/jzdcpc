<template>
    <div class="container">
      <div class="header">
        <span class="title">{{organizationName}}</span>
        <div v-if="userRole==1">
          <span class="button" @click="editorDepartemnt">编辑</span>
          <span class="button" @click="addEmployee">添加成员</span>
        </div>
      </div>
      <el-table
        :data="tableData"
        @row-click="handleClick"
        style="width: 100%">
        <el-table-column
          prop="staffName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注">
        </el-table-column>
        <template slot="empty">
          <div class="empty-box">
            <img src="@/assets/img/common/department.png" alt="">
            <p style="margin-right: 40px;">还没有成员哦</p>
            <el-button type="primary" @click="addEmployee" v-if="userRole == 1" style="margin-right: 40px;">&emsp;添加成员&emsp;</el-button>
          </div>
        </template>
      </el-table>
      <el-dialog
        title="编辑部门"
        :visible.sync="departemntEditorDialogVisible"
        width="500px"
        center>
        <el-form ref="departmentForm" :model="departmentForm" :rules="rules" style="margin-top: 20px;">
          <el-form-item prop="departmentName" label="请填写部门名称：">
            <el-input
              v-model="departmentForm.departmentName"
              placeholder="名称不可重复，最多10个字符"
              maxLength="10"
              type="text"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleDepartemntSave('departmentForm')">完  成</el-button>
        </span>
      </el-dialog>
      <el-dialog title="成员详情" width="800px" @close="editorMethods(true)" :visible.sync="dialogDetailVisible">
        <div class="dialog-header">
          <div class="department">{{organizationName}}</div>
          <template v-if="userRole == 1">
          <div v-if="editor">
            <button @click="editorMethods(false)">编辑</button>
            <button @click="hanldeDel">移除</button>
          </div>
          <div v-if="!editor">
            <button @click="hanldeSave">保存</button>
          </div>
          </template>
        </div>
        <div class="dialog-content">
          <img src="~assets/img/common/default_avatar.png" alt="logo">
          <div class="info">
            <ul v-if="editor">
              <li>{{staffName}}</li>
              <li><i class="icon">&#xe636;</i>&nbsp;{{phone}}</li>
              <li><i class="icon">&#xe601;</i>&nbsp;{{remarks}}</li>
            </ul>
            <ul v-if="!editor">
              <li>{{staffName}}</li>
              <li><i class="icon">&#xe636;</i>&nbsp;{{phone}}</li>
              <li>
                <p>修改部门</p>
                <el-select v-model="organizationNameDetail" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.organizationId"
                    :label="item.organizationName"
                    :value="item.organizationId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <p>备注</p>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  maxlength="100"
                  placeholder="请输入内容"
                  v-model="remarks">
                </el-input>
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="添加成员"
        :visible.sync="addFirstDialogVisible"
        width="500px"
        center>
        <el-form ref="phoneForm" :model="phoneForm" :rules="rules" style="margin-top: 20px;">
          <el-form-item prop="phone" label="请填写新增成员的手机号码：">
            <el-input
              v-model="phoneForm.phone"
              type="text"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFirst('phoneForm')">下一步</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="addSecondDialogVisible"
        width="800px"
        center>
        <el-form :model="employeeForm" :rules="rules" ref="employeeForm" label-width="100px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model.number="employeeForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="employeeForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordConfirm">
            <el-input type="password" v-model="employeeForm.passwordConfirm" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              maxlength="100"
              placeholder="请输入内容"
              v-model="employeeForm.remarks">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitSecond('employeeForm')">确 定</el-button>
          <el-button @click="resetForm('employeeForm')">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加成员"
        :visible.sync="addThreeDialogVisible"
        width="500px"
        center>
        <div class="success-content">
          <img src="@/assets/img/user/success.png" alt="1232">
          <p style="padding-right: 100px;padding-left: 100px;">
            {{successMsg}}
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitThree">好 的</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import { phoneReg, passwordReg } from '@/helper/reg'
import apiDepartment from '@/api/apiDepartment'
export default {
  name: 'department-list',
  data () {
    var checkDepartemnt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门名称不能为空'))
      } else if (this.departemntArr.includes(value)) {
        callback(new Error('该部门已存在，请重新输入'))
      } else {
        callback()
      }
    }
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
    var checkPassword = (rule, value, callback) => {
      if (value !== this.employeeForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userRole: null,
      departemntEditorDialogVisible: false,
      dialogDetailVisible: false,
      addFirstDepartemntDialogVisible: false,
      addFirstDialogVisible: false,
      addSecondDialogVisible: false,
      addThreeDialogVisible: false,
      successMsg: '',
      editor: true,
      tableData: [],
      options: [],
      departemntArr: [],
      organizationName: '',
      organizationNameDetail: '',
      staffName: '',
      phone: '',
      staffId: '',
      remarks: '',
      organizationId: '',
      departmentForm: {
        departmentName: ''
      },
      phoneForm: {
        phone: ''
      },
      employeeForm: {
        userName: '',
        password: '',
        passwordConfirm: '',
        remarks: ''
      },
      rules: {
        departmentName: [
          { validator: checkDepartemnt, trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式由长度6-20位的字母、数字、符号至少两种组成', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式由长度6-20位的字母、数字、符号至少两种组成', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        departemnt: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.organizationId = this.$route.params.page
    this.getOrganizationStaff()
    this.getOrganization()
  },
  mounted () {
    this.userRole = localStorage.getItem('userRole')
  },
  methods: {
    async getOrganizationStaff () {
      await apiDepartment.getOrganizationStaff({organizationId: this.organizationId}, (response) => {
        const {data, msg, status} = response
        if (status === 0) {
          this.tableData = data.staffList
          this.organizationName = data.organizationName
          this.organizationNameDetail = data.organizationName
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    async getOrganization () {
      await apiDepartment.getOrganization({hasTotal: 0}, (response) => {
        const {data, msg, status} = response
        if (status == 0) {
          this.options = data
          data.forEach((item) => {
            this.departemntArr.push(item.organizationName)
          })
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    handleClick (row) {
      this.staffName = row.staffName
      this.phone = row.phone
      this.staffId = row.staffId
      this.remarks = row.remarks
      this.dialogDetailVisible = true
    },
    addEmployee () {
      this.addFirstDialogVisible = true
    },
    editorDepartemnt () {
      this.departemntEditorDialogVisible = true
    },
    async organizationEdit () {
      await apiDepartment.organizationEdit({
        organizationId: this.organizationId,
        organizationName: this.departmentForm.departmentName
      }, (response) => {
        const {msg, status} = response
        if (status === 0) {
          this.departemntEditorDialogVisible = false
          this.loading = true
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.organizationName = this.departmentForm.departmentName
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    handleDepartemntSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.organizationEdit()
        }
      })
    },
    async staffAdd () {
      await apiDepartment.staffAdd({
        organizationId: this.organizationId,
        phone: this.phoneForm.phone
      }, (response) => {
        const {data, msg, status} = response
        if (status == 0) {
          this.addFirstDialogVisible = false
          if (data.redirect === 'unregistered') {
            this.addSecondDialogVisible = true
          } else if (data.redirect === 'registered') {
            this.addThreeDialogVisible = true
            this.successMsg = data.redirectionInfo
          }
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    submitFirst (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.staffAdd()
        }
      })
    },
    async userAdd () {
      await apiDepartment.userAdd(this.employeeForm, (response) => {
        const {msg, status} = response
        if (status == 0) {
          this.addThreeDialogVisible = false
          this.getOrganizationStaff()
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    submitSecond (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSecondDialogVisible = false
          this.employeeForm.phone = this.phoneForm.phone
          this.employeeForm.organizationId = this.organizationId
          this.userAdd()
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.addSecondDialogVisible = false
    },
    submitThree () {
      this.addThreeDialogVisible = false
    },
    editorMethods (e) {
      this.editor = e
    },
    async hanldeSave () {
      let organizationId = Number(this.organizationNameDetail) ? this.organizationNameDetail : this.organizationId
      await apiDepartment.staffEdit({
        staffId: this.staffId,
        organizationId: organizationId,
        remarks: this.remarks
      }, (response) => {
        const {msg, status} = response
        if (status == 0) {
          this.dialogDetailVisible = false
          this.getOrganizationStaff()
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    async staffDelete () {
      await apiDepartment.staffDelete({
        staffId: this.staffId
      }, (response) => {
        const {msg, status} = response
        if (status == 0) {
          this.dialogDetailVisible = false
          this.getOrganizationStaff()
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    hanldeDel () {
      this.$confirm('是否确认该操作？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否'
      })
        .then(() => {
          this.staffDelete()
        })
        .catch(action => {
          /* this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃保存并离开页面'
              : '停留在当前页面'
          }) */
        })
    }
  }
}
</script>
<style>
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td {
    background: #2475E2;
    color: #fff;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #2475E2;
    color: #fff;
  }
  .el-dialog{
    border-radius: 5px;
    overflow: hidden;
  }
  .el-dialog__header{
    background: #F5F5F5;
  }
  .container .el-table th {
    background: #DDDDDD;
    color: #333333;
    text-align: center;
  }
  .el-dialog__header{
    text-align: left;
  }
  .container td {
    text-align: center;
  }
  .container .el-table__empty-block{
    height: 560px;
  }
</style>
<style lang="stylus" scoped>
.container
  padding 10px
  font-size 16px
  .header
    display flex
    justify-content space-between
    padding-bottom 20px
    .title
      border-left 4px solid #FF7900
      color #333333
      padding-left 0.5em
      font-weight bold
    .button
      margin 0 10px
      background transparent
      border-color transparent
      color #2475E2
      cursor pointer
  h3
    text-align center
    padding 20px
.dialog-header
  display flex
  justify-content space-between
  font-size 18px
  color #ffffff
  padding-bottom 40px
  .department
    background #FF7900
    margin-left -20px
    height 48px
    line-height 48px
    padding 0 50px
    border-radius 0 5px 5px 0
  button
    color #2475E2
    background transparent
    outline-color transparent
    font-size 16px
    border-color transparent
    padding 10px
    cursor pointer
.dialog-content
  display flex
  font-size 16px
  img
    display block
    width 112px
    height 112px
    background #F5F5F5
    border-radius 50%
  .info
    flex 1
    text-align left
    padding 0 20px
    padding-bottom 80px
    li
      padding 5px 0
      p
        padding 5px 0
.icon
  font-family 'jzdc'
  color #FF7900
.success-content
  text-align center
  font-size 18px
  color #666666
  img
    width 68px
    height 68px
    display inline-block
    margin 20px
.empty-box
  height auto
  text-align center
  p
    padding-top 10px
    padding-bottom 20px
</style>
