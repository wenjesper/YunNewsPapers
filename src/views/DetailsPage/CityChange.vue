<template>
    <div class="DetailsPage">
      <div class="head">
        <div class="return" @click="getback"></div>
        <span>切换州市</span>
      </div>
      <div class="list">
        <div class="list-item" v-for="(m,i) in vuexcitys" :key="i">
            <span class="name">{{m.name}}</span>
            <span class="to"></span>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>

  export default {
    data() {
      return {
      };
    },
    mounted() {
    },
    computed: {
      vuexcitys() {
      return this.$store.state.citys;
    },
    },
    watch: {
    },
    methods: {      
      // 
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
      background-color: #fff;
      box-shadow: 1px 1px 5px #afafaf;
      span{
        height: 40px;
        line-height: 40px;
        margin-left: 33vw;
      }
    //   text-align: center;
    //   line-height: 40px;
      .return {
        float: left;
        margin: 15px;
        width: 13px;
        height: 13px;
        border-left: 3px solid black;
        border-bottom: 3px solid black;
        transform: rotate(45deg);
      }
    }
    .list{
      margin-top: 40px;
      width: 100vw;
      .list-item{
        margin: 0 auto;
        width: 95%;
        height: 50px;
        border-bottom: 1px solid #afafaf;
        .name{
          margin-left: 10px;
          font-size: 15px;
          height: 50px;
          line-height: 50px;
        }
        .to{
        float: right;
        margin-top: 20px;
        margin-right: 20px;
        width: 8px;
        height: 8px;
        border-left: 1px solid #afafaf;
        border-bottom: 1px solid #afafaf;
        transform: rotate(-135deg);
        }
      }
    }
   
  }
  </style>