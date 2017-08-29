import * as types from '../types'
// import userService from '@/services/userService'

// 使用添加了前缀的名称定义 getter、action 和 mutation
const user = {
  state: {
    // 用户登录状态
    userInfo: {},
    // 用户数据信息
    userData: {},
    // 用户权限数据
    userRoles: []
  },
  getters: {
    [types.GET_USER_LOGIN_STATUS]: state => {
//    console.log('get GET_USER_LOGIN_STATUS ')
//    console.log(state.userInfo['.expires'])
      var test = new Date(state.userInfo['.expires'])
//    console.log(test)
      if (!state.userInfo.access_token) {
//      console.log('return false 2')
        return false
      } else if (state.userInfo['.expires'] && test >= Date.now()) {
//      console.log('return true ')
        return true
      } else {
//      console.log('return false 1')
        return false
      }
    },
    [types.GET_USER_NAME] (state) {
      console.log('get GET_USER_NAME ')
      console.log(state.userData)
      console.log(state.userData.name)
      if (state.userData) {
        return state.userData.name
      } else {
//      是否需要设置替代值
        return ''
      }
    },
    [types.GET_USER_PHONENUM] (state) {
//    console.log('get GET_USER_PHONENUM ')
      if (state.userData.phoneNumber) {
        return state.userData.phoneNumber
      } else {
        return ''
      }
    },
    [types.GET_USER_TOKEN] (state) {
//    console.log('get GET_USER_access_token ')
      if (state.userInfo.access_token) {
        return state.userInfo.access_token
      } else {
        return ''
      }
    },
    [types.IS_COMPANY_USER] (state) {
      var result = false
//    console.log('this.userRoles')
//    console.log(state.userData)
      if (state.userRoles) {
        for (var i = 0; i < state.userRoles.length; i++) {
          if (state.userRoles[i] === 'CompAdmin') {
            result = true
            break
          }
        }
      }
      return result
    },
    [types.IS_ADMIN_USER] (state) {
      var result = false
//    console.log('this.userRoles')
//    console.log(state.userData)
      if (state.userRoles) {
        for (var i = 0; i < state.userRoles.length; i++) {
          if (state.userRoles[i] === 'Admin') {
            result = true
            break
          }
        }
      }
      return result
    }
  },
//  actions: {
//    [types.FETCH_USER_LOGIN_INFO] ({
//      commit
//    }, userLoginInfo) {
//      userService.Login(userLoginInfo)
//        .then(response => {
//          console.log('response.data from userLoginInfo action')
//          console.log(response)
//          commit(types.SET_USER_LOGIN_INFO, response)
//        },
//        err => {
//          console.log(err)
//        })
//        .catch((error) => {
//          console.log(error)
//        })
//    }
//  },
  mutations: {
    [types.SET_USER_LOGIN_INFO] (state, userInfo) {
//    console.log('set userinfo')
//    console.log(userInfo)
      state.userInfo = userInfo
      // localStorage.setItem('userInfo', userInfo)
    },
    [types.SET_USER_DATA] (state, userData) {
//    console.log('set userData')
//    console.log(userData)
      state.userData = userData
//    console.log('state.userData')
//    console.log(state.userData)
      state.userRoles = userData.roles
//    console.log('state.userRoles')
//    console.log(state.userRoles)
    },
    [types.SET_USER_LOGOUT] (state) {
//    console.log('SET_USER_LOGOUT')
      state.token = ''
//    console.log(state.token)
      state.userData = []
      state.userRoles = []
      state.userInfo = {}
//    console.log(state.userData)
//    console.log(state.userRoles)
    }
  }
}
export default user
