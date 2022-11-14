<template>
  <div class="DetailsPage">
    <div class="head">
      <div class="inb-box">
        <div class="inp">
          <div class="inp-l"><img src="@/assets/icon/m2.png" /></div>
          <input
            type="text"
            placeholder="请输入搜索关键字"
            v-model.trim="text"
          />
          <div class="inp-r" @click="searchHistory">
            <img src="@/assets/icon/search.png" />
          </div>
        </div>
      </div>
      <div class="return" @click="getback">取消</div>
    </div>
    <div class="title">
      历史记录
      <div class="delAll" @click="delAll">
        <img src="@/assets/icon/laji.png" />
      </div>
    </div>
    <ul class="history-box">
      <li v-for="(m, i) in historySearchList" :key="i">
        <span>{{ m }}</span>
        <div class="del">X</div>
      </li>
    </ul>
    <div class="list" v-if="this.all != []">
      <ul>
        <li v-for="(c, i) in this.all" :key="i">
          <div class="titlebox">
            <p>{{ c.title }}</p>
            <!-- <div>{{time[i]}}</div> -->
            <div
              class="imgbox1"
              v-if="
                c.viewType == 'normal' && c.imageUrl
              "
            >
              <img :src="c.imageUrl" />
            </div>
          </div>
          <div class="foot" v-html="time[i]" style="font-size:13px;color:#afafaf;"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  
  <script>
export default {
  data() {
    return {
      text: "",
      historySearchList: [],
      all: [],
      time:[]
      //   show:true
    };
  },
  created() {
    this.gethistory();
  },
  mounted() {
    this.getComment(this.typeURL);
  },
  computed: {
    typeURL() {
      return `http://appapi.yndaily.com/api/v2/articles/searchArticle?pageSize=20&pageToken=1&pos=0&deviceOs=15.7&userid=&clientVersion=4.0.3&keyWord=${this.text}&pjCode=ynrb&deviceModel=iPhone%20XS%20Max&platform=iOS&cnt=20&no_ec=1&revert=0&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&platform=iOS&deviceOs=1.0&clientVersionCode=403`;
    },
  },
  watch: {
    typeURL(newURL) {
      this.getComment(newURL);
    },
  },
  methods: {
    getComment(url) {
      this.$axios
        .get(url)
        .then((data) => {
          console.log(data);
          this.all = data.item;
          // // console.log(this.all.list[10].medias[0].image);
          // // console.log(this.showVideo);
          let time = data.item.map(item =>(item.date))
          let times = time.map(t =>{
            let d =t.slice("",19)
            let m =d.replace('T', "&nbsp&nbsp");
            // console.log(m);
            return m
          })
          this.time = times
        })
        .catch((err) => {
          // this.$message.error(err)
          console.log(err);
        });
    },
    delAll() {
      this.historySearchList = [];
      localStorage.removeItem("historySearchList");
    },
    gethistory() {
      let search2 = localStorage.historySearchList;
      if (search2) {
        this.historySearchList = JSON.parse(search2);
      }
    },
    searchHistory() {
      if (this.text) {
        let search1 = localStorage.historySearchList;
        if (search1) {
          search1 = JSON.parse(search1);
          this.historySearchList = search1;
        } else {
          search1 = [];
        }
        search1.push(this.text);
        localStorage.historySearchList = JSON.stringify(search1);
        this.historySearchList = search1;
      }
    },
    getback() {
        this.all = []
        this.$router.go(-1);
      
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.DetailsPage {
  z-index: 100;
  width: 100vw;
  //   height: 100vh;
  position: relative;
  top: 0;
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
    display: flex;
    .inb-box {
      flex: 0 0 90%;
      .inp {
        display: flex;
        border-radius: 999px;
        overflow: hidden;
        margin: 7px 10px;
        height: 26px;
        width: 95%;
        background-color: #f3f1f2;
        .inp-l {
          background-color: rgba(255, 255, 255, 0.2);
          float: left;
          flex: 0 0 15%;
          img {
            width: 60%;
            height: 90%;
            margin: 0 25%;
          }
        }
        input {
          background-color: rgba(255, 255, 255, 0.2);
          flex: 0 0 70%;
          outline: none;
          border: none;
          &::-webkit-input-placeholder {
            color: #afafaf;
            font-size: 13px;
          }
        }
        .inp-r {
          background-color: rgba(255, 255, 255, 0.6);
          float: right;
          flex: 0 0 15%;
          img {
            width: 50%;
            height: 90%;
            margin: 0 25%;
          }
        }
      }
    }
    .return {
      float: right;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .title {
    margin-top: 40px;
    width: 100%;
    height: 60px;
    font-size: 30px;
    line-height: 60px;
    text-align: start;
    padding: 0 15px;
    overflow: hidden;
    .delAll {
      width: 60px;
      height: 60px;
      float: right;
      img {
        width: 30px;
        height: 30px;
        margin: 15px auto;
      }
    }
  }
  .history-box {
    width: 100%;
    li {
      width: 100%;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      padding-left: 20px;
      .del {
        float: right;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
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