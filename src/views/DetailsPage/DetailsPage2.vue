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
    <div class="title">
      
      <!-- <button @click="stopVoice">暂停语音</button> -->
      <h1>{{ title }}</h1>
    </div>
    <div class="nav">
      <div class="imgbox">
        <img :src="logo" alt="" />
      </div>
      <span>{{name }}</span>
      <div class="btn">+订阅</div>
    </div>
    <div class="list" 
    v-html="this.content" 
    v-if="this.content"
    :style="{fontSize:vuexsize+'px'}"
    ></div>
    <div class="footer">
      <img src="@/assets/img/footer.png" alt="" />
      <!-- <p v-html="this.editor"></p> -->
      <div class="commentShow">
        <div class="title">
          <img src="@/assets/icon/comment1.png" />
          <span>热门评论({{ showComments.length }})</span>
        </div>
        <div class="null" v-if="showComments.length == 0">
          <img src="" />
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
    <CommentBox :id="this.typeID" />
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import { getDetailsPage2} from "@/apis/home.js";
import CommentBox from "@/components/CommentBox.vue";
import ShareView from "@/components/ShareView.vue";
export default {
  data() {
    return {
      content: [],
      title:'',
      logo:'',
      name:'',
      viewType:'',
      shareUrl:'',
      images:'', 
      id:''   
    };
  },
  created() {
    this.getDetailsList(this.typeID);
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
    getback() {
      if (this.$route.name !== "find-sec") {
        this.$router.go(-1);
      }
    },
    getDetailsList() {
      let url = getDetailsPage2(this.typeID);
      this.$axios
        .get(url)
        .then((data) => {
          console.log(data);
          if(data.data){
          let res = data.data.content;
          let res2 = res.replaceAll("600px","100%")
          let res3 = data.data.title;
          let res4 = data.data.orgInfo.logo;
          let res5 = data.data.orgInfo.name;
          let res7 = data.data.viewType;
          let res8 = data.data.shareUrl;
          let res9 = data.data.images[0];
          let res10 = data.data.id;
          this.content = res2;
          this.title = res3;
          this.logo=res4
          this.name=res5
          this.shareUrl = res8;
          this.images   = res9;
          this.id       = res10;
            this.viewType =res7
          }
        })
        .catch((err) => {
          // this.$message.error(err)
          console.log(err);
        });
    },
    
  },
  components: { CommentBox,ShareView },
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
  // padding: 0 20px;
  .head {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    // box-shadow: 2px 2px 5px #afafaf;
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
  .nav {
    width: 90%;
    height: 40px;
    overflow: hidden;
    padding: 0 20px;
    margin: 20px;
    background-color: #f3f1f1;;
    .imgbox {
      float: left;
      margin: 10px 10px 0 10px;
      width: 25px;
      height: 20px;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid #f3f1f1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      float: left;
    }
    .btn {
      float: right;
      font-size: 13px;
      text-align: center;
      width: 60px;
      height: 23px;
      color: rgb(202, 15, 15);
      margin: 10px;
      border-radius: 999px;
      border: 1px solid rgb(202, 15, 15);
      background-color: #fff;
    }
  }
  .title {
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: bold;
    padding: 0 20px;
    margin-top: 40px;
    width: 100%;
    padding-top: 20px;
    height: 80px;
  }
  .list {
    width: 100vw;
    overflow: hidden;
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
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