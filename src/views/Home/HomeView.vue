<template>
  <div class="home">
    <div class="nav">
      <div class="head">
        <div class="logo">雲報</div>
        <div class="inb-box" @click="gotoSearchView">
          <div class="inp">
            <div class="inp-l"><img src="@/assets/icon/m1.png" /></div>
            <input type="text" placeholder="请输入搜索关键字" />
            <div class="inp-r"><img src="@/assets/icon/search.png" /></div>
          </div>
        </div>
      </div>
      <div class="tab">
        <ul>
          <li class="text-red-500">飞卡阅读</li>
          <li
            class="tab-item"
            v-for="(m, i) in vuextname"
            :key="i"
            :class="{ click: id == m.categoryId }"
            @click="setid(m.categoryId)"
          >
            {{ m.name }}
          </li>
        </ul>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="list">
        <div class="city" v-if="this.id<20" @click="gotoCityChange">切换州市</div>
        <ViewTop :top="all.top" />
        <ViewLun :lun="lun" />
        <div class="lists">
          <ul>
            <li
              v-for="(c, i) in this.all.list"
              :key="i"
              @click="
              gotoDetailsPage(c.articleId,c.viewType),
              addHistory(c.articleId,c.title,c.viewType,c.type)"
            >
              <div class="titlebox">
                <p>{{ c.title }}</p>
                <div class="imgbox1" v-if="c.viewType == 'normal' && c.imageUrl && vuexphotoshow ==true">
                  <img :src="c.imageUrl"/>
                </div>
              </div>
              <div class="imgbox2" v-if="c.viewType == 'bigimage'">
                <img :src="c.imageUrl" alt="" />
              </div>
              <div class="imgbox3" v-if="c.viewType == 'three'&& vuexphotoshow ==true">
                <img  v-for="(t,i) in c.images" :key="i" :src="t"/>
              </div>
              <div class="imgbox4" v-if="c.viewType == 'banner' && c.type =='common'">
                <img :src="c.imageUrl" alt="" />
              </div>
              <div class="videobox" v-if="c.type == 'video'&&c.viewType != 'normal'"> 
                <video
                  v-for="(m,i) in showVideo"
                  :key="i"
                  :src="m.medias[0].resources[2].url"
                  :poster="m.imageUrl"
                  controls="controls"
                ></video>
              </div>
              <div class="foot">{{ c.source }} | {{time[i]}}</div>
            </li>
          </ul>
        </div>
      </div>
    </van-pull-refresh>
    <!-- <van-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" :speed="40" :delay="0.2" wrapable/> -->
  </div>
</template>

