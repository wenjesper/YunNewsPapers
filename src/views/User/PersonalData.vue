<template>
    <div class="DetailsPage">
      <div class="head">
        <div class="return" @click="getback"></div>
        个人资料
      </div>
      <div class="avatar">
        <span>头像</span>
        <div>
          <img src="">
        </div>
      </div>
      <div class="nickname">
        <span style="float:left;">昵称</span>
        <span style="float:right; color:#afafaf;">always</span>
      </div>
    </div>
  </template>
  
  
  <script>

  export default {
    data() {
      return {
      };
    },
    created() {
    },
    computed: {
      
    },
    watch: {
    
    },
    methods: { 
      getback() {
        if (this.$route.name !== "find-sec") {
          this.$router.go(-1);
        }
      },
      
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .DetailsPage {
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: relative;
    top:0;
    left: 0;
    // padding: 0 10px;
    .head {
      z-index: 700;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      overflow: hidden;
      box-shadow: 2px 2px 5px #f3f1f1;
      background-color: #fff;
      text-align: center;
      line-height: 40px;
      .return {
        float: left;
        margin: 15px 0 15px 15px;
        width: 10px;
        height: 10px;
        border-left: 3px solid black;
        border-bottom: 3px solid black;
        transform: rotate(45deg);
      }
    }
    .avatar{
      margin-top: 40px;
      padding: 0 20px;
      width: 100%;
      border-bottom: 1px solid #f3f1f1;
      display: flex;
      overflow: hidden;
      span{
        font-size: 14px;
        float:left;
        margin: auto 5px;
      }
      div{
        float: right;
        margin: 20px 10px;
        width: 60px;
        height: 60px;
        border: 1px solid #f3f1f1;
        border-radius: 999px;
      }
    }
    .nickname{
      padding: 0 20px;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #f3f1f1;
      span{
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }

    }
  }
  </style>