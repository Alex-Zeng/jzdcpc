<template>
    <div class="container">
      <div class="header">
        <span class="title">部门信息</span>
        <span class="button" @click="addDepartment" v-if="userRole == 1">新增部门</span>
      </div>
      <el-table
        :data="tableData"
        @row-click="handleClick"
        style="width: 100%">
        <el-table-column
          prop="organizationName"
          label="部门名称">
        </el-table-column>
        <el-table-column
          prop="total"
          label="成员">
        </el-table-column>
        <template slot="empty">
          <div class="empty-box">
            <img src="@/assets/img/common/department.png" alt="">
            <p>还没有部门哦</p>
            <el-button type="primary" @click="addDepartment" v-if="userRole==1">&emsp;新增部门&emsp;</el-button>
          </div>
        </template>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-form ref="departmentForm" :model="departmentForm" :rules="rules" style="margin-top: 20px;">
          <el-form-item prop="name" label="请填写部门名称：">
            <el-input
              v-model="departmentForm.name"
              placeholder="名称不可重复，最多10个字符"
              maxLength="10"
              type="text"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSave('departmentForm')">完  成</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import apiDepartment from '@/api/apiDepartment'
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
    return {
      tableData: [],
      centerDialogVisible: false,
      rules: {
        name: [
          { validator: checkDepartemnt, trigger: 'blur' }
        ]
      },
      departmentForm: {
        name: ''
      }
    }
  },
  created () {
    this.getOrganization()
  },
  mounted () {
  },
  methods: {
    async getOrganization () {
      await apiDepartment.getOrganization({hasTotal: 0}, (response) => {
        const {data, msg, status} = response
        if (status == 0) {
          this.tableData = data
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    async organizationAdd () {
      await apiDepartment.organizationAdd({organizationName: this.departmentForm.name}, (response) => {
        const {msg, status} = response
        if (status == 0) {
          this.loading = true
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.getOrganization()
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
        this.centerDialogVisible = false
      })
    },
    handleClick (row) {
      this.$router.push('/user/department/list/' + row.organizationId)
    },
    addDepartment () {
      this.centerDialogVisible = true
    },
    handleSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('请确定添加该部门, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.organizationAdd()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    }
  },
  computed: {
    userRole () {
      return this.$store.getters.loggedRole
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
  .container .el-table th {
    background: #DDDDDD;
    color: #333333;
    text-align: center;
  }
  .container .el-dialog__header{
    text-align: left;
  }
  .container .el-table__empty-block{
    height: 560px;
  }
</style>
<style lang="stylus" scoped>
.container
  padding 10px
  font-size 16px
  text-align center
  .header
    display flex
    padding-bottom 20px
    justify-content space-between
    .title
      border-left 4px solid #FF7900
      color #333333
      padding-left 0.5em
      font-weight bold
    .button
      background transparent
      border-color transparent
      color #2475E2
      cursor pointer
  h3
    text-align center
    padding 20px
.empty-box
  height auto
  text-align center
  p
    padding-top 10px
    padding-bottom 20px
</style>
