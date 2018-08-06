<template>
  <div class="address-wrap">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addrForm" :rules="rules">
        <el-form-item label="收货人" prop="name" label-width="80px">
          <el-input v-model="form.name" auto-complete="off" style="width: 366px;"></el-input>
        </el-form-item>
        <el-form-item label="联系手机" prop="phone" label-width="80px">
          <el-input v-model="form.phone" auto-complete="off" style="width: 366px;"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="areaId" label-width="80px">
          <el-select style="width: 120px;float: left;" value-key="name" v-model="pid" @change="getCity">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <span style="float: left;margin: 0 8px;">-</span>
          <el-select style="width: 120px;float: left;" value-key="name" v-model="cid" @change="getCounty">
            <el-option
              v-for="item in city"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <span style="float: left;margin: 0 8px;">-</span>
          <el-select style="width: 120px;float: left;" value-key="name" v-model="countyid" @change="form.areaId = countyid.id">
            <el-option
              v-for="item in county"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail" label-width="80px">
          <el-input v-model="form.detail" auto-complete="off" style="width:86%;"></el-input>
          <el-checkbox style="margin-left: 8px;" v-model="form.is_default">设为默认</el-checkbox>
        </el-form-item>
        <el-form-item label="设置标签" label-width="80px">
          <el-tag v-for="i in tags" :key="i.id" :class="{select: form.tag==i.tag}" closable @click.native="setTag(i.tag)" @close="tagClose(i.id)">{{i.tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput"> + </el-button>
          <span style="color: #999;margin-left: 6px;">(可添加地址标签，如“总公司”、“分公司”)</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="addr-list clearfix">
      <div class="addr-item" v-for="i in list" :key="i.id">
        <div class="addr-header">
          {{i.areaName}} <el-tag v-show="i.tag">{{i.tag}}</el-tag>
          <span class="name">{{i.name}}</span>
        </div>
        <div class="addr-body">
          <div>联系方式：{{i.phone}}</div>
          <div class="detail">详细地址：{{i.detail}}</div>
        </div>
        <div class="addr-footer clearfix">
          <el-radio :label="i.id" v-model="defaultAddr" style="float: left;" @change="setDefault(i.id)">默认地址</el-radio>
          <div class="action">
            <i style="margin-right: 8px;" @click="editOpen(i, true)">&#xe601;</i>
            <i @click="remove(i.id)">&#xe61d;</i>
          </div>
        </div>
      </div>
      <div class="addr-item" @click="editOpen('', false)">
        <div class="addr-new">
          +
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiAddress from '../../../api/apiAddress'
import { phoneReg } from '../../../helper/reg'
export default {
  data () {
    return {
      list: [],
      defaultAddr: '-1',
      dialogFormVisible: false,
      inputVisible: false,
      inputValue: '',
      props: {
        value: 'name',
        children: 'city'
      },
      province: [],
      city: [],
      county: [],
      pid: '',
      cid: '',
      countyid: '',
      tags: [],
      form: {
        id: '',
        areaId: '',
        detail: '',
        postCode: '',
        name: '',
        phone: '',
        tag: ''
      },
      rules: {
        areaId: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        detail: [
          { required: true, message: '请输入详细收货地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入收货人手机', trigger: 'blur' },
          { pattern: phoneReg, message: '手机号格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getList()
    this.getProvince(0, 0)
    this.getTags()
  },
  methods: {
    async getList () {
      await apiAddress.getAddressList(
        ({list}) => {
          this.list = list
          list.forEach((i) => {
            if (i.is_default) {
              this.defaultAddr = i.id
            }
          })
        }
      )
    },
    async getTags () {
      await apiAddress.getAddressTags(
        ({data}) => {
          this.tags = data
        }
      )
    },
    setTag (tag) {
      this.form.tag = tag
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        apiAddress.addAddressTag({tag: inputValue}, (data) => {
          const {status, msg} = data
          if (status !== 0) {
            this.$message.error(msg)
          } else {
            this.getTags()
          }
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    tagClose (id) {
      apiAddress.removeAddressTag({id}, (data) => {
        const {status, msg} = data
        if (status !== 0) {
          this.$message.error(msg)
        } else {
          this.getTags()
        }
      })
    },
    editOpen (obj, isEdit) {
      this.pid = {}
      this.cid = {}
      this.countyid = {}
      if (isEdit) {
        this.form = {...obj}
        const {areaIds, areaName} = obj
        if (areaIds.length > 0) {
          this.getCity({id: areaIds[0]})
          this.getCounty({id: areaIds[1]})
          setTimeout(() => {
            const names = areaName.split('-')
            this.pid = {id: areaIds[0], name: names[0]}
            this.cid = {id: areaIds[1], name: names[1]}
            this.countyid = {id: areaIds[2], name: names[2]}
          })
        }
      } else {
        this.form = {
          areaId: '',
          detail: '',
          postCode: '',
          name: '',
          phone: '',
          tag: ''
        }
      }
      this.dialogFormVisible = true
    },
    showInput () {
      this.inputVisible = true
    },
    async setDefault (id) {
      this.$confirm('此操作将设置该收货地址为默认, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: '修改中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        try {
          await apiAddress.setDefaultAddress(
            {id},
            (data) => {
              const {status, msg} = data
              if (status == 0) {
                this.$message(
                  {
                    type: 'success',
                    message: msg
                  }
                )
              } else {
                this.$message.error(msg)
                // 数据无变动，遍历回退
                this.list.forEach((i) => {
                  if (i.is_default) {
                    this.defaultAddr = i.id
                  }
                })
              }
            }
          )
        } catch (e) {
          this.$message.error('删除失败')
          // 数据无变动，遍历回退
          this.list.forEach((i) => {
            if (i.is_default) {
              this.defaultAddr = i.id
            }
          })
        } finally {
          loading.close()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消选择'
        })
        // 数据无变动，遍历回退
        this.list.forEach((i) => {
          if (i.is_default) {
            this.defaultAddr = i.id
          }
        })
      })
    },
    async remove (id) {
      this.$confirm('此操作将永久删除该收货地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: '删除中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        await apiAddress.removeAddress(
          {id},
          (data) => {
            const {status, msg} = data
            if (status == 0) {
              this.$message(
                {
                  type: 'success',
                  message: msg
                }
              )
              this.getList()
            } else {
              this.$message.error(msg)
            }
          }
        )
        loading.close()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm () {
      this.$refs['addrForm'].validate(async (valid) => {
        if (valid) {
          this.form.is_default = this.form.is_default ? 1 : 0
          this.form.areaId = this.countyid.id ? this.countyid.id : 0
          if (this.form.id) {
            await apiAddress.editAddress(this.form, (data) => {
              const {status, msg} = data
              if (status !== 0) {
                this.$message.error(msg)
              } else {
                this.$message(
                  {
                    type: 'success',
                    message: msg
                  }
                )
                this.dialogFormVisible = false
                this.getList()
              }
            })
          } else {
            await apiAddress.addAddress(this.form, (data) => {
              const {status, msg} = data
              if (status !== 0) {
                this.$message.error(msg)
              } else {
                this.$message(
                  {
                    type: 'success',
                    message: msg
                  }
                )
                this.dialogFormVisible = false
                this.getList()
              }
            })
          }
        }
      })
    },
    async getProvince (provinceId) {
      await apiAddress.getLevelArea({provinceId, cityId: 0}, (data) => {
        const {data: {list}} = data
        this.province = list
      })
    },
    async getCity ({id}) {
      await apiAddress.getLevelArea({provinceId: id, cityId: 0}, (data) => {
        const {data: {list}} = data
        this.city = list
      })
    },
    async getCounty ({id}) {
      await apiAddress.getLevelArea({provinceId: 0, cityId: id}, (data) => {
        const {data: {list}} = data
        this.county = list
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .address-wrap
    padding-top 18px
    .addr-list
      margin-left -24px
      min-width 1332px
      .addr-item
        border 1px solid #2475e2
        border-radius 4px
        margin-left 24px
        margin-bottom 20px
        width 318px
        background-color #ffffff
        float left
        .addr-new
          text-align center
          height 177px
          line-height 177px
          font-size 44px
          cursor pointer
        .addr-header
          border-bottom 1px solid #2475e2
          padding 12px
          height 49px
          font-size 14px
          .name
            float right
        .addr-body
          padding 12px
          font-size 14px
          .detail
            margin-top 4px
            height 19*3px
            overflow hidden
        .addr-footer
          padding 4px 12px
          color #ff7900
          .action
            font-family 'jzdc'
            float right
            i
              cursor pointer
              &:hover
                color: #2475e2
</style>

<style lang="stylus">
  .address-wrap
    .el-radio.is-checked
      .el-radio__inner
        border-color #ff7900
        background #ff7900
      .el-radio__label
        color #ff7900 !important
    .addr-header
      .el-tag
        height 24px
        line-height 22px
    .el-tag
      cursor pointer
      border-color #ff7900
      color #ff7900
      background-color #fff
      &.select
        background-color rgba(64, 158, 255, .5)
    .el-tag+.el-tag
      margin-left 6px
    .button-new-tag
      margin-left 10px
      height 32px
      line-height 30px
      padding-top 0
      padding-bottom 0
    .input-new-tag
      width 90px
      margin-left 10px
      vertical-align bottom
</style>
