<template>
  <div class="DetailsPage">
    <div class="head">
      <div class="return" @click="getback"></div>
      <div class="share">...</div>
    </div>
    <!-- <div class="videobox"
     v-show="this.type != video"
     >
          <video
            :src="video.resources[2].url"
            :poster="video.image"
            controls="controls"
          ></video>
    </div> -->
    <div class="title">
      <!-- <button @click="stopVoice">暂停语音</button>  -->
      <h1>{{title}}</h1>
    </div>
    <div class="sec">
      <!-- <div class="btn" @click="playVoice">
        <img src="@/assets/icon/m2.png">
      </div> -->
      <div class="xin">{{name}}</div>
      <div class="xin">{{time}}</div>
    </div>
    <div class="list" v-html="this.content"></div>
    <div class="footer">
        <img src="@/assets/img/footer.png" alt="">
        <p v-html="this.editor"></p>
        <div></div>
    </div>
    <div class="comment-inp">
      
    </div>
  </div>
</template>


<script>
import { getDetailsPage4 } from "@/apis/news.js";
export default {
  data() {
    return {
        content: [],
        title: '',
        name:'',
        time:'',
        video:'',
        type:'',
        editor:''
    };
  },
  created() {
    this.getDetailsList(this.typeID);
  },
  computed: {
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
    
    // 
    getback() {
      if (this.$route.name !== "find-sec") {
        this.$router.go(-1);
      }
    },
    async getDetailsList() {
      let url = getDetailsPage4(this.typeID);
      let { item } = await this.$axios(url)
      let data = await this.$axios(url)
      // console.log(this.$route.query.id);
      .catch(err =>{
        // this.$message.error(err)
        console.log(err);
      })
      console.log(data);    
      let res = item.content;
      // let res2 = data.item.title;
      // let res3 = data.item.source;
      // let res4 = data.item.date;
      // let res6 = data.item.type;
      // let res7 = data.item.editor.replaceAll("/","<br />");
      // // let res5 = data.item.medias[0];
      this.content = res
      // this.title = res2
      // this.name = res3
      // this.time = res4
      // this.video = res5
      // this.type = res6
      // this.editor = res7
    },
  },
};
</script>

<style lang="scss" scoped>
.DetailsPage {
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: relative;
  top:0;
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
    box-shadow: 2px 2px 5px #afafaf;
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
  // .videobox{
  //   margin-top: 40px;
  //       video{
  //         width: 95%;
  //         margin: 0 auto;
  //         border-radius: 6px;
  //       }
  //     }
  .title{
    margin-top: 50px;
    width: 100%;
    padding: 0 20px;
    font-weight: bold;
    h1{
      margin: 20px 0;
      word-spacing:10px;
    }
  }
  .sec{
    width: 100%;
    height: 50px;
    padding: 0 20px;
    display: flex;
    .btn{
      width: 30px;
      height: 30px;
      border: 3px solid red;
      border-radius: 999px;
      img{
        // margin: 2.5px;
        width: 25px;
        height: 25px;
      }
    }
    .xin{
        height: 50px;
        line-height: 30px;
        font-size: 14px;
        color: #afafaf;
        margin: 0 5px;
      }
  }
  .list{
    padding: 0 20px;
  }
  .footer{
    padding: 0 20px;
    p{
      color: #afafaf;
      font-size: 14px;
    }
  }
}
</style>