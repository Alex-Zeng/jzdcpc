<template>
  <div class="container">
    <div class="header">
      <span class="title">通讯录</span>
      <div>
        <!--<span class="button" @click="editorDepartemnt">编辑</span>-->
        <span class="button" @click="addEmployee">添加成员</span>
      </div>
    </div>
    <el-form :inline="true" :model="searchForm" style="padding-top: 20px;">
      <el-form-item label="部门：">
        <el-select v-model="searchForm.departemnt" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="searchForm.user"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="searchForm.phone"></el-input>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      @row-click="handleClick"
      style="width: 100%">
      <el-table-column
        prop="address"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="date"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="电话">
      </el-table-column>
      <template slot="empty">
        <div class="empty-box">
          <img src="@/assets/img/common/department.png" alt="">
          <p>还没有部门哦</p>
          <el-button type="primary" @click="addEmployee">&emsp;添加成员&emsp;</el-button>
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
    <el-dialog title="成员详情" width="800px" :visible.sync="dialogDetailVisible">
      <div class="dialog-header">
        <div class="department">{{departemnt}}</div>
        <div v-if="editor">
          <button @click="editorMethods">编辑</button>
          <button @click="hanldeDel">移除</button>
        </div>
        <div v-if="!editor">
          <button @click="hanldeSave">保存</button>
        </div>
      </div>
      <div class="dialog-content">
        <img src="" alt="头像">
        <div class="info">
          <ul v-if="editor">
            <li>大卫</li>
            <li><i class="icon">&#xe636;</i>&nbsp;13202021212</li>
            <li><i class="icon">&#xe601;</i>&nbsp;{{remak}}</li>
          </ul>
          <ul v-if="!editor">
            <li>大卫</li>
            <li><i class="icon">&#xe636;</i>&nbsp;13202021212</li>
            <li>
              <p>修改部门</p>
              <el-select v-model="departemnt" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
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
                v-model="remak">
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
      <el-form ref="phoneForm" :model="phoneForm" :rules="rules" style="margin-top: 50px;">
        <el-form-item prop="phone" label="1.请填写新增成员的手机号码：">
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
      title="添加成员"
      :visible.sync="addFirstDepartemntDialogVisible"
      width="500px"
      center>
      <el-form ref="phoneForm" :model="phoneForm" :rules="rules" style="margin-top: 50px;">
        <el-form-item label="1请选择添加部门：" prop="departemnt">
          <el-select v-model="employeeForm.departemnt" filterable placeholder="请选择部门">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
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
        <el-form-item label="用户名" prop="name">
          <el-input v-model.number="employeeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="employeeForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="employeeForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择部门" prop="departemnt">
          <el-select v-model="employeeForm.departemnt" filterable placeholder="请选择部门">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remak">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            maxlength="100"
            placeholder="请输入内容"
            v-model="employeeForm.remak">
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
        <p>
          已成功向尾号1234发送验证码
          <br>
          绑定完成后，您将会收到通知
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
export default {
  name: 'department-list',
  data () {
    var checkDepartemnt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门名称不能为空'))
      }
      setTimeout(() => {
        if (value === '部门') {
          callback(new Error('该部门已存在，请重新输入'))
        } else {
          callback()
        }
      }, 1000)
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
      if (value !== this.employeeForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // departemntEditorDialogVisible: false,
      searchForm: {},
      dialogDetailVisible: false,
      addFirstDepartemntDialogVisible: false,
      addFirstDialogVisible: false,
      addSecondDialogVisible: false,
      addThreeDialogVisible: false,
      editor: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      departemnt: '研发部',
      remak: '他就是我们的部门经理鸭',
      departmentForm: {
        departmentName: ''
      },
      phoneForm: {
        phone: ''
      },
      employeeForm: {
        name: '',
        pass: '',
        checkPass: '',
        departemnt: '',
        remak: ''
      },
      rules: {
        departmentName: [
          { validator: checkDepartemnt, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: passwordReg, message: '密码格式由长度6-20位的字母、数字、符号至少两种组成', trigger: 'blur' }
        ],
        checkPass: [
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
  methods: {
    onSearch () {},
    handleClick (row) {
      console.log(row)
      this.dialogDetailVisible = true
    },
    addEmployee () {
      this.addFirstDialogVisible = true
    },
    /* editorDepartemnt () {
      this.departemntEditorDialogVisible = true
    }, */
    handleDepartemntSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('请确定添加该部门, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
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
    submitFirst (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFirstDialogVisible = false
          this.addSecondDialogVisible = true
          this.$refs[formName].resetFields()
        }
      })
    },
    submitSecond (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSecondDialogVisible = false
          this.addThreeDialogVisible = true
          this.$refs[formName].resetFields()
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
    editorMethods () {
      this.editor = false
    },
    hanldeSave () {
      this.editor = true
    },
    hanldeDel () {
      this.$confirm('是否确认该操作？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '移除成功'
          })
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
