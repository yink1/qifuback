<template>
<div>
    <form :id="formId" method="post" enctype="multipart/form-data">
        <input name="token" type="hidden" :value="uptoken">
        <!--<input name="file" type="file" @change='upload'/>-->
        <input name="file" type="file" class="file-button" @change='upload' :accept="accept"/>
        <input name="accept" type="hidden" />
    </form>       
    <!--<b>选择文件</b>：{{ fileName }}<br/>
    <b>上传进度</b>：{{ loaded }} MB / {{ fileSize }} MB, {{ percent }}%<br/>
    <b>上传结果</b>：{{ result }}<br/>-->
</div>
</template>

<script>
import { axiosPost } from '@/api/api'
export default {
  data () {
    return {
      rgbaBg: 'rgbaBg',
      fileName: '',
      fileSize: '',
      loaded: '',
      percent: '',
      result: '',
      open: false,
      anchorOrigin: {
        vertical: 'center',
        horizontal: 'middle'
      },
      targetOrigin: {
        vertical: 'center',
        horizontal: 'middle'
      }
    }
  },
  props: {
    formId: {
      type: String,
      required: true
    },
    uptoken: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: 'image/gif,image/jpeg,image/jpg,image/png'
    },
    domain: {
      type: String,
      default: process.env.QINIU_CDN_URL
    },
    trigger: {
      default: null
    }
  },
  methods: {
    handleClose () {
      this.open = false
    },
    stringify (obj) {
      return JSON.stringify(obj)
    },
    upload (event) {
      console.log(4567, this.trigger)
      let _this = this
      _this.open = true
      let file = event.target.files[0]
      console.log('file')
      console.log(file)
      if (file) {
        this.fileName = file.name
        let formData = new FormData(document.getElementById(this.formId))
        var fileName = new Date().getTime() + file.name
        formData.append('key', fileName)
        console.log('formData')
        console.log(this.formId)
        axiosPost('http://upload.qiniu.com/', formData, {
          progress (event) {
            _this.loaded = (event.loaded / 1000000).toFixed(2)
            _this.fileSize = (event.total / 1000000).toFixed(2)
            _this.percent = (event.loaded / event.total * 100).toFixed(2)
          }
        })
        .then(response => {
          var sourceLink = _this.domain + '/' + response.key // 获取上传成功后的文件的Url
          _this.$emit('setUploadedFileInfo', _this.formId, fileName, sourceLink)
          setTimeout(function () {
            _this.open = false
          }, 100)
          // _this.open = false
          //  _this.$emit('changOpen', true)
        }, error => {
          console.log('qiniuError')
          console.log(error)
          this.result = '错误码：' + error.status + ' 错误信息：' + error.data.error
        })
      } else {
        _this.open = false
      }
    }
  },
  watch: {
//  open (val) {
//    if (val === true) {
//      document.getElementsByTagName('body')[0].classList.add('addPopClass')
//    } else {
//      document.getElementsByTagName('body')[0].classList.remove('addPopClass')
//    }
//  }
  }
}
</script>

<style>
.addPopClass .mu-popover{
  width:90px!important;
  height:100px!important;
  background-color:rgba(0,0,0,0)!important;
  box-shadow: 0 0px 0px rgba(255,255,255,1), 0 0px 0px rgba(255,255,255,1)!important;
}
.file-button {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  height:100%;
  width:100%;
  cursor: pointer;
}
</style>

