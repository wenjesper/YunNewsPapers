<template>
    <div class="PhotoShow">
      <div class="head">
        <div class="return" @click="getback"></div>
        阅读模式
      </div>
      <div class="list">
        <ul>
            <li style="font-size:12px;color:#afafaf;">新闻列表图片显示</li>
            <li @click="setPhotoshow(true)">有图模式 <span v-show="this.vuexphotoshow==true"></span></li>
            <li @click="setPhotoshow(false)">无图模式 <span v-show="this.vuexphotoshow==false"></span></li>
        </ul>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
          
      };
    },
    created() {
      
    },
    computed: {
      vuexphotoshow(){
        return this.$store.state.photoshow;
      }
    },
    watch: {
      
    },
    methods: {
      ...mapMutations(['setPhotoshow']),
      getback() {
        if (this.$route.name !== "find-sec") {
          this.$router.go(-1);
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .PhotoShow {
    z-index: 100;
    width: 100vw;
    height: 100vh;
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
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      .return {
        float: left;
        margin: 15px;
        margin-right: 0;
        width: 10px;
        height: 10px;
        border-left: 3px solid black;
        border-bottom: 3px solid black;
        transform: rotate(45deg);
      }
    }
    .list{
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        padding:0 10px;
        ul{
            width: 100%;
            li{
                height: 50px;
                border-bottom: 1px solid #f3f1f1;
                font-size: 14px;
                line-height: 50px;
                overflow: hidden;
                span{
                    width: 10px;
                    height: 10px;
                    background-color: red;
                    border-radius: 999px;
                    float: right;
                    margin: 20px 15px;
                }
            }
        }

    }
  }
  </style>