<template>
  <div class="setting-others-wrap"
       v-loading="setting"
       element-loading-spinner="el-icon-loading"
       element-loading-lock="true"
       element-loading-text="设置中"
  >
    <upload-2 v-model="show" field="image" :params="{type: 'user_icon'}" url="/papi/image_upload/index" @crop-upload-success="uploadSuccess"></upload-2>
    <el-form>
      <el-form-item label="联系人姓名：" label-width="104px">
        <el-input style="width: 340px;" v-model="settingForm.contact" @blur="set(settingForm.contact, 'contact')"></el-input>
      </el-form-item>
      <el-form-item label="联系人固话：" label-width="104px">
        <el-input style="width: 340px;" v-model="settingForm.tel" @blur="set(settingForm.tel, 'tel')"></el-input>
      </el-form-item>
      <el-form-item label="企业LOGO：" label-width="104px">
        <el-button type="primary" @click="show=true">添加本地头像</el-button><span class="tips">仅限JPG/JPEG/PNG格式，单张1M以内</span>
      </el-form-item>
      <el-form-item label=" " label-width="104px">
        <div class="preview">
          <img :src="preview" alt="" v-if="preview" class="ava">
          <div class="preview-tips" v-else>此处预览</div>
        </div>
        <!--<el-button type="primary" style="width: 140px;">提交</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Upload2 from 'vue-image-crop-upload'
import api from '../../../api/apiSetting'
import Cookies from 'js-cookie'
export default {
  name: 'others',
  components: {Upload2},
  data () {
    return {
      show: false,
      preview: '',
      settingForm: {
        contact: '',
        icon: '',
        tel: ''
      },
      setting: false
    }
  },
  methods: {
    uploadSuccess (json) {
      const {path, data: {filename}} = json
      this.preview = path
      this.settingForm.icon = filename
      this.set(filename, 'icon')
      this.show = false
    },
    set (value, type) {
      this.setting = true
      try {
        api.set((data) => {
          const {status, msg} = data
          if (parseInt(status) === 0) {
            this.$message({
              type: 'success',
              message: msg
            })
            const all = JSON.parse(Cookies.get('_user'))
            Cookies.set('_user', JSON.stringify({...all, ...this.settingForm, path: this.preview}))
          } else {
            this.$message.error(msg)
          }
        }, {field: type, value})
      } catch (e) {
        this.$message.error('网络有点小问题，请刷新后重试')
      } finally {
        this.setting = false
      }
    }
  },
  mounted () {
    api.getProfile((data) => {
      const {tel, icon, contact, path} = data
      this.settingForm = {tel, icon, contact}
      this.preview = path
    })
  }
}
</script>

<style lang="stylus" scoped>
.setting-others-wrap
  margin-top 10px
  border-radius 5px
  background-color #fff
  padding 20px
  .tips
    color #999999
    font-size 14px
    padding-left 10px
  .preview
    width 340px
    height 200px
    border 1px solid #dedede
    margin-bottom 22px
    .ava
      width 148px
      height 148px
      line-height 148px
      color #fff
      background-color #ccf2ff
      border-radius 50%
      font-size 18px
      margin 26px auto 0
      text-align center
      display block
    .preview-tips
      width 148px
      height 148px
      line-height 148px
      color #fff
      background-color #ccf2ff
      border-radius 50%
      font-size 18px
      margin 26px auto 0
      text-align center
</style>
