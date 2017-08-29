  import { axiosGet, axiosPost } from '@/api/api'
  export default {
    // 后台获取服务商列表
    getAdminCompanyList (params) {
      var getAdminCompanyListUrl = 'api/company/adminCompanyList'
      return axiosGet(getAdminCompanyListUrl, params)
    },
     /**
     * 后台企业审核   api/company/adminUpStatus
     */
    adminUpStatus (params) {
      var adminUpStatusUrl = '/api/company/adminUpStatus'
      return axiosPost(adminUpStatusUrl, params)
    }
  }
