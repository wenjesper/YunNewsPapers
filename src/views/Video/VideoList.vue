<template>
  <div class="list">
    <div
      class="list-item"
      v-for="(m, i) in this.videos"
      :key="i"
      @click="gotoDetailsPage(m.articleId),
      addHistory(m.articleId,m.title,m.viewType,m.type)"
    >
      <p>{{ m.title }}</p>
      <div class="videobox" @click="gotoDetailsPage(m.articleId)">
        <video
          :src="m.medias[0].resources[2].url"
          :poster="m.imageUrl"
          controls="controls"
        ></video>
      </div>
      <p>{{ m.source}}|{{ time[i]}}</p>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    this.getVideo();
  },
  computed:{
    vuexHistorys() {
      return this.$store.state.Historys;
    },
  },
  // mounted() {},
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
        historys.push(value);
        let value2 = JSON.stringify(historys)
        await sessionStorage.setItem("historys",value2)
      }
    },
    // ...mapActions(["getNewHistory"]),
    ...mapMutations({
      commitAddHistory: "addHistory",
    }),
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
    getVideo() {
      this.$axios
        .get(
          "http://appapi.yndaily.com/api/v2/articles/ex?categoryId=video&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&pageNum=1&count=20&clientVersion=4.0.3&deviceOs=15.7&pageNumber=1&size=20&pjCode=ynrb&platform=iOS&deviceModel=iPhone%20XS%20Max&pageToken=1&pageNo=1&headPageSize=8&pageSize=20&platform=iOS&deviceOs=1.0&clientVersionCode=403"
        )
        .then((data) => {
          // console.log(data);
          this.videos = data.item.list;
          let time = data.item.list.map((item) => item.date);
          let times = time.map((t) => {
            let d = t.slice("", 19);
            let m = d.replace('T', " ");
            // console.log(m);
            return m;
          });
          this.time = times;
        });
    },
    btn() {
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 100vw;
  margin-top: 40px;
  .list-item {
    width: 100%;
    padding-top: 10px;
    border-bottom: 1px solid #f3f1f1;
    p {
      margin: 10px 15px;
      color: #afafaf;
      font-size: 12px;
    }
    .videobox {
      width: 95vw;
      height: 200px;
      margin: 0 auto;
      video {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
  }
}
</style>