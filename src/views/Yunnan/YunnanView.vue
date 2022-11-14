<template>
  <div class="Yunnan">
    <div class="head">
      <div class="change">
        <span :class="{ click: this.num == 0 }" @click="set(0)">推荐</span>
        <span :class="{ click: this.num == 1 }" @click="set(1)">关注</span>
      </div>
      <span class="join">+</span>
    </div>
    <div class="all">
    <div class="recommend" v-if="this.num==0">
      <ViewLun :lun="this.Yunnanslun" />
      <div class="lists">
        <ul>
          <li
            v-for="(c, i) in this.YunnansList"
            :key="i"
            @click="gotoDetailsPage(c.articleId),
            addHistory(c.articleId,c.title,c.viewType,c.type)"
          >
          <div class="nav">
            <div class="imgbox">
              <img :src="c.orgInfo.logo" alt="">
            </div>
            <span>{{c.orgInfo.name}}</span>
            <div class="btn">+订阅</div>
          </div>
          <div class="content">
            <div class="titlebox">
              <p>{{ c.title }}</p>
              <span>{{ time[i] }}</span>
            </div>
            <div class="imgbox1" v-if=" vuexphotoshow ==true">
              <img :src="c.image" />
            </div>
          </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="Concern" v-if="this.num==1">
      
      <div class="lists">
        <ul>
          <li
            v-for="(c, i) in this.YunnansConcern"
            :key="i"
            @click="gotoDetailsPage()" 
          >
          <div class="imgbox2">
            <img :src="c.logo" alt="">
          </div>
          <div class="txtbox">
            <span>{{c.name}}</span>
            <div class="btn">+订阅</div>
          </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>
  
  <script>
