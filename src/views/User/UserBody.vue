<template>
    <div class="body">
      <div class="head">
      <div class="person" @click="gotoPersonalData">
        <img :src="Token[0].logo" alt="" v-if="this.Token"/>
        <!-- <img src="@/assets/img/" alt="" v-if="this.Token == ''"/> -->
      </div>
      <span @click="gotoPersonalData" v-if="this.Token == ''">点击登录</span>
      <span @click="gotoPersonalData" v-if="this.Token">{{Token[0].user}}</span>
      <button @click="quit" v-if="this.Token" class="tui">退出登录</button>
      <div class="edit" @click="gotoPersonalData">
        <img src="@/assets/icon/edit2.png" alt="" />
      </div>
    </div>
    <div class="function">
      <div class="function-item" @click="gotoBookMark">
        <img src="@/assets/img/cang.png" />
        <p>收藏</p>
      </div>
      <div class="function-item" @click="gotoHistoryView">
        <img src="@/assets/img/history.png" />
        <p>历史</p>
      </div>
      <div class="function-item" @click="gotoMyComments">
        <img src="@/assets/img/pin.png" />
        <p>评论</p>
      </div>
    </div>
    <div class="list">
      <div class="signbox">
        <div class="n">
          <span>您还未登录</span>
          <span>签到领积分</span>
          <span>立即签到</span>
        </div>
        <ul>
          <li v-for="(m, i) in this.signList" :key="i">
            <div>{{ m }}</div>
            <span>{{ i }}连签</span>
          </li>
        </ul>
      </div>
      <ul class="list2">
        <li>
          我的爆料
          <span></span>
        </li>
        <li>
          我的订阅
          <span></span>
        </li>
        <li>
          我的消息
          <span></span>
        </li>
        <li>
          夜间模式
          <div class="switcher" @click="setFilter(true)" v-show="filter==false">
          <img src="@/assets/icon/moon.png" alt="">
          </div>
          <div class="switcher" @click="setFilter(false)" v-show="filter==true">
          <img src="@/assets/icon/sun.png" alt="">
          </div>
        </li>
        <li @click="gotoPhotoShow">
          阅读模式
          <span></span>
          <div style="float:right;color:red;" v-if="this.vuexphotoshow==true">有图模式</div>
          <div style="float:right;color:red;" v-if="this.vuexphotoshow==false">无图模式</div>
        </li>
        <li>
          设置
          <span></span>
        </li>
        <li>
          意见模式
          <span></span>
        </li>
      </ul>
    </div>
    </div>
  </template>
  
  
  <script>
  import { mapState, mapMutations } from "vuex";
  // import SwitcherBtn from "@/components/SwitcherBtn.vue"
