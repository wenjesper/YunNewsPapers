<template>
  <div class="CoverLayer">
    <div class="btn" @click="setShare(false)">X</div>
    <div class="box" v-if="fontshow == false">
      <div class="box-item">
        <div class="imgbox">
          <img src="@/assets/icon/wx.png" />
        </div>
        <div>微信</div>
      </div>
      <div class="box-item">
        <div class="imgbox">
          <img src="@/assets/icon/wx.png" />
        </div>
        <div>朋友圈</div>
      </div>
      <div class="box-item">
        <div class="imgbox">
          <img src="@/assets/icon/wx.png" />
        </div>
        <div>微博</div>
      </div>
      <div class="box-item">
        <div class="imgbox">
          <img src="@/assets/icon/wx.png" />
        </div>
        <div>QQ</div>
      </div>
      <div class="box-item">
        <div class="imgbox">
          <img src="@/assets/icon/wx.png" />
        </div>
        <div>QQ空间</div>
      </div>
      <div
        class="box-item"
        type="success"
        v-clipboard:copy=""
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        <div class="imgbox">
          <img src="@/assets/icon/lian.png" />
        </div>
        <div>复制链接</div>
      </div>
      <div class="box-item">
        <div class="imgbox">
          <img src="@/assets/icon/photo.png" />
        </div>
        <div>生成海报</div>
      </div>
      <div class="box-item" @click="BookMark()">
        <div class="imgbox" style="background-color: rgba(0, 0, 0, 0.8)">
          <!-- <img src="@/assets/collect1.png" /> -->
          <img src="@/assets/icon/cang2.png" />
        </div>
        <div>收藏</div>
      </div>
      <div class="box-item" @click="setfontshow">
        <div class="imgbox" style="background-color: rgba(0, 0, 0, 0.5)">
          <img src="@/assets/icon/font.png" />
        </div>
        <div>字体大小</div>
      </div>
    </div>
    <div class="box2" v-if="fontshow">
      <p>字体大小</p>
      <div class="sizebox">
        <div class="line"></div>
        <div
          @click="setFont(12)"
          :class="this.vuexsize == 12 ? 'active' : 'items'"
        ></div>
        <div
          @click="setFont(14)"
          :class="this.vuexsize == 14 ? 'active' : 'items'"
        ></div>
        <div
          @click="setFont(16)"
          :class="this.vuexsize == 16 ? 'active' : 'items'"
        ></div>
        <div
          @click="setFont(18)"
          :class="this.vuexsize == 18 ? 'active' : 'items'"
        ></div>
        <div
          @click="setFont(20)"
          :class="this.vuexsize == 20 ? 'active' : 'items'"
          style="float: right"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["title", "name ", "time", "type", "shareUrl", "id","images","viewType"],
  data() {
    return {
      fontshow: false,
    };
  },
  computed: {
    vuexsize() {
      return this.$store.state.size;
    },
    vuexBookMark() {
      return this.$store.state.BookMark;
    },
  },
  methods: {
    ...mapMutations(["setShare"]),
    ...mapMutations(["setFont"]),
    setfontshow() {
      this.fontshow = true;
    },
    async BookMark() {
      let search1 = localStorage.BookMarkList;
      if (search1) {
        search1 = JSON.parse(search1);
        this.commitAddBookMark({
          id:this.id,
          title:this.title,
          viewType:this.viewType,
          type:this.type,
          time:this.time,
          images:this.images,
          // viewType:this.viewType
        });
        let value2 = JSON.stringify(this.vuexBookMark)
        // let search2 = search1.filter((t) => {
        //   if (t.id == this.id) {
        //     return t.id;
        //   }
        // });
        search1.push(value2);
        let value3= JSON.stringify(search1)
        await localStorage.setItem("BookMarkList",value3)
      } else {
        this.commitAddBookMark({
          id:this.id,
          title:this.title,
          viewType:this.viewType,
          type:this.type,
          time:this.time,
          images:this.images,
          // viewType:this.viewType
        });
        let value = JSON.stringify(this.vuexBookMark)
        await localStorage.setItem("BookMarkList",value)
      }
    },
    ...mapMutations({
      commitAddBookMark: "addBookMark",
    }),
    onCopy() {
      this.$message({
        message: `复制成功！`,
        type: "success",
      });
      this.snackBar.info(this.$t("prompt.copySuccess"));
    },
    onError() {
      this.$message.error(this.$t("prompt.copyFail"));
    },
  },
};
</script>

<style lang="scss" scoped>
.CoverLayer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
  .box {
    margin: 200px 0;
    width: 100%;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    .box-item {
      flex: 0 0 33%;
      border: 1px solid #fff;
      .imgbox {
        width: 50px;
        height: 50px;
        background-color: #fff;
        border-radius: 999px;
        margin: 20px auto;
        border: 2px solid #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      div {
        width: 100%;
        color: #fff;
        margin: 10px auto;
        text-align: center;
      }
    }
  }
  .btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
  }
  .box2 {
    margin: 300px 0;
    width: 100%;
    p {
      color: #fff;
      font-size: 30px;
      padding: 0 20px;
    }
    .sizebox {
      width: 80%;
      margin: 0 10%;
      height: 100px;
      position: relative;
      display: flex;
      .line {
        height: 2px;
        background-color: #fff;
        width: 100%;
        position: absolute;
        top: 50px;
        left: 0;
      }
      .active {
        float: left;
        width: 20px;
        height: 20px;
        background-color: red;
        z-index: 3;
        margin: 40px 24px;
        border-radius: 999px;
      }
      .items {
        float: left;
        width: 15px;
        height: 15px;
        background-color: white;
        // position: absolute;
        // top:45px;
        z-index: 2;
        margin: 43px 24px;
        border-radius: 999px;
      }
    }
  }
}
</style>