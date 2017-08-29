import { axiosGet, axiosPost } from '@/api/api'
export default {
  getServiceLabel (params) {
    return axiosGet('/api/label/serviceLabel', params)
  },
  adminLabelList (params) {
    return axiosGet('api/label/adminLabelList', params)
  },
  adminGetTypeLabel (params) {
    var adminGetTypeLabelUrl = 'api/label/adminGetTypeLabel'
    return axiosGet(adminGetTypeLabelUrl, params)
  },
// 添加文档标签
  adminUpdateObjectLabel (params) {
    var adminUpdateObjectLabellUrl = 'api/label/adminUpdateObjectLabel'
    return axiosPost(adminUpdateObjectLabellUrl, params)
  },
// 删除文档标签
  adminDeleteMainLabel (params) {
    var adminDeleteMainLabelUrl = 'api/label/adminDeleteMainLabel'
    return axiosPost(adminDeleteMainLabelUrl, params)
  },
// 设置为文档主标签
  adminSetMainLabel (params) {
    var adminSetMainLabelUrl = 'api/label/adminSetMainLabel'
    return axiosPost(adminSetMainLabelUrl, params)
  },
// 修改全部标签列表 的信息
  adminAddLabel (params) {
    var adminAddLabelUrl = 'api/label/adminAddLabel'
    return axiosPost(adminAddLabelUrl, params)
  },
// 删除 全部标签列表
  adminDeleteLabel (params) {
    var adminDeleteLabelUrl = 'api/label/adminDeleteLabel'
    return axiosPost(adminDeleteLabelUrl, params)
  }
}
