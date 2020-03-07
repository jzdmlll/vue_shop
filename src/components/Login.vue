<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_box_left">
        <div class="left_bigpage">
          <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
          </div>
          <span><h2>Welcome</h2>欢迎登陆 <font>小鲤招领</font></span>
        </div>
      </div>
      <div class="form_div">
        <div class="m_form_div">
          <div class="m_welcome">
            <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
            </div>
            <span><h2>Welcome</h2>欢迎登陆 <font>小鲤招领</font></span>
          </div>
          <!-- <form class="box" action="#" method="post">
            <div class="form_container">
              <h2>登陆</h2>
              <input type="text" name="" placeholder="用户名/手机号">
              <div class="password_div">
                <input id="password" type="password" name="" placeholder="密码">
                <span class="show-pwd" @click="showPwd">
                  <i :class="passwordType === 'password' ? 'fa fa-eye-slash' : 'fa fa-eye'" />
                </span>
              </div>
              <input type="submit" name="" value="登 录">
              <font size="1" color="#6c86b1">其他登录方式</font>
              <a class="qq">
                <img src="../assets/qq.png" width="50px" height="auto">
              </a>
            </div>
          </form> -->
          <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on" label-position="center">
            <div class="form_container">
              <h2>登陆</h2>
              <el-form-item>
                <el-input 
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="用户名/手机号"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input 
                  ref="password"
                  v-model="loginForm.password"
                  placeholder="密码"
                  name="password"
                  type="password"
                  id="password"
                  tabindex="2">
                </el-input>
                <span class="show-pwd" @click="showPwd">
                  <i :class="passwordType === 'password' ? 'fa fa-eye-slash' : 'fa fa-eye'" />
                </span>
              </el-form-item>
              <el-form-item><el-button @click="login()">登录</el-button></el-form-item>
              <font size="1" color="#6c86b1">其他登录方式</font>
              <a class="qq">
                <img src="../assets/qq.png" width="50px" height="auto">
              </a>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  data () {
    return {
      passwordType: 'password',
      loginForm: {

      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        document.getElementById('password').type = 'text'
      } else {
        this.passwordType = 'password'
        document.getElementById('password').type = 'password'
      }
    },
    login() {
      this.$http.post('user/login', this.loginForm)
        .then( res => {
          if(res.data.status === 200) {
            setToken(res.data.data.token)
            this.$router.push("/home")
            return this.$message.success(res.data.message)
          }else {
            return this.$message.error(res.data.message)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #e8f0fe;
  height: 100%
}

.login_box {
  width: 700px;
  height: 400px;
  background-color: rgba(22, 22, 22, 0.2);
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: 4px 4px 4px 1px #6f6f6f;
  .login_box_left{
    width: 60%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(../assets/123456.gif) center;
    background-size: auto 100%;
    border-radius: 6px 0 0 6px;
    overflow: hidden;
    .left_bigpage{
      background-color: rgba(22, 22, 22, 0.5);
      height: 100%;
      span {
        position: absolute;
        width: 40%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        color: #eee;
        font { color:#bbdebb }
      }
    }
  }
}
.form_div {
  background: url(../assets/bg4.jpg);
  background-size: auto 100%;
  width: 40%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 0 6px 6px 0;
  overflow: hidden;
}
.login-form {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  .qq {
    display: block;
    cursor: pointer;
    position: absolute;
    margin: 10px 0;
    left: 50%;
    transform: translate(-50%);
    width: 50px;
    height: 40px;
  }
  .show-pwd {
    position: absolute;
    height: 40px;
    left: 50%;
    transform: translate(70px);
    top:10px;
    padding: 10px 0;
    font-size: 16px;
    color: #767a81;
    cursor: pointer;
    user-select: none;
  }
}
.login-form h2 {
  margin: 30px 0;
  color: #e8f0fe;
  text-transform: uppercase;
  font-weight: 500;
}
/deep/.login-form .el-input__inner {
  background: #e8f0fe;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #7a57d1;
  padding: 12px 10px;
  width: 200px;
  outline: none;
  color: black;
  border-radius: 24px;
  transition: 0.25s;
}
/deep/.login-form .el-input__inner:focus {
  width: 250px;
  border-color: #2ecc71;
}
/deep/.login-form .el-form-item {
  margin: 0;
  height: 70px;
}
.login-form .el-button {
  cursor: pointer;
  background: none;
  display: block;
  margin: 10px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40px;
  outline: none;
  color: #eee;
  border-radius: 24px;
  transition: 0.25s;
}
.login-form .el-button:hover {
  background: #2ecc71;
  color: #eee
}
.avatar_box {
  height: 50px;
  width: 50px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 1px;
  position: absolute;
  top: 20%;
  left: 185px;
  background-color: #eee;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.m_welcome {
  display: none;
  .avatar_box {
    top: 80px;
    left: 50%;
    transform: translate(-50%);
  }
}
.m_form_div {
  height: 100%;
  background-color: rgba(22, 22, 22, 0.3);    
}
@media only screen and (max-width: 768px) {
  .login_box, .form_div {
    width: 100%;
    height: 100%;
  }
  .login_box_left {
    width: 0!important;
    height: 0!important;
    overflow: hidden!important;
  }
  h2 {
    display: none;
  }
  .m_welcome {
    height: 40%;
    text-align: center;
    display: block;
    .avatar_box {
      top: 20%;
    }
    span {
      display: block;
      padding: 80px 0;
      top: 20%;
      left: 50%;
      transform: translate(-50%);
      position: absolute;
      font { color:#bbdebb }
    }
  }
  .form_container {
    height: 70%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    line-height: 100%;
  }
  /deep/.login-form .el-input__inner {
    width: 60%;
    height: 100%;
  }
  /deep/.login-form .el-input__inner:focus {
    width: 80%;
  }
  .login-form .el-button {
    width: 36%;
  }
  .show-pwd {
    left: 65%!important;
    transform: translate(100%)!important;
  }
  /deep/.login-form .el-form-item {
    margin: 0;
    height: 80px;
  }
}
</style>
