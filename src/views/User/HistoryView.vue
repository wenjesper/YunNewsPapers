<template>
    <div class="history">
      <div class="head">
        <div class="return" @click="getback"></div>
        历史记录
        <div class="share">...</div>
      </div>
      <div class="list">
        <ul>
            <li v-for="(m,i) in this.list2" :Key="i" @click="gotoDetailsPage(m.id,m.viewType)">
            {{m.text}}
            </li>
        </ul>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
          list:[],
          list2:[]
      };
    },
    created() {
      this.getHistory()
    },
    computed: {
      
    },
    watch: {
      
    },
    methods: {
      getHistory(){
        let history = sessionStorage.getItem('historys')
        console.log(history);
        this.list = JSON.parse(history)
        // console.log(history);
        let e = this.list.filter(t =>{
          return t[0]
        })
        let e2 = e.map(t =>{
          return JSON.parse(t)
        })
        let e3 =e2.map(t=>{
          return t[0]
        })
        this.list2 =e3
        
        // console.log(e5);
      },
      gotoDetailsPage(id,viewType) {
      if(viewType == "bigimage"){
        this.$router.push({
          path: "/SpecialView",
          query: {
            id,
          },
        });
      }
      else {
        this.$router.push({
          path: "/details-page",
          query: {
            id,
          },
        });
      }
    },
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
  .history {
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
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      .return {
        float: left;
        margin: 15px 0 15px 15px;
        width: 10px;
        height: 10px;
        border-left: 3px solid black;
        border-bottom: 3px solid black;
        transform: rotate(45deg);
      }
      .share {
        float: right;
        width: 40px;
        height: 40px;
        line-height: 25px;
        text-align: center;
        font-size: 30px;
      }
    }
    .list{
      width: 100vw;
      position: absolute;
      top: 40px;
      left:0;
      ul{
        width: 100%;
        li{
          width: 100%;
          // height: 40px;
          padding: 0 10px;
          margin: 10px 0;
        }
      }
    }
  }
  </style>
