<!-- <template>
  <div class="list">
      <transition-group name="scroll">
        <div class="list-item" v-for="(m, i) in this.newspapers" :key="i" v-show="num-1 == i">
        <img :src="m.page_pic" alt="" />
      </div>
      </transition-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      num: "1",
      day: "",
      cli: false,
      show: false,
      newspapers: [],
    };
  },
  props:["newspapers"],
  created() {
    // this.getnewspaper();
  },
  mounted() {},
  methods: {
    gotoDetailsPage(id) {
      if (this.$route.name !== "details-page4") {
        this.$router.push({
          path: "details-page4",
          query: {
            id,
          },
        });
      }
    },
    // getnewspaper() {
    //   this.$axios
    //     .get(
    //       `http://appapi.yndaily.com/api/v2/paper/list?deviceOs=15.7&count=20&clientVersion=4.0.3&paperName=ynrb&maxId=0&pjCode=ynrb&sinceId=0&platform=iOS&date=${this.day}&deviceModel=iPhone%20XS%20Max&max_id=0&pagesSize=391.919995x600.787537&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&platform=iOS&deviceOs=1.0&clientVersionCode=403`
    //     )
    //     .then((data) => {
    //       console.log(data);
    //       this.newspapers = data.item;
    //       console.log(this.newspapers);
    //       // this.data = data.item[0].period_num;
    //     });
    // },    
  },
};
</script>

<style lang="scss" scoped>
    .list {
    width: 100vw;
    height: 90vh;
    // overflow: hidden;    
    .list-item {
      z-index: -1;
      width: 100vw;
      height: 80vh;
      display: flex;
      align-content: center;
      justify-content: center;
      margin: 10vh 0 0 0;
      img {
        width: 90%;
        // margin: 10vh auto;
      }
    }
  }
</style> -->