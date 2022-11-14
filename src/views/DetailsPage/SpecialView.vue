<template>
  <div class="SpecialView" 
    ref="homeView" 
    @scroll.passive="scrollhandle">
    <div class="head" v-if="this.scorll<30">
      <div class="return">
      <span @click="getback"></span>
    </div>
      <div class="share">...</div>
    </div>
    <div class="head2" :style="{opacity: headColor}" v-else>
      <div class="return2" @click="getback"></div>
      <div class="bigTitle">{{ bigTitle }}</div>
      <div class="share2">...</div>
    </div>
    <div class="tab"
    :style="{opacity: headColor}" 
    v-show="headColor>0.2 && this.blocks.length >1"
    >
      <ul>
        <li
          class="tab-item"
          v-for="(m, i) in this.blocks"
          :key="i"
          :class="{ click: num == i }"
          @click="setnum(i)"
        >
          {{ m.title }}
        </li>
      </ul>
    </div>
    <div class="list" 
    >
      <div class="imgbox">
        <img :src="bigImage" alt="" />
      </div>
      <div class="list-item" 
      v-for="(m, i) in this.blocks" 
      :key="i"
      
      >
        <div class="list-tit">
          <span style="color: rgb(214, 21, 21)"
            >{{ i + 1 }}/{{ blocks.length }}</span
          >
          <span>{{ m.title }}</span>
        </div>
        <div class="lists">
          <ul>
            <li
              v-for="(c, i) in m.articles"
              :key="i"
              @click="gotoDetailsPage(c.articleId)"
            >
              <div class="titlebox">
                <p>{{ c.title }}</p>
                <div class="imgbox1" v-if="c.imageUrl">
                  <img :src="c.imageUrl"/>
                </div>
              </div>
              <div class="foot">{{ c.source }} | {{c.date}}</div>
            </li>
          </ul>
          <div class="more" @click="getmore(m.title)" >加载更多</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import { getDetailsPage3 } from "@/apis/home.js";
export default {
  data() {
    return {
      size: 5,
      size1: 5,
      size2: 5,
      blocks: [],
      bigTitle: "",
      bigImage: "",
      num: 0,
      title: "",
      name: "",
      time: "",
      video: null,
      type: "",
      editor: "",
      scorll:0
    };
  },
  created() {
    this.getDetailsList(this.typeID);
  },
  computed: {
    headOpacity() {
      let o = Math.floor(( this.scorll / 200) * 100) / 100;
      o = o >= 1 ? 1 : o;

      return o;
    },
    headColor() {
      let o = this.headOpacity >= 1 ? 1 : this.headOpacity;
      return `${o}`;
    },
    typeID() {
      return this.$route.query.id;
    },
    typeSize() {
      return this.size;
    },
  },
  watch: {
    typeID(id) {
      this.getDetailsList(id);
    },
    typeSize(size) {
      this.getDetailsList(size);
    },
  },
  methods: {
    scrollhandle() {
      this.scorll = this.$refs.homeView.scrollTop;
      console.log(this.$refs.homeView.scrollTop);
    },
    
    getmore(t){
      this.size =this.size + 5
      if(t=="新闻列表"){
        this.size == this.size
      }else{
        this.size2 == this.size
      }
      
      // console.log(this.size);
    },
    setnum(i) {
      this.num = i;
    },
    getback() {
      this.$router.back();
    },
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
    getDetailsList() {
      let url = getDetailsPage3(this.typeID, this.typeSize);
      this.$axios
        .get(url)
        .then((data) => {
          console.log(data);
          // if(data.item){
          let res = data.item.blocks;
          let res2 = data.item.title;
          let res3 = data.item.image;
          // let one =data.item.blocks.map((m)=>m.articles)
          // let two = one[0];
          // let three= one[1];
          // console.log(one);
          // let times = time.map((t) => {
          //   let d = t.slice("", 19);
          //   let m = d.replace(/[a-zA-Z]/g, "");
          //   // console.log(m);
          //   return m;
          // });
          // this.time = times;
          this.blocks = res;
          this.bigTitle = res2;
          this.bigImage = res3;
          
        })
        .catch((err) => {
          // this.$message.error(err)
          console.log(err);
        });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.SpecialView{
  overflow:auto;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  // background-color: aliceblue;
  .head {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    // box-shadow: 2px 2px 5px #afafaf;
    background-color: rgba(255,255,255,0);
    .return{
      float: left;
      width: 30px;
      height: 30px;
      // line-height: 15px;
      margin: 5px;
      border-radius: 999px;
      background-color: rgba(0,0,0,0.5);
      span {
      float: left;
      margin: 11px 0 0 11px;
      width: 10px;
      height: 10px;
      border-left: 3px solid #fff;
      border-bottom: 3px solid #fff;
      transform: rotate(45deg);
    }
    }
    
    .share {
      float: right;
      width: 30px;
      height: 30px;
      line-height: 15px;
      margin: 6px 10px;
      text-align: center;
      font-size: 30px;
      color: #fff;
      border-radius: 999px;
      background-color: rgba(0,0,0,0.5);
    }
  }
  .head2 {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    // box-shadow: 2px 2px 5px #afafaf;
    background-color: #fff;
    .bigTitle {
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .return2 {
      float: left;
      margin: 15px;
      width: 10px;
      height: 10px;
      border-left: 3px solid black;
      border-bottom: 3px solid black;
      transform: rotate(45deg);
    }
    .share2 {
      float: right;
      width: 40px;
      height: 40px;
      line-height: 25px;
      text-align: center;
      font-size: 30px;
    }
  }
  .tab {
    z-index: 200;
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    height: 32px;
    overflow: hidden;
    // box-shadow: 2px 2px 5px #afafaf;
    background-color: #fff;
    ul {
      // width: 1160px;
      height: 30px;
      display: flex;
      .click {
        color: rgb(216, 16, 16);
        &:after {
          content: "";
          width: 15px;
          height: 1px;
          display: block;
          margin: 0 auto;
          border-bottom: 2px solid rgb(216, 16, 16);
        }
      }
      li {
        margin: 0 10px;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        margin-bottom: 10px;
      }
    }
  }
  .list {
    width: 100vw;
    .imgbox {
      width: 100%;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .list-item {
      width: 100%;
      .list-tit {
        width: 100%;
        height: 60px;
        span {
          height: 60px;
          line-height: 60px;
          margin: 0 10px;
          font-weight: bold;
        }
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
          
        }
      }
      .more{
        width: 100%;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        text-align: center;
        background-color: #f3f1f1;
      }
    }
    }
  }
}
</style>