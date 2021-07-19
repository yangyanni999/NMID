<template>
   <div class='main'>
    <el-card>
      <h2>Moods注册页面</h2>
    <div class='apply_box'>
        <el-form
        class="form"
        ref="formRef"
        :model="form"
        :rules="apply_rules"
        label-width="80px"
       
      >
        <!-- 用户名 -->
        <el-form-item prop="username" label="昵称">
          <el-input
            placeholder="昵称"
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
          >
          </el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item prop="gender" label="性别">
            <el-select v-model="form.gender" placeholder="男">
                <el-option label="男" value="false"></el-option>
                <el-option label="女" value="true"></el-option>
              </el-select>
          </el-form-item>
        <!-- 年龄 -->
        <el-form-item prop="age" label='年龄'>
          <el-input
            placeholder="年龄"
            v-model="form.age"
          >
          </el-input>
        </el-form-item>
         <!-- 电话号码 -->
         <el-form-item prop="tel" label="电话号码">
          <el-input
            placeholder="输入电话号码"
            prefix-icon="el-icon-user-solid"
            v-model="form.tel"
          >
          </el-input>
        </el-form-item>
         <!-- 验证码 -->
         <el-form-item prop="checkWords" label="验证码" class="check">
          <el-input
            placeholder="输入验证码"
            class='check_input'
            v-model="form.checkWords"
          >
          </el-input>
            <el-button class='sendcw' type="primary" @click='receive' :disabled="btnshow">{{yanzhenma}}</el-button>
        </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" label='密码'>
            <el-input
              type="password"
              placeholder="密码设置"
              prefix-icon="el-icon-lock"
              v-model="form.password"
            >
            </el-input>
          </el-form-item>
        <!-- 登录 -->
        <el-row class="apply">
          <el-button class="btn" type="primary" @click="login()">注册</el-button>
        </el-row>
      </el-form>
    </div>
  </el-card>
   </div>
  </template>

<script>
export default {
  data () {
    var checkYzm=(rule,value,callback)=> {
      if(!value)
      {
        return callback(new Error('请输入验证码'))
      }
      else 
      {
        if(value==this.LoginWords)
      {
        callback()
      }
      else {
        return callback(new Error('验证码输入错误'))
      }
    }
  }
    var checkTel = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback()
        } 
        else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    return {
      form: {
        username: '',
        password: '',
        gender:'',
        age:'',
        tel:'',
        checkWords:'',
        LoginWords:[],
        genderTest:'',
      },
      yanzhenma:'获取验证码',
        btnshow:false,
     apply_rules: {
        username: [
          { required: true, message: '请设置昵称哦', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7个字符哦', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入正确密码哦',
            trigger: 'blur'
          }
        ],
        gender:[
          {
            required:true
          }
        ],
        age:[{
          required: true,message:'请输入年龄哦',trigger:'blur',
          min:1,max:3,message:'年龄输入错误哦',trigger:'blur'
        }],
        tel:[{
          validator:checkTel,trigger:'blur',
          required:true,message:'请输入手机号',trigger:'blur',
          min:11,max:11,message:'请检查手机号格式哦',trigger:'blur'
        }],
        checkWords:[{
          validator:checkYzm,trigger:'blur'
        }]
      }
    }
  },
  methods: {
    async receive () {
      if (this.tel == '') {
        alert('请输入电话号码哦')
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
      var date='/smsXxs?phone='+this.tel
      const res = await this.$http.get(date)
      console.log(res)
      if (res.status == 200) {
        this.LoginWords = res.data.verifyCode
      }
    },
    login () {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        const date = await this.$http.get('/is_repeat', {
            params: {
              psw: this.form.password,
              nick_name: this.form.tel
            }
          })
          if (date.status == 200) {
            var date1 = date.data.data
            var date2 = ''
            for (var i in date1) {
              date2 = date1[i]
            }
            if (date2 == 'true') {
              alert('手机号码已被注册')
            } 
            else {
              console.log('未被注册')
              const LoginUrl='/register?age='+this.form.age+'&gender='+this.form.gender+'&name='
              +this.form.username+'&pin='+this.form.checkWords+'&psw='+this.form.password+'&tel='+this.form.tel
              const res=await this.$http.post(LoginUrl)
              console.log(res);
             if(res.status==200)
             {
               this.$router.push('/login')
             }
            }
          }
      })
    }
  }
}
</script>

  <style lang="less">
  .main {
      width: 100%;
      height: 500px;
      background-image: url('../assets/img/注册背景图.png');
      background-size: contain;
      background-repeat: no-repeat;
      .el-card{
        width:400px;
          height:525px;
          position:absolute;
          top:10px;
          right:100px;
          text-align:center;
      .apply_box {
          box-sizing:border-box;
          width:350px;
          height:350px;
          .form {
      box-sizing: border-box;
      width: 350px;
      .el-button
      {
          width: 250px;
          height: 40px;
          margin:auto;
      }
      .el-input
      {
          width:220px;
      }
    }
      .check {
        display: flex;
        .check_input {
        width:45%;
        margin-right: 30px;
      }
      .sendcw {
        width: 25%;
        font-size: 12px;
        padding-left: 3px;
      }
      }
      }
    }
  }
  </style>