export default {
  data() {
    return {
      signList: [],
      checked: true,
      Token:[]
    };
  },
  // components:{
  //   SwitcherBtn
  // },
  computed: {
    vuexphotoshow(){
        return this.$store.state.photoshow;
      },
    vuexTokens() {
      return this.$store.state.Tokens;
    },
    ... mapState(["filter"]),
    showVideo() {
      return this.all.list.filter((t) => {
        if (t.type == "video") {
          return t.type;
        }
      });
    },
    vuextname() {
      return this.$store.state.tname;
    },
    // 因为多个分类id都影响获取漫画url的值,所以这些id可以作为url的依赖,url作为计算属性
    // typeURL() {
    //   return `http://appapi.yndaily.com/api/v2/articles/${this.id}?categoryId=${this.id}&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&deviceOs=15.7&count=20&clientVersion=4.0.3&pageNum=1&pageNumber=1&pjCode=ynrb&size=${this.num}&platform=iOS&deviceModel=iPhone%20XS%20Max&pageToken=1&pageNo=1&pageSize=20&platform=iOS&deviceOs=1.0&clientVersionCode=403`;
    // },
  },
  watch: {
    typeURL(newURL) {
      this.getComment(newURL);
    },
  },
  created() {
    this.getComment();
    this.getToken()
  },
  methods: {
    async quit(){
      sessionStorage.removeItem('token')
      await this.$router.go(0)
    },
    ...mapMutations(["setFilter"]),
    getToken(){
        let Token = sessionStorage.getItem('token')
        this.Token = JSON.parse(Token)
        // console.log(Token);
        console.log(this.Token[0].logo);

      },
    gotoDetailsPage(id) {
      if (this.$route.name !== "details-page") {
        this.$router.push({
          path: "/details-page",
          query: {
            id,
          },
        });
      }
    },
    gotoPersonalData() {
      this.$router.push("personal-data");
    },
    gotoBookMark() {
      this.$router.push("book-mark");
    },
    gotoHistoryView() {
      this.$router.push("history-view");
    },
    gotoMyComments() {
      this.$router.push("my-comments");
    },
    gotoPhotoShow() {
      this.$router.push("photo-show");
    },
    
    // gotoCityChange() {
    //   this.$router.push("/personal-data");
    // },
    getComment() {
      this.$axios
        .get(
          `http://appapi.yndaily.com/api/score/mySign?pjCode=ynrb&clientVersion=4.0.3&platform=iOS&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&userOpenId=&deviceOs=15.7&deviceModel=iPhone%20XS%20Max&platform=iOS&deviceOs=1.0&clientVersionCode=403`
        )
        .then((data) => {
          // console.log(data);
          this.signList = data.item.signList;
        });
    },
    setid(id) {
      this.id = id;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
  .body{
    width: 100%;
    .head {
    width: 100%;
    height: 120px;
    background-color: rgb(255, 51, 0);
    position: relative;
    .person {
      position: absolute;
      top: 30px;
      left: 20px;
      width: 60px;
      height: 60px;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid #fff;
    }
    .tui{
      position: absolute;
      top: 70px;
      left: 100px;
      color: #fff;
      font-size: 14px;
    }
    span {
      position: absolute;
      top: 40px;
      left: 100px;
      color: #fff;
      font-size: 14px;
    }
    .edit {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 20px;
      top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .function {
    width: 95%;
    height: 80px;
    position: absolute;
    top: 100px;
    left: 2.5%;
    background-color: rgba(255, 255, 255, 0.956);
    display: flex;
    border: 1px solid #f3f1f1;
    .function-item {
      flex: 1;
      img {
        margin: 20px 50px 0 50px;
        width: 30px;
        height: 30px;
      }
      p {
        width: 100%;
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .list {
    // width: 95%;
    // height: 80px;
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
    .signbox {
      width: 95%;
      height: 120px;
      margin: 0 2.5%;
      border: 1px solid rgb(255, 51, 0);
      .n {
        width: 100%;
        height: 40px;
      }
      ul {
        display: flex;
        li {
          flex: 1;
          div {
            border-radius: 999px;
            background-color: #f3f1f1;
            text-align: center;
            line-height: 30px;
            margin: 0 auto;
            width: 30px;
            height: 30px;
          }
          span {
            width: 100%;
            height: 50%;
            // padding: 0 2px;
            margin-left: 8px;
            font-size: 14px;
          }
        }
      }
    }
    .list2 {
      width: 100%;
      padding: 0 10px;
      li {
        height: 50px;
        line-height: 50px;
        width: 100%;
        font-size: 15px;
        border-bottom: 1px solid #f3f1f1;
        img {
          float: left;
          width: 20px;
          height: 20px;
        }
        span {
          float: right;
          margin: 20px;
          width: 10px;
          height: 10px;
          border-right: 2px solid #dfdcdc;
          border-bottom: 2px solid #dfdcdc;
          transform: rotate(-45deg);
        }
        .switcher {
          float: right;
          width: 40px;
          height: 100%;
          img{
            width: 30px;
            height: 30px;
            margin: 10px;
          }
        }
      }
    }
  }
  }
  </style>