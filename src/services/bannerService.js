
  import { axiosPost, axiosGet } from '@/api/api'
  export default {
/**
 * 获取轮播图   http://qifuapi.thinkwit.com/api/banner/bannerList?category=homepage
 */
    getBannerList (params) {
      console.log('params')
      console.log(params)
      // var bannerUrl = '/api/banner/bannerList?category=' + params.category
      return axiosGet('/api/banner/bannerList', params)
    },
    getAdminBannerList (params) {
      console.log('params')
      console.log(params)
      return axiosGet('/api/banner/adminBannerList', params)
    },
    // api/banner/adminBannerList
    adminAddBanner (params) {
      return axiosPost('/api/banner/adminAddBanner', params)
    },
    adminDeleteBanner (params) {
      return axiosPost('/api/banner/adminDeleteBanner', params)
    },
    adminGetBanner (params) {
      return axiosGet('/api/banner/adminGetBanner', params)
    }
  }
