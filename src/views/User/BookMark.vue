<template>
  <div class="history">
    <div class="head">
      <div class="return" @click="getback"></div>
      我的收藏
      <div class="share">...</div>
    </div>
    <div class="list">
      <ul>
          <li v-for="(m,i) in this.list2" :Key="i" @click="gotoDetailsPage(m.id,m.viewType)">
            <div class="titlebox">
            <p>{{ m.title }}</p>
            <!-- <div>{{time[i]}}</div> -->
            <div
              class="imgbox1"
              v-if="m.images"
            >
              <img :src="m.images" />
            </div>
          </div>
          <div class="foot">{{m.time}}</div>
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
      let BookMark = localStorage.getItem('BookMarkList')
      console.log(BookMark);
      this.list = JSON.parse(BookMark)
      let e = this.list.filter(t =>{
          return t[0]
        })
      let i = this.list.map(t =>{
          return t[0]
        })
        let e2 = e.map(t =>{
          return JSON.parse(t)
        })
        let e3 =e2.map(t=>{
          return t[0]
        })
      this.list2 =[i,...e3]
      console.log(this.list2);
      console.log(123);
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
    else if(viewType == "normal_2"){
      this.$router.push({
        path: "/details-page2",
        query: {
          id,
        },
      });
    }
    else{
      this.$router.push({
        path: "/details-page",
        query: {
          id,
        },
    })
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
  .list {
    margin-top: 40px;
    width: 100vw;
    ul {
      width: 100vw;
      li {
        margin: 0 5vw;
        width: 90vw;
        border-bottom: 1px solid #f3f1f1;

        .titlebox {
          position: relative;
          display: flex;
          margin: 10px 0;
          // height: 80px;
          p {
            flex: 1;
          }
        //   .foot{
            
        //   }
          // span {
          // }

          .imgbox1 {
            display: block;
            height: 80px;
            flex: 0 0 30%;
            img {
              border-radius: 6px;
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
