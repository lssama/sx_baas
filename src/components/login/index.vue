<template>
    <div class="loginBox">
        <div class="login-header">
            <div>Baas管理平台</div>
        </div>
        <div class="login">
            <div class="bg-img"></div>
            <div class="user-login">
                <div>
                    <span>登录</span>
                </div>
                <div class="login-ipts">
                    <div><input v-model="username" type="text" placeholder="用户名"></div>
                    <div><input v-model="password" type="password" placeholder="密码"></div>
                </div>
                <div>
                    <!-- <span @click="loginFun">登录</span> -->
                    <span @click="userLogin">登录</span>
                </div>
            </div>
        </div>
        <div class="footerbox">
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import { mapActions } from "vuex";
import Footer from "../footer";
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  components: {
    Footer
  },
  mounted() {
    let isLogin = sessionStorage.getItem('publicKey')
    if(isLogin) {
      this.$router.push({path:'/chainList'})
    }
  },
  computed: {},
  methods: {
    ...mapActions(["getPublickey"]),
    userLogin() {
      if(this.username.length < 1 || this.username.match(/^[ ]+$/)) {
        this.$message.error('用户名不能为空')
      }else if (this.password.length < 1) {
        this.$message.error('请输入密码')
      }else if(this.password.indexOf(' ') > -1) {
        this.$message.error('密码不能包含空格')
      }else {
         let userInfo = {
          user_name : this.username,
          user_pass : this.password
        }
        this.getPublickey(userInfo)
      }
    },
  }
};
</script>
<style lang="less">
@import "../../assets/css/page.less";
.loginBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div:last-child {
    align-self: flex-end;
    width: 100%;
  }
  .login-header {
    width: 100%;
    background-color: #0099ff;
    height: 100px;
    line-height: 100px;
    color: #fff;
    margin: 0 auto;
    div {
      width: 1200px;
      margin: 0 auto;
      font-size: 24px;
    }
  }
}
</style>
