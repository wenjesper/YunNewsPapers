<template>
  <div class="home">
    <div class="nav">
      <div class="head">
        <div class="logo">雲報</div>
        <div class="inb-box">
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
        <ViewTop :top="all.top" />
        <ViewLun :lun="lun" />
        <div class="lists">
          <ul>
            <li v-for="(c, i) in this.all.list" :key="i" @click="gotoDetailsPage(c.articleId)">
              <div class="titlebox">
                <p>{{ c.title }}</p>
                <!-- <div class="imgbox2">
                <img :src="" alt="">
              </div>
              <div class="imgbox3">
                <img :src="" alt="">
              </div> -->
                <p>{{ c.source }}|time</p>
              </div>
              <div class="imgbox1">
                <img :src="c.imageUrl" alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </van-pull-refresh>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <van-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" :speed="40" :delay="0.2" wrapable/> -->
  </div>
</template>

<script>
import ViewTop from "@/components/Home/ViewTop.vue";
import ViewLun from "@/components/Home/ViewLun.vue";
export default {
  data() {
    return {
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
  components: {
    ViewTop,
    ViewLun,
  },
  computed: {
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
    gotoDetailsPage(id) {
      if (this.$route.name !== "details-page") {
        this.$router.push({
            path:"details-page",
            query:{
                id,
            }
        });
      }
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功"); //弹出
        this.isLoading = false;
      }, 3000);
    },
    getComment(url) {
      this.$axios.get(url).then((data) => {
        console.log(data.item);
        this.all = data.item;
        this.lun = data.item.head;
      });
    },
    // changtype(index, type, id) {
    //   this.$router.push({
    //     name: `${this.tname[index]}`,
    //     query: {
    //       type: type,
    //       id: id,
    //     },
    //   });
    // },
    setid(id) {
      this.id = id;
    },

    // async getDiscoverBlock() {
    //   let { data } = await this.$axios(getHomeTabAPI);

    //   this.blocks = data.blocks.map((b) => {
    //     return {
    //     //   showType: b.showType,
    //     //   subTitle: b.uiElement.subTitle.title,
    //     //   button: b.uiElement.button.text,
    //     //   creatives: b.creatives,
    //     //   extInfo: b.extInfo || [],
    //     };
    //   });
    // },
  },
  
};
</script>

<style lang="scss" scoped>
    .list {
    width: 100vw;
    height: 90vh;
    overflow: auto;
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
            p {
            }
            span {
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