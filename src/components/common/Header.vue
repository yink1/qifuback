<template>
  <div class="header">
    <div class="logo">后台管理系统</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{userName}}
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '@/store/types'
  import userService from '@/services/userService'
  export default {
    computed: {
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS],
          isCompanyUser: [types.IS_COMPANY_USER],
          userName: [types.GET_USER_NAME]
        }
      )
    },
    methods: {
      handleCommand (command) {
        if (command === 'loginout') {
          userService.logout()
            .then(response => {
              console.log('logout response')
              console.log(response)
              this.setUserLogout()
              this.$router.push('/login')
            })
        }
      },
      ...mapMutations({
        setUserLogout: [types.SET_USER_LOGOUT]
      })
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
  }
  
  .header .logo {
    float: left;
    width: 250px;
    text-align: center;
  }
  
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  
  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  
  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
