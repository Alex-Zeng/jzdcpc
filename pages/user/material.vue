<template>
  <div>
    <div class="search-wrap">
      <el-form ref="searchForm" :inline="true" :model="searchForm"  label-width="100px">
        <el-form-item prop="materialCode" label="物料编号：">
          <el-input v-model="searchForm.materialCode" placeholder="请输入物料编号" style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item prop="materialSpec" label="物料规格：" >
          <el-input v-model="searchForm.materialSpec" placeholder="请输入物料规格" style="width: 240px;"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="供应商：" prop="supplierName">
          <el-input v-model="searchForm.supplierName" placeholder="请输入供应商" style="width: 240px;"></el-input>
        </el-form-item>
        <div style="display: inline-block;padding-left: 1.5em;">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" @click="exportXls">导出结果</el-button>
        </div>
      </el-form>
    </div>
    <div class="main">
      <table class="el-table" border style="width: 100%;">
        <thead>
        <tr>
          <th>物料编号</th>
          <th>物料规格</th>
          <th>商品名称</th>
          <th>规格型号</th>
          <th>SKU编码</th>
          <th style="width: 200px;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in lists" :key="index">
          <td style="border-right: none">{{item.materialCode}}</td>
          <td style="border-left: none">{{item.materialSpec}}</td>
          <td style="border-right: none" colspan="4">
            <table style="width: 100%;">
              <tr v-for="i in item.detail" :key="i.materialId">
                <td style="width: 127px;">{{i.title}}</td>
                <td style="width: 127px;">{{i.specInfo}}</td>
                <td style="width: 122px;">{{i.skuCode}}</td>
                <td style="width: 150px;text-align: left;">
                  <el-button class="order-button text" size="small" type="primary" @click="shopCar(i.materialId, item.materialCode, item.materialSpec, i.specId, i)">购买</el-button>
                  <el-button class="order-button text" size="small" type="default" @click="editor(i.materialId, item.materialCode, item.materialSpec, i.specId, i)">编辑</el-button>
                  <el-button class="order-button text delete" size="small" type="danger" @click="cancel(i.materialId)">删除</el-button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      <el-dialog title="订单记录已生成" :visible.sync="dialogFormVisible" width="400px">
        <div style="text-align: center;">
          <a :href="url" target="_blank" style="color: #ff7900;font-size: 18px; font-weight: 600;">点击下载订单记录</a>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="加入购物车"
        :visible.sync="dialogShopcarEditorVisible"
        width="500px"
        center>
        <el-row>
          <el-col :span="4">
            <img class="dialog-img" :src="shocarForm.item.imgUrl" alt="">
          </el-col>
          <el-col :span="20">
            <p>商品名称：&emsp;{{shocarForm.item.title}}</p>
            <p>商品规格：&emsp;{{shocarForm.item.specInfo}}</p>
            <p>&nbsp;SKU编码：&emsp;{{shocarForm.item.skuCode}}</p>
            <p>&emsp;供应商：&emsp;{{shocarForm.item.supplierName}}</p>
            <el-form ref="shocarForm" :model="shocarForm" label-width="83px">
              <el-form-item label="采购数量：">
                <el-input-number v-model="shocarForm.item.minOrderQty" @change="handleChange" :min="shocarForm.item.minOrderQty"></el-input-number>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <!--<el-button type="info" disabled>该商品已下架</el-button>-->
          <el-button type="primary" @click="shocarFormSubmit">加入采购清单</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑物料"
        :visible.sync="dialogEditorVisible"
        width="500px"
        center>
        <el-row>
          <el-col :span="4">
            <img class="dialog-img" :src="editorForm.item.imgUrl" alt="">
          </el-col>
          <el-col :span="20">
            <p>商品名称：&emsp;{{editorForm.item.title}}</p>
            <p>商品规格：&emsp;{{editorForm.item.specInfo}}</p>
            <p>&nbsp;SKU编码：&emsp;{{editorForm.item.skuCode}}</p>
            <p>&emsp;供应商：&emsp;{{editorForm.item.supplierName}}</p>
            <el-form ref="editorForm" :model="editorForm" label-width="83px">
              <el-form-item label="物料编号：" prop="materialCode">
                <el-input placeholder="请输入内容" v-model="editorForm.materialCode"></el-input>
              </el-form-item>
              <el-form-item label="物料规格：" prop="materialSpec">
                <el-input placeholder="请输入内容" v-model="editorForm.materialSpec"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditorVisible = false">取 消</el-button>
          <el-button type="primary" @click="editorFormSubmit()">确 定</el-button>
        </span>
      </el-dialog>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          :current-page="currentPage"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service'
