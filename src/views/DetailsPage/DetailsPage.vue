<template>
  <div class="DetailsPage">
    <div class="head">
      <div class="return" @click="getback"></div>
      <div class="share" @click="setShare(true)">...</div>
    </div>
    <ShareView 
    v-if="vuexshare == true"
    :title    ='this.title'
    :name     ='this.name' 
    :time     ='this.time' 
    :type     ='this.type' 
    :shareUrl ='this.shareUrl'
    :images   ='this.images'
    :id       ='this.id'
    :viewType ='this.viewType'
    >
  </ShareView>
    <div class="videobox" v-if="this.type == 'video'">
      <video
        :src="video.resources[2].url"
        :poster="video.image"
        controls="controls"
      ></video>
    </div>
    <div class="title">
      <button @click="stopVoice">暂停语音</button>
      <h1>{{ title }}</h1>
    </div>
    <div class="sec">
      <div class="btn" @click="handleSpeak(content)">
        <img src="@/assets/icon/m2.png" />
      </div>
      <div class="xin">{{ name }}</div>
      <div class="xin">{{ time }}</div>
    </div>
    <div
      class="list"
      v-html="this.content"
      :style="{fontSize:vuexsize+'px'}"
      v-if="this.content"
    ></div>
    <div class="footer">
      <img src="@/assets/img/footer.png" alt="" />
      <p v-html="this.editor"></p>
      <div class="commentShow">
        <div class="title">
          <img src="@/assets/icon/comment1.png" />
          <span>热门评论({{ showComments.length }})</span>
        </div>
        <div class="null" v-if="showComments.length == 0">
          <!-- <img src="" /> -->
          <div></div>
          <span>暂无评论,快来抢沙发</span>
        </div>
        <div class="comments">
          <div class="comments-item" v-for="(m, i) in showComments" :key="i">
            {{ m.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="kong"></div>
    <CommentBox 
    :id="this.typeID" 
    />
  </div>
</template>


<script>
import { mapMutations } from "vuex";
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
import { getDetailsPage} from "@/apis/home.js";
import CommentBox from "@/components/CommentBox.vue";
import ShareView from "@/components/ShareView.vue";
export default {
  data() {
    return {
      content: [],
      title: "",
      name: "",
      time: "",
      video: null,
      type: "",
      editor: "",
      share: false,
      shareUrl:'',
      images:'',
      id:''

    };
  },
  created() {
    this.getDetailsList(this.typeID);
    // this.getNewHistory({ axios: this.$axios },{id:this.typeID})
  },
  computed: {
    vuexsize(){
      return this.$store.state.size
    },
    vuexshare(){
      return this.$store.state.share
    },
    showComments() {
      return this.$store.state.comments
      .filter(t => {
        if(this.typeID == t.id){
          return t.id
        }
      });
    },
    typeID() {
      //   let { id } = this.$route.query;
      return this.$route.query.id;
    },
  },
  watch: {
    typeID(id) {
      this.getDetailsList(id);
    },
  },
  methods: {
    ...mapMutations(['setShare']),
    // ...mapActions(['getNewHistory']), 
    // playVoice() {
    //   this.handleSpeak(this.content); // 传入需要播放的文字
    // },
    stopVoice() {
      this.handleStop(this.content); // 传入需要播放的文字
    },
    // // 语音播报的函数
    // handleSpeak(text) {
    //   msg.text = text; // 文字内容: 小朋友，你是否有很多问号
    //   msg.lang = "zh-CN"; // 使用的语言:中文
    //   msg.volume = 1; // 声音音量：1
    //   msg.rate = 1; // 语速：1
    //   msg.pitch = 1; // 音高：1
    //   synth.speak(msg); // 播放
    // },
    // 语音停止
    handleStop(e) {
      msg.text = e;
      msg.lang = "zh-CN";
      // synth.cancel(msg);
      synth.pause(msg);
    },
    //
    ...mapMutations(["handleSpeak"]), 
    getback() {
      if (this.$route.name !== "find-sec") {
        this.$router.go(-1);
      }
    },
    getDetailsList() {
      let url = getDetailsPage(this.typeID);
      this.$axios
        .get(url)
        .then((data) => {
          console.log(data);
          if(data.item){
          let res = data.item.content;
          let res2 = data.item.title;
          let res3 = data.item.source;
          let res4 = data.item.date;
          let res6 = data.item.type;
          let res7 = data.item.editor.replaceAll("-", "<br />");
          if (data.item.medias && data.item.medias[0]) {
            let res5 = data.item.medias[0];
            this.video = res5;
          }
          let res8 = data.item.shareUrl;
          let res9 = data.item.images[0];
          let res10 = data.item.id;
          let res11 = data.item.viewType;
          this.content = res;
          sessionStorage.setItem("content",this.content )
          this.title = res2;
          this.name = res3;
          this.time = res4;
          this.type = res6;
          this.editor = res7;
          this.shareUrl = res8;
          this.images = res9;
          this.id = res10;
          this.viewType = res11;
          }
        })
        .catch((err) => {
          // this.$message.error(err)
          console.log(err);
        });
    },
    
  },
  components: { 
    CommentBox,
    ShareView 
  },
};
</script>

<style lang="scss" scoped>
.DetailsPage {
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  // background-color: aliceblue;
  // padding: 0 10px;
  .head {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    box-shadow: 2px 2px 5px #f3f1f1;
    background-color: #fff;
    .return {
      float: left;
      margin: 15px;
      width: 13px;
      height: 13px;
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
  .videobox {
    // position: fixed;
    // top: 40px;
    // left: 0;
    margin-top: 50px;
    video {
      width: 95%;
      margin: 0 auto;
      border-radius: 6px;
    }
  }
  .title {
    margin-top: 50px;
    width: 100%;
    padding: 0 20px;
    font-weight: bold;
    h1 {
      margin: 20px 0;
      word-spacing: 10px;
    }
  }
  .sec {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    display: flex;
    .btn {
      width: 30px;
      height: 30px;
      border: 3px solid red;
      border-radius: 999px;
      img {
        // margin: 2.5px;
        width: 25px;
        height: 25px;
      }
    }
    .xin {
      height: 50px;
      line-height: 30px;
      font-size: 14px;
      color: #afafaf;
      margin: 0 5px;
    }
  }
  .list {
    padding: 0 20px;
  }
  .footer {
    padding: 0 20px;
    p {
      color: #afafaf;
      font-size: 14px;
    }
    .commentShow {
      width: 100%;
      .title {
        width: 100%;
        display: flex;
        padding: 0;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        span {
          font-size: 14px;
        }
      }
      .null {
        width: 100%;
        height: 200px;
        div{
          width: 100%;
          height: 60px;
        }
        span {
          margin: 0 100px;
        }
      }
      .comments {
        width: 100%;
        .comments-item {
          width: 100%;
          height: 20px;
          background-color: pink;
          margin-bottom: 10px;
        }
      }
    }
  }
  .kong {
    width: 100vw;
    height: 40px;
  }
}
</style>