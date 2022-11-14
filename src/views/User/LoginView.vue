<template>
    <div class="login">
      <div class="head">
        <div class="return" @click="getback"></div>
      </div> 
      <div class="title">密码登录</div> 
      <div class="inp">
        <div class="inp-item">
          <span>账号</span>
          <input type="text" 
          placeholder="请输入用户名、邮箱" 
          v-model.trim="text"
          >
        </div>
        <div class="inp-item">
          <span>密码</span>
          <input type="password" 
          placeholder="请输入密码"
          v-model.trim="password"
          >
        </div>
        
      </div> 
      <div class="box">
        <div class="login" @click="addToken()">登录</div>
        <p>验证码快速登录</p>
      </div>
      <div class="footer">
        <div class="change">
          <div class="change-item">
            <img src="@/assets/icon/wx.png" 
            style="width: 45px;
            height: 45px; margin-top:2px;">
          </div>
          <div class="change-item">
            <img src="@/assets/icon/wb.png" alt="">
          </div>
          <div class="change-item">
            <img src="@/assets/icon/qq.png" alt="">
          </div>
        </div>
      </div>
      <!-- <div class="xie">
          <input type="checked">
          登录即表示同意《用户协议》及隐私协议
        </div> -->
    </div>
  </template>
  
  
  <script>
  import { mapMutations } from "vuex";
  export default {
    data() {
      return {
          text:'',
          password:''
      };
    },
    created() {
      
    },
    computed: {
      vuexTokens() {
      return this.$store.state.Tokens;
    },
    },
    watch: {
      
    },
    methods: {
      async addToken() {
      if (this.text&&this.password) {
        this.commitAddToken({
          text:this.text,
          password : this.password,
          user:'用户555',
          logo:'https://tse4-mm.cn.bing.net/th/id/OIP-C.hF5vKjg2T0s27BjncAXVTAHaHa?pid=ImgDet&rs=1',
          time:new Date().getTime()
        });
      }
      this.text = "";
      this.password= "";
      let value = JSON.stringify(this.vuexTokens)
      await sessionStorage.setItem("token",value)
      await this.$router.go(0)
      // localStorage.removeItem('token')
    },
    ...mapMutations({
      commitAddToken: "addToken",
    }),   
      getback() {
        if (this.$route.name !== "find-sec") {
          this.$router.go(-1);
        }
      },
      
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    width: 100vw;
    height: 100%;
    position: relative;
    top:0;
    left: 0;
    // padding: 0 10px;
    .head {
      z-index: 200;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      overflow: hidden;
      box-shadow: 2px 2px 5px #f3f1f1;
      background-color: #fff;
      .return {
        float: left;
        margin: 15px;
        width: 10px;
        height: 10px;
        border-left: 3px solid black;
        border-bottom: 3px solid black;
        transform: rotate(45deg);
      }
    }
    .title{
      margin-top: 40px;
      width: 100%;
      height: 140px;
      font-size: 30px;
      // font-weight: bold;
      line-height: 140px;
      // text-align: start;
      padding-left: 20px;
    }
    .inp{
      width: 100%;
      padding: 0 15px;
      .inp-item{
        width: 96%;
        height: 40px;
        border-bottom: 2px solid #f3f1f1;
        span{
          width: 20%;
          height: 100%;
          font-size: 14px;
          line-height: 40px;
          margin-right: 15px;
          
        }
        input{
          border: none;
          outline: none;
          width: 80%;
          height: 38px;
          &::-webkit-input-placeholder{
            font-size: 14px;
          }
        }
        
      }
    }
    .box{
      width: 100%;
      position: absolute;
      top: 290px;
      left:0;
      .login{
        width:  130px;
        height: 50px;
        border-radius: 999px;
        background-color: rgba(255, 0, 0, 0.51);
        color: #fff;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        margin: 0 auto;
      }
      p{
        text-align: center;
        font-size: 13px;
        color: #afafaf;
        margin-top: 30px;
      }

    }
    .footer{
      position: absolute;
      top: 500px;
      left: 0;
      width: 100%;
      .change{
        width: 60%;
        margin: 0 20%;
        height: 50px;
        display: flex;
        .change-item{
          flex: 1;
          img{
            width: 50px;
            height: 50px;
            margin: 0 auto;
          }
        }
      }
    }
    .xie{
      width: 60%;
      height: 20px;
      font-size: 10px;
    }
    
  }
  </style>