// import { getHomeTabAPI } from "@/apis/home.js"
import {mapMutations} from "vuex"
import ViewLun from "@/components/YunNan/YunLun.vue";
export default {
  data() {
    return {
      num: 0,
      number:100,
      show: false,
      Yunnanslun: [],
      YunnansList: [],
      YunnansConcern: [],
    };
  },
  components: {
    ViewLun,
  },
  created() {
    this.getYunnanlun();
    this.getYunnanList();
    this.getYunnanConcern();
  },
  computed:{
    vuexHistorys() {
      return this.$store.state.Historys;
    },
    vuexphotoshow(){
        return this.$store.state.photoshow;
      }
  },
  mounted() {},
  methods: {
    async addHistory(id,text,viewType,type) {
      let historys = sessionStorage.historys
      if (!historys) {
        this.commitAddHistory({
          id:id,
          text:text,
          viewType:viewType,
          type:type,
          time:new Date().getTime()
        });
        let value = JSON.stringify(this.vuexHistorys)
        await sessionStorage.setItem("historys",value)
      }
      else if(historys) {
        this.commitAddHistory({
          id:id,
          text:text,
          viewType:viewType,
          type:type,
          time:(new Date().getMonth() + 1)+'月'+ new Date().getDate()+'日'
        });
        historys = JSON.parse(historys)
        let value = JSON.stringify(this.vuexHistorys)
        // let value2 = [value,...historys]
        historys.push(value);
        let value2 = JSON.stringify(historys)
        await sessionStorage.setItem("historys",value2)
      }
    },
    // ...mapActions(["getNewHistory"]),
    ...mapMutations({
      commitAddHistory: "addHistory",
    }),
    set(num) {
      this.num = num;
    },
    getYunnanConcern() {
      this.$axios
        .get(
          `http://ynhapi.yndaily.com/api/v2/organize/list?pjCode=ynrb&clientVersion=4.0.3&pageSize=${this.number}&userId=&platform=iOS&deviceModel=iPhone%20XS%20Max&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&deviceOs=15.7&pageNum=1&platform=iOS&deviceOs=1.0&clientVersionCode=403`
        )
        .then((data) => {
          // console.log(data);
          this.YunnansConcern= data.data.records;
        });
    },
    getYunnanlun() {
      this.$axios
        .get(
          "http://ynhapi.yndaily.com/api/v2/sub/head?udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&deviceOs=15.7&count=20&clientVersion=4.0.3&pageNum=1&pageNumber=1&userId=&size=20&pjCode=ynrb&platform=iOS&deviceModel=iPhone%20XS%20Max&pageToken=1&pageNo=1&pageSize=5&platform=iOS&deviceOs=1.0&clientVersionCode=403"
        )
        .then((data) => {
          console.log(data);
          this.Yunnanslun = data.data.records;
        });
    },
    getYunnanList() {
      this.$axios
        .get(
          "http://ynhapi.yndaily.com/api/v2/articles/new/recommend/list?pjCode=ynrb&clientVersion=4.0.3&pageSize=20&userId=&platform=iOS&deviceModel=iPhone%20XS%20Max&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&deviceOs=15.7&pageNum=1&platform=iOS&deviceOs=1.0&clientVersionCode=403"
        )
        .then((data) => {
          console.log(data);
          this.YunnansList = data.data.records;
          let time = data.data.records.map((item) => item.date);
          let times = time.map((t) => {
            let d = t.slice("", 19);
            let m = d.replace(/[a-zA-Z]/g, " ");
            // console.log(m);
            return m;
          });
          this.time = times;
        });
    },
    gotoDetailsPage(id) {
      if (this.$route.name !== "details-page2") {
        this.$router.push({
          path: "/details-page2",
          query: {
            id,
          },
        });
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.Yunnan {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .head {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    // line-height: 55px;
    // font-size: 20px;
    .change {
      text-align: center;
      width: 50%;
      height: 30px;
      margin: 5px 60px 5px 100px;
      border-radius: 999px;
      border: 1px solid rgb(202, 15, 15);
      overflow: hidden;
      display: flex;
      .click {
        flex: 1;
        color: #fff;
        background-color: rgb(202, 15, 15);
        border-radius: 999px;
      }
      span {
        border: none;
        line-height: 30px;
        flex: 1;
        color: rgb(202, 15, 15);
      }
    }
    .join {
      width: 20px;
      height: 20px;
      border-radius: 999px;
      border: 2px solid rgb(202, 15, 15);
      color: rgb(202, 15, 15);
      text-align: center;
      font-weight: bold;
      line-height: 17px;
      margin: 10px;
    }
  }
  .all{
    width: 100vw;
    display: flex;
    .recommend{
    width: 100vw;
    .lists {
    width: 100%;
    ul {
      width: 100%;
      li {
        margin: 0 5vw;
        width: 90vw;
        border-bottom: 1px solid #f3f1f1;
        .nav{
          width: 100%;
          height: 40px;
          overflow: hidden;
          .imgbox{
            float: left;
            margin: 10px 10px 0 10px;
            width: 25px;
            height: 20px;
            border-radius: 999px;
            overflow: hidden;
            border: 1px solid #f3f1f1;
            img{
              width: 100%;
              height: 100%;
            }
          }
          span{
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            float: left;
          }
          .btn{
            float: right;
            font-size: 12px;
            text-align: center;
            width: 60px;
            height: 20px;
            color: rgb(202, 15, 15);
            margin: 10px;
            border-radius: 999px;
            border: 1px solid rgb(202, 15, 15);
          }
        }
        .content{
          width: 100%;
          display: flex;
          .titlebox {
          margin: 10px 0;
          height: 80px;
          width: 70%;
          position: relative;
          p {
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          span {
            position: absolute;
            bottom: 0;
            color: #afafaf;
            font-size: 14px;
          }
        }
        .imgbox1 {
          margin: 10px 0;
          height: 80px;
          width: 30%;
          img {
            height: 100%;
            width: 100%;
          }
        }
        }
      }
    }
  }
  }
  .Concern{
    margin-top: 40px;
    width: 100vw;
    .lists {
    width: 100%;
    ul {
      width: 100%;
      .show{
        display: none;
      }
      li {
        display: flex;
        margin: 0 5vw;
        width: 90vw;
        height: 80px;
        border-bottom: 1px solid #f3f1f1;
        display: flex;
        .imgbox2{
          width: 40px;
          height: 80px;
          img{
            width: 40px;
            height: 40px;
            border-radius: 999px;
            margin: 20px 0;
          }
        }
        .txtbox{
          flex: 1;
          span{
            margin-left: 10px;
            height: 80px;
            line-height: 60px;
            font-size: 14px;
            float: left;
          }
          .btn{
            margin: 30px 0 30px 0;
            float: right;
            font-size: 11px;
            color: rgb(202, 15, 15);
            border: 1px solid rgb(202, 15, 15);
            border-radius: 999px;
            text-align: center;
            width: 60px;
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
  }
  }
  
}
</style>