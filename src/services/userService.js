import { axiosPost, axiosGet } from '@/api/api'
export default {
/**
 * 用户登录
 */
  Login (params) {
    // params = JSON.stringify(params)
//  console.log(params)
// http://api.thinkwit.com/token
// grant_type=password&username=15026736556&password=123456
    return axiosPost('/token', params)
  },
// 获取图片验证码 userService.getImageCode
  GetImageCode () {
    return axiosGet('/api/Code/ImageCode')
  },
// 获取短信验证码 userService.getSmsCode
  GetSmsCode (params) {
    return axiosGet('/api/Code/SmsCode', params)
  },
  /**
   * 用户注册
   */
  Regist (params) {
//  http://qifuapi.thinkwit.com/api/Account/Register
    return axiosPost('/api/Account/Register', params)
  },
  /**
   * 获取用户信息
   */
// UserInfo (id) {
//  return axiosGet('/api/Account/UserInfo', {
//    userId: id
//  })
// },
  // 获得用户信息  暂无返回值 userService.getMemberInfo
  GetMemberInfo () {
    return axiosGet('/api/Account/UserInfo')
  },
  // 修改用户信息
  EditMemberInfo (params) {
    return axiosPost('/api/Account/editUserInfo', params)
  },
  // 修改用户密码
  changePassword (params) {
    return axiosPost('/api/Account/setPassword', params)
  },
  // 获得用户最近浏览的服务列表
  GetServiceHistoryList (params) {
//  return {
//    'msg': 'ok',
//    'count': 20,
//    'data': [
//      {
//        'companyId': '1012',
//        'companyName': '思齐',
//        'serviceId': '12345',
//        'picUrl': 'http://cdn.siqiquan.org/%E5%9B%BE%E7%89%872.jpg',
//        'serviceName': '定制服务',
//        'introduce': '测试服务',
//        'favoriteFlag': true
//      },
//      {
//        'companyId': '1013',
//        'companyName': '行睿',
//        'serviceId': '12345423',
//        'picUrl': 'http://cdn.siqiquan.org/%E5%9B%BE%E7%89%872.jpg',
//        'serviceName': '专属定制服务',
//        'introduce': '测试专属服务',
//        'favoriteFlag': true
//      }
//    ]
//  }
    var getServiceHistoryListUrl = 'api/userTrace/serviceHistoryList'
    return axiosGet(getServiceHistoryListUrl, params)
  },
  //  userService.getDocHistoryList  获得用户最近浏览的文档列表
  GetDocHistoryList (params) {
    var getDocHistoryListUrl = 'api/userTrace/docHistoryList'
    return axiosGet(getDocHistoryListUrl, params)
  },
  PostAddHistory (params) {
    var postAddHistoryUrl = 'api/userTrace/addHistory'
    return axiosPost(postAddHistoryUrl, params)
  },
  /**
 * 用户登录
 */
  logout () {
    return axiosPost('/api/account/logout', {})
  },
/* 后台 用户列表 */
  // 获得用户列表
  getUserList (params) {
    return axiosGet('/api/Account/userList', params)
  },
  // 获得所有角色
  getAllRoles (params) {
    return axiosGet('/api/Account/getAllRoles', params)
  },
  // 获得个人角色信息
  getRole (params) {
    return axiosGet('/api/Account/getRole', params)
  },
  // 更新个人角色信息
  updateMemberRole (params) {
    return axiosPost('/api/Account/updateMemberRole', params)
  }
}
