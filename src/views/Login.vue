<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '@/store/types'
  import userService from '@/services/userService'
  export default {
    data: function () {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
//   使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters(
        {
          isAdminUser: [types.IS_ADMIN_USER]
        }
      )
    },
    methods: {
      submitForm (formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            userService.Login({'grant_type': 'password', 'username': this.ruleForm.username, 'password': this.ruleForm.password})
            .then(response => {
              console.log('Login')
              console.log(response)
              this.setUserLoginInfo(response)
              // todo:获取用户信息
              userService.GetMemberInfo()
                .then(response => {
                  this.SetUserData(response.data)
                  console.log('userService.UserInfo')
                  console.log(response)
                  // 获取地址栏参数
                  if (this.isAdminUser) {
                    if (this.$route.query.redirect === undefined) {
                      this.$router.push('/serviceList')
                    } else {
                      this.$router.push(this.$route.query.redirect)
                    }
                  } else {
                    this.setUserLogout()
                    this.$router.push('/login')
                  }
                })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      ...mapMutations({
        setUserLoginInfo: [types.SET_USER_LOGIN_INFO],
        SetUserData: [types.SET_USER_DATA],
        setUserLogout: [types.SET_USER_LOGOUT]
      })
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }
  
  .login-btn {
    text-align: center;
  }
  
  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
