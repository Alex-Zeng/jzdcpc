<template>
  <div class="upload-wrap">
    <div class="preview" v-show="show" @click="show=false">
      <img :src="path||defaultPath" alt="">
    </div>
    <h4 class="titleUoload">{{title}}</h4>
    <div class="img-box" v-show="value">
      <i class="delete" @click="deleteImg"></i>
      <img class="img" :src="path||defaultPath" alt="" @click="show=true">
    </div>
    <div class="select-box" @click="open" v-show="!value&&!isProgress">
      <span>点击上传</span>
    </div>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="count" v-show="isProgress" style="margin-top: 100px;"></el-progress>
    <input :id="'img'+id" style="visibility: hidden;height: 0; width: 1px;" type="file" @change="upload" accept="image/gif, image/jpg, image/jpeg, image/bmp, image/png"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'uploadImg',
  props: {
    api: String,
    title: String,
    value: String,
    id: String,
    defaultPath: String
  },
  data () {
    return {
      count: 0,
      isProgress: false,
      path: '',
      show: false
    }
  },
  methods: {
    async upload () {
      let fd = new FormData()
      let file = document.getElementById(`img${this.id}`).files[0]
      let type = 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
      const {size} = file
      if (type.indexOf(file.type) === -1) {
        this.$message.error('上传文件格式不正确')
        return ''
      }
      const OUTSIZE = 8192000
      if (size && size > OUTSIZE) {
        this.$message.error('上传文件大小不可超过8M')
        return ''
      }
      fd.append('type', 'certification')
      fd.append('image', file)

      this.isProgress = true
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          this.count = complete
        }
      }
      try {
        const {data} = await axios.post('/papi/image_upload/index', fd, config)
        const {data: { filename }, status, path} = data
        if (status === 0) {
          this.$emit('input', filename)
          this.path = path
        } else {
          this.$message.error('上传错误')
        }
      } catch (e) {
        this.$message.error('上传错误')
      } finally {
        setTimeout(() => {
          this.isProgress = false
        }, 200)
      }
    },
    open () {
      document.getElementById(`img${this.id}`).click()
    },
    deleteImg () {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .upload-wrap
    overflow hidden
    padding 28px 34px 16px
    border-radius 10px
    border 1px solid #cccccc
    background-color #fff
    width 240px
    height 240px
    box-sizing border-box
    .preview
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      background-color rgba(0, 0, 0, 0.4)
      z-index 9999
      img
        width 800px
        height 448px
        display block
        left 50%
        top 50%
        position absolute
        margin-left -400px
        margin-top -224px
    .titleUoload
      font-size 18px
      color #222
      font-weight 400
      text-align center
    .select-box
      cursor pointer
      width 170px
      height 108px
      padding-top 114px
      margin 16px auto 0
      background url("~assets/img/common/select_img.png")
      position relative
      text-align center
      span
        color #2fbeed
        font-size 18px
        cursor pointer
    .img-box
      width 180px
      height 114px
      margin 38px auto 0
      position relative
      .img
        width 100%
        height 100%
        border 1px solid #ccc
      .delete
        display block
        width 28px
        height 28px
        background url("~assets/img/common/delete.png")
        position absolute
        right -14px
        top -14px
</style>