<script>
import ViewTop from "@/components/Home/ViewTop.vue";
import ViewLun from "@/components/Home/ViewLun.vue";
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      time:[],
      all: [],
      lun: [],
      id: 15451,
      num: 20,
      show: false,
      tabs: [],
      isLoading: false, //下拉刷新
      isUpLoading: false, //上拉加载
      upFinished: false, //上拉加载完毕
      finished: false,
      offset: 100, //滚动条与底部距离小于 offset 时触发load事件 //刷新
    };
  },
  computed: {
    vuexphotoshow(){
        return this.$store.state.photoshow;
      },
    vuexHistorys() {
      return this.$store.state.Historys;
    },
    showVideo(){
      return this.all.list.filter((t) => {
        if (t.type == 'video') {
          return t.type;
        }
      });
    },
    vuextname() {
      return this.$store.state.tname;
    },
    // 因为多个分类id都影响获取漫画url的值,所以这些id可以作为url的依赖,url作为计算属性
    typeURL() {
      return `http://appapi.yndaily.com/api/v2/articles/${this.id}?categoryId=${this.id}&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&deviceOs=15.7&count=20&clientVersion=4.0.3&pageNum=1&pageNumber=1&pjCode=ynrb&size=${this.num}&platform=iOS&deviceModel=iPhone%20XS%20Max&pageToken=1&pageNo=1&pageSize=20&platform=iOS&deviceOs=1.0&clientVersionCode=403`;
    },
  },
  watch: {
    typeURL(newURL) {
      this.getComment(newURL);
    },
  },
  mounted() {
    this.getComment(this.typeURL);
  },
  methods: {
    async addHistory(id,text,viewType,type) {
      let historys = sessionStorage.historys
      if (!historys) {
        this.commitAddHistory({
          id:id,
          text:text,
          viewType:viewType,
          type:type,
          time:(new Date().getMonth() + 1)+'月'+ new Date().getDate()+'日'
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
    gotoCityChange(){
        this.$router.push('/city-change')
    },
    gotoSearchView(){
        this.$router.push('/search')
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功"); //弹出
        this.isLoading = false;
      }, 3000);
    },
    getComment(url) {
      this.$axios
      .get(url)
      .then((data) => {
        // console.log(data.item);
        this.all = data.item;
        this.lun = data.item.head;
        // console.log(this.all.list[10].medias[0].image);
        // console.log(this.showVideo);
        let time = data.item.list.map(item =>(item.date))
        let times = time.map(t =>{
          let d =t.slice("",19)
          let m =d.replace('T', " ");
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
    setid(id) {
      this.id = id;
    },
  },
  components: {
    ViewTop,
    ViewLun,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  // max-width: 100%;
  // max-height: 100%;
  // overflow: auto;

  .scroll-router-enter,
  .scroll-router-leave-to {
    transform: translateX(100%);
  }

  .scroll-router-enter-active,
  .scroll-router-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router-enter-to,
  .scroll-router-leave {
    transform: translateX(0);
  }
  .nav {
    width: 100vw;
    height: 80px;
    .head {
      width: 100%;
      height: 40px;
      background-color: rgb(202, 15, 15);
      display: flex;
      .logo {
        flex: 0 0 20%;
        font-size: 27px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        line-height: 40px;
      }
      .inb-box {
        flex: 0 0 80%;
        .inp {
          display: flex;
          border-radius: 999px;
          overflow: hidden;
          margin: 7px 0;
          height: 26px;
          width: 95%;
          background-color: rgba(255, 255, 255, 0.2);
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
              color: rgba(255, 255, 255, 0.6);
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
    }
    .tab {
      width: 100vw;
      height: 40px;
      overflow: auto;
      ul {
        width: 1160px;
        height: 40px;
        border: 1px solid #afafaf;
        display: flex;
        .click {
          color: red;
          &:after {
            content: "";
            width: 15%;
            height: 1px;
            display: block;
            margin: 0 auto;
            border-bottom: 2px solid red;
            padding: 1px;
          }
        }
        li {
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          flex: 1;
          height: 30px;
          margin-bottom: 10px;
          width: 80px;
        }
      }
    }
  }
  .list {
    width: 100vw;
    height: 90vh;
    overflow: auto;
    .city{
      position: absolute;
      z-index: 10;
      top: 100px;
      right: 20px;
      background-color: #fff;
      width: 80px;
      height: 20px;
      border-radius: 999px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
    .lists {
      width: 100vw;
      ul {
        width: 100vw;
        li {
          margin: 0 5vw;
          width: 90vw;
          border-bottom: 1px solid #f3f1f1;
          .foot{
            margin-bottom: 10px;
            color:#afafaf;
            font-size: 12px;
          }
          .titlebox {
            position: relative;
            display: flex;
            margin: 10px 0;
            // height: 80px;
            p {
              flex: 1;
            }
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
          .imgbox2 {
            width: 100%;
            height: 100px;
            display: block;
            img {
              border-radius: 6px;
              width: 100%;
              height: 100%;
            }
          }
          .imgbox3 {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            img {
              border-radius: 6px;
              width: 30%;
            }
          }
          .imgbox4 {
            width: 100%;
            height: 200px;
            display: block;
            img {
              border-radius: 6px;
              width: 100%;
              height: 100%;
            }
          }
          .videobox {
            width: 100vw;
            height: 200px;
            video {
              width: 90%;
              // margin: 0 auto;
              height: 100%;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
