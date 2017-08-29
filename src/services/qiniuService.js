import { axiosGet } from '@/api/api'
export default {
  getQiniuToken () {
    var qiniuUrl = 'api/qiniu/getToken'
    return axiosGet(qiniuUrl)
  }
}