import apiMaterial from '@/api/apiMaterial'
export default {
  name: 'material',
  data () {
    return {
      dialogFormVisible: false,
      dialogShopcarEditorVisible: false,
      dialogEditorVisible: false,
      url: null,
      searchForm: {
        materialCode: '',
        materialSpec: '',
        supplierName: ''
      },
      editorForm: {
        item: {}
      },
      shocarForm: {
        item: {}
      },
      total: 0,
      pageSize: 10,
      currentPage: 1,
      number: 1,
      lists: []
    }
  },
  methods: {
    async getWebList () {
      await apiMaterial.getWebList((data) => {
        const {data: {total, list}} = data
        console.log(total)
        this.total = total
        this.lists = list
        console.log(this.lists)
      }, {
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        materialCode: this.searchForm.materialCode,
        materialSpec: this.searchForm.materialSpec,
        supplierName: this.searchForm.supplierName
      })
    },
    handleChange () {},
    onSubmit () {
      this.getWebList()
      this.$router.push(`/user/material/1`)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.$router.push(`/user/material/${val}`)
      this.getWebList()
    },
    async exportXls () {
      const loading = this.$loading({
        lock: true,
        text: '生成记录中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const {status, data: { url }} = await service.post('/papi/material/export', this.searchForm)
        if (status == 0) {
          this.$message(
            {
              type: 'success',
              message: '文件已生成，请点击下载'
            }
          )
          this.url = url
          setTimeout(() => {
            this.dialogFormVisible = true
          }, 700)
        } else {
          this.$message.error('生成记录失败！')
        }
      } catch (e) {
        this.$message.error('生成记录失败！')
      } finally {
        loading.close()
      }
    },
    shopCar (materialId, materialCode, materialSpec, specId, item) {
      this.shocarForm.item = item
      this.shocarForm.specId = specId
      this.dialogShopcarEditorVisible = true
    },
    async shocarFormSubmit () {
      this.shocarForm.content = [{'specId': this.shocarForm.specId, 'soldQty': this.shocarForm.item.minOrderQty}]
      console.log(JSON.stringify(this.shocarForm.content))
      await apiMaterial.addMore((data) => {
        const {status, msg} = data
        if (status === 0) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.dialogShopcarEditorVisible = false
          this.$store.dispatch('getCartNum')
          // this.$router.push('/goods/cart')
        } else {
          this.$message.error(msg)
        }
      }, {
        content: JSON.stringify(this.shocarForm.content)
      })
    },
    async editor (materialId, materialCode, materialSpec, specId, item) {
      this.editorForm.item = item
      this.editorForm.materialCode = materialCode
      this.editorForm.materialSpec = materialSpec
      this.editorForm.materialId = materialId
      this.editorForm.specId = specId
      this.dialogEditorVisible = true
    },
    async editorFormSubmit () {
      this.dialogEditorVisible = false
      await apiMaterial.editor((data) => {
        const {status, msg} = data
        if (status === 0) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.getWebList()
        }
      }, {
        materialId: this.editorForm.materialId,
        materialCode: this.editorForm.materialCode,
        materialSpec: this.editorForm.materialSpec
      })
    },
    async cancel (id) {
      this.$confirm('确定删除该条信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiMaterial.cancel((data) => {
          const {status, msg} = data
          if (status === 0) {
            this.$message({
              type: 'success',
              message: msg
            })
            this.getWebList()
          }
        }, {
          materialId: id
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.$router.push(`/user/material/1`)
    this.getWebList()
  }
}
</script>
<style lang="stylus">
  .pagination
    .el-pager
      li
        &.active
          color #fff
          background #2475E2
  .el-dialog__body
    p
      padding-bottom 10px
    .el-form-item
      margin-bottom 10px
</style>
<style lang="stylus" scoped>
.main
  background #ffffff
  padding-bottom 50px
.el-table
  border-collapse collapse
  text-align center
  border 1px solid #dddddd
  th
    text-align center
    border none
  td
    text-align center
    border-color #dddddd
    .delete
      display none
  table
    tr:hover
      .delete
        display inline-block
    td
      border none
      padding 0
.dialog-img
  display block
  width 60px
  height 52px
.pagination
  padding-top 50px
  text-align center
  font-size 16px
</style>
