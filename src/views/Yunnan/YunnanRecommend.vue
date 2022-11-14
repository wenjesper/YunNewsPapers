<template>
  <div class="YunnanRecommend">
    <ViewLun :lun="this.Yunnanslun" />
    <div class="lists">
      <ul>
        <li
          v-for="(c, i) in this.YunnansList"
          :key="i"
          @click="gotoDetailsPage(c.articleId)"
        >
          <div class="titlebox">
            <p>{{ c.title }}</p>
            <span>{{ time[i] }}</span>
          </div>
          <div class="imgbox1">
            <img :src="c.image" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ViewLun from "@/components/YunNan/YunLun.vue";
export default {
  data() {
    return {
      num: 0,
      show: false,
      Yunnanslun: [],
      YunnansList: [],
    };
  },
  components: {
    ViewLun,
  },
  created() {
    this.getYunnanlun();
    this.getYunnanList();
  },
  mounted() {},
  methods: {
    set(num) {
      this.num = num;
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
            let m = d.replace(/[a-zA-Z]/g, "");
            // console.log(m);
            return m;
          });
          this.time = times;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .YunnanRecommend{
    .lists {
    width: 100vw;
    ul {
      width: 100vw;
      li {
        display: flex;
        margin: 0 5vw;
        width: 90vw;
        border-bottom: 1px solid #afafaf;
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
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          span {
            position: absolute;
            bottom: 0;
            color: #afafaf;
            font-size: 12px;
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
</style>