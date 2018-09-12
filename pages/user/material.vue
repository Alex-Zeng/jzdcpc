<template>
  <div>
    <div class="search-wrap">
      <el-form ref="searchForm" :inline="true" :model="searchForm"  label-width="100px">
        <el-form-item prop="orderNo" label="物料编号：">
          <el-input v-model="searchForm.orderNo" placeholder="请输入物料编号" style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item prop="orderNo" label="物料规格：" >
          <el-input v-model="searchForm.orderNo" placeholder="请输入物料规格" style="width: 240px;"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="供应商：" prop="goodsName">
          <el-input v-model="searchForm.goodsName" placeholder="请输入供应商" style="width: 240px;"></el-input>
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
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="border-right: none" rowspan="2">czxcz</td>
          <td style="border-left: none" rowspan="2">zxcxzc</td>
          <td style="border-right: none">cxxcz</td>
          <td style="border-left: none;border-right: none;">asdasd</td>
          <td style="border-left: none;border-right: none;">zczca</td>
          <td style="border-left: none; width: 200px;">
            <el-button class="order-button text" size="small" type="primary" @click="shopCar">购买</el-button>
            <el-button class="order-button text" size="small" type="default" @click="editor">编辑</el-button>
            <el-button class="order-button text delete" size="small" type="danger" @click="cancel">删除</el-button>
          </td>
        </tr>
        <tr>
          <td style="border-right: none">cxxcz</td>
          <td style="border-left: none;border-right: none;">asdasd</td>
          <td style="border-left: none;border-right: none;">zczca</td>
          <td style="border-left: none">
            <el-button class="order-button text" size="small" type="primary" @click="shopCar">购买</el-button>
            <el-button class="order-button text" size="small" type="default" @click="editor">编辑</el-button>
            <el-button class="order-button text delete" size="small" type="danger" @click="cancel">删除</el-button>
          </td>
        </tr>
        <tr>
          <td style="border-right: none">czxcz</td>
          <td style="border-left: none">zxcxzc</td>
          <td style="border-right: none">cxxcz</td>
          <td style="border-left: none;border-right: none;">asdasd</td>
          <td style="border-left: none;border-right: none;">zczca</td>
          <td style="border-left: none">
            <el-button class="order-button text" size="small" type="primary" @click="shopCar">购买</el-button>
            <el-button class="order-button text" size="small" type="default" @click="editor">编辑</el-button>
            <el-button class="order-button text delete" size="small" type="danger" @click="cancel">删除</el-button>
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
            <img src="" alt="">
          </el-col>
          <el-col :span="20">
            <p>商品名称：&emsp;商品名称</p>
            <p>商品规格：&emsp;</p>
            <p>&nbsp;SKU编码：&emsp;12345678KK</p>
            <p>&emsp;供应商：&emsp;XXXXXXXXXXXX</p>
            <el-form ref="shocarForm" :model="shocarForm" label-width="83px">
              <el-form-item label="物料规格：">
                <el-input-number v-model="number" @change="handleChange" :min="1"></el-input-number>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" disabled>该商品已下架</el-button>
          <el-button type="primary" @click="dialogShopcarEditorVisible = false">加入采购清单</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑物料"
        :visible.sync="dialogEditorVisible"
        width="500px"
        center>
        <el-row>
          <el-col :span="4">
            <img src="" alt="">
          </el-col>
          <el-col :span="20">
            <p>商品名称：&emsp;商品名称</p>
            <p>商品规格：&emsp;</p>
            <p>&nbsp;SKU编码：&emsp;12345678KK</p>
            <p>&emsp;供应商：&emsp;XXXXXXXXXXXX</p>
            <el-form ref="editorForm" :model="editorForm" label-width="83px">
              <el-form-item label="物料编号：">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="物料规格：">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditorVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEditorVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service'
export default {
  name: 'material',
  data () {
    return {
      dialogFormVisible: false,
      dialogShopcarEditorVisible: false,
      dialogEditorVisible: false,
      url: null,
      searchForm: {},
      editorForm: {},
      shocarForm: {},
      currentPage: 1,
      number: 1
    }
  },
  methods: {
    onSubmit () {
      this.pageNumber = 1
      // const others = JSON.stringify(this.searchForm)
      // const status = this.searchForm.status || this.type
      // this.$router.push(`/user/order/${status}/${this.pageNumber}/${others}`)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    async exportXls () {
      const loading = this.$loading({
        lock: true,
        text: '生成记录中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const {status, data: { url }} = await service.post('/papi/order/export', this.searchForm)
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
    shopCar (id) {
      this.number = 1
      this.dialogShopcarEditorVisible = true
    },
    editor (id) {
      this.dialogEditorVisible = true
    },
    cancel (id) {
      console.log('cancel')
    }
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
  tr:hover
    .delete
      display inline-block
.pagination
  padding-top 50px
  text-align center
  font-size 16px
</style>
