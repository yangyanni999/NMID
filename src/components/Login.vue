<template>
  <div class="main">
    <div class='login_box'>
      <h>欢迎登录Moods</h>
      <!-- 登录方式选择 -->
      <div class="login_way" @click="changeWay">0 {{loginWay}}</div>
      <!-- 登录框 -->
      <!-- 密码登录时 -->
      <template v-if="loginWay==='密码登录'">
      <div class="login_item">
          <div class='username'>
              <input  placeholder="输入用户名" v-model='username'/>
          </div>
          <div class='yanzhenma'>
              <span><input placeholder="输入验证码" v-model='checkWords'/></span>
              <button @click='receive' :disabled=btnshow>{{yanzhenma}}</button>
          </div>
        </div>
        </template>
        <!-- 验证码登录时 -->
        <template v-else-if="loginWay==='验证码登录'">
          <div class="login_item">
            <div class='username'>
                <input  placeholder="输入用户名" v-model='username'/>
            </div>
            <div class='mima'>
                <input placeholder="输入密码" v-model='password'/>
            </div>
        </div>
        </template>
        <button @click="userLogin()">登录</button>
        <div class="zhuche" @click='zhuche'>注册</div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      loginWay: '验证码登录',
      username: '',
      checkWords: '',
      loginWords: '',
      password: '',
      yanzhenma:'获取验证码',
      btnshow:false
    }
  },
  methods: {
    zhuche () {
      this.$router.push('/apply')
    },
    async userLogin () {
      if (this.loginWay === '密码登录') {
        if (this.username == '' || this.checkWords === '') {
          alert('请输入邮箱或密码哦')
          return
        }
        const LoginUrl = '/users/load?' + 'pin=' + this.checkWords + '&tel=' + this.username
        const res = await this.$http.post(LoginUrl)
        console.log(res)
        if (res.status == 200) {
          if (this.loginWords == this.checkWords) {
            console.log('登录成功')
            this.$router.push('/home')
          } else { alert('请输入正确验证码') }
        } else {
          alert('登录失败')
        }
      } else if (this.loginWay === '验证码登录') {
        if (this.username == '' || this.password === '') {
          alert('请输入邮箱或密码哦')
          return
        }
        const LoginUrl = '/users/load?' + 'psw=' + this.password + '&tel=' + this.username
        const res = await this.$http.post(LoginUrl)
        console.log(res)
        if (res.status == 200) {
          const date = await this.$http.get('/is_repeat', {
            params: {
              psw: this.password,
              nick_name: this.username
            }
          })
          if (date.status == 200) {
            var date1 = date.data.data
            var date2 = ''
            for (var i in date1) {
              date2 = date1[i]
            }
            if (date2 == 'true') {
              console.log('登录成功')
              this.$router.push('/main')
            } else {
              alert('电话号码或密码错误')
            }
          }
        } else {
          alert('登录失败')
        }
      }
    },
    changeWay () {
      this.loginWay = (this.loginWay === '验证码登录') ? '密码登录' : '验证码登录'
      return this.loginWay
    },
    async receive () {
      if (this.username == '') {
        alert('请输入邮箱哦')
        return
      }
      var back_time=60;
      var timer=setInterval(()=>{
        if(back_time>0)
        {
          back_time=back_time-1;
          this.yanzhenma=back_time+'s';
          this.btnshow=true
        }
        else
        {
          this.btnshow=false
          this.yanzhenma='获取验证码'
          clearInterval(timer)
      }},1000)
      const res = await this.$http.get('/smsXxs', {
        params: {
          phone: this.username
        }
      })
      console.log(res)
      if (res.status == 200) {
        this.loginWords = res.data.verifyCode
      }
    }
  }
}

</script>
<style scoped lang="less">
  .main {
      width: 100%;
      height: 500px;
      background-image: url('../assets/img/登录背景图.png');
      background-size: contain;
      background-repeat: no-repeat;
      .login_box{
        box-sizing: border-box;
          height: 400px;
          width: 400px;
          position: absolute;
          top: 100px;
          right: 100px;
          text-align: center;
          h{
              font-size:24px;
              color: #000;
          }
          .login_way {
              margin-top: 20px;
             width: 90%;
             text-align: right;
             color: #83CCDA;
          }
          .login_item {
              margin-top:30px;
              display:flex;
              flex-direction: column;
              justify-content: space-between;
              height: 150px;
              .username, .mima{
                 margin: auto;
                  width:300px;
                  height:50px;
                  border-radius:50px;
                  border:2px solid #83CCDA;
                  input {
                outline: none;
                font-size: 16px;
                width: 80%;
                height: 96%;
                border: 0;
  }
}
      .yanzhenma{
      margin: auto;
      width:300px;
     span {
      display:inline-block;
      width:160px;
      height:50px;
      border-radius:50px;
      border:2px solid #83CCDA;
      input {
                outline: none;
                font-size: 16px;
                width: 70%;
                height: 96%;
                border: 0;
                  }
     }
     button {
         width:100px !important;
         margin-left:30px
     }
  }
          }
          button {
                  margin: auto;
                  width: 300px;
                  height: 50px;
                  border-radius: 50px;
                  border: 0;
                  margin-top: 20px;
                  background-color:#83CCDA;
                  color:white;
                  font-size:16px
              }

      }
      .zhuche {
        margin-top:20px;
        color:#83CCDA;
        padding-left:250px
      }
  }
</style>
