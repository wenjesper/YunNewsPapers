<template>
  <div class="newspaper">
    <div class="head">读报</div>
    <div class="changNav">
      <span @click="btn">0{{ num }}版<i></i></span>
      <span @click="btn2">{{ day }}<i></i></span>
    </div>
    <div class="quantity" v-show="show">
      <span v-for="(m, i) in this.newspapers" :key="i" @click="changeNum(i+1)" :class="({red:num == i+1})">{{ m.page_num }}版</span>
    </div>
    <div class="datas" v-show="cli">
      <span v-for="(t, i) in this.newspapers" :key="i" :class="({red:num == i+1})">
        {{ t.period_num }}</span>
    </div>
    <div class="list">
      <transition-group name="scroll">
        <div class="list-item" v-for="(m, i) in this.newspapers" :key="i" v-show="num-1 == i" @click="gotoDetailsPage(m.items[0].id)">
        <img :src="m.page_pic" alt="" />
      </div>
      </transition-group>
    </div>
    <!-- <keep-alive>
        <router-view
        :newspapers="this.newspapers"
        ></router-view>
      </keep-alive> -->
  </div>
</template>
  
  <script>
// import { getHomeTabAPI } from "@/apis/home.js"
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
  created() {
    this.gettime()
    this.getnewspaper();
  },
  mounted() {},
  methods: {
    gotoDetailsPage(id) {
      if (this.$route.name !== "details-page4") {
        this.$router.push({
          path: "/details-page4",
          query: {
            id,
          },
        });
      }
    },
    getnewspaper() {
      this.$axios
        .get(
          `http://appapi.yndaily.com/api/v2/paper/list?deviceOs=15.7&count=20&clientVersion=4.0.3&paperName=ynrb&maxId=0&pjCode=ynrb&sinceId=0&platform=iOS&date=${this.day}&deviceModel=iPhone%20XS%20Max&max_id=0&pagesSize=391.919995x600.787537&udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&platform=iOS&deviceOs=1.0&clientVersionCode=403`
        )
        .then((data) => {
          console.log(data);
          this.newspapers = data.item;
          this.data = data.item[0].period_num;
        });
    },
    btn() {
      this.show = true;
      this.cli = false;
    },
    btn2() {
      this.cli = true;
      this.show = false;
    },
    changeNum(i){
      this.num = i
    },
    gettime(){
      let aData = new Date();
    console.log(aData) //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)
    
    let dateValue = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + (aData.getDate()-1);
    console.log(this.value) //2019-8-20 
      this.day =  dateValue
      console.log(this.day);
    }
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
.newspaper {
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: rgb(202, 15, 15);
    text-align: center;
    color: #fff;
    line-height: 55px;
    font-size: 20px;
  }
  .changNav {
    position: fixed;
    top: 40px;
    left: 0;
    display: flex;
    width: 100%;
    height: 30px;
    background-color: rgb(246, 239, 239);
    
    span {
      display: block;
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 30px;
      i {
        &:nth-child(1) {
          margin: 10px 10px 0 0;
          width: 0;
          height: 0;
          border-bottom: 10px solid black;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          float: right;
        }
      }
    }
  }
  .quantity {
    position: fixed;
    left: 0;
    top: 70px;
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #fff;
    flex-wrap: wrap;
    .red{
      color:rgb(202, 15, 15);
    }
    span {
      text-align: center;
      width: 25%;
      height: 30px;
      line-height: 30px;
    }
  }
  .datas {
    position: fixed;
    left: 0;
    top: 70px;
    display: flex;
    width: 100%;
    height: 120px;
    background-color: #fff;
    flex-wrap: wrap;
    .red{
      color:rgb(202, 15, 15);
    }
    span {
      text-align: center;
      width: 50%;
      height: 30px;
      line-height: 30px;
    }
  }
  .list {
    width: 100vw;
    height: 90vh;
    overflow: hidden;
//     .scroll-leave-to {
//   opacity: 0;
//   transform: translateY(-100%);
// }
// .scroll-enter{
//   opacity: 0;
//   transform: translateY(100%);
// }

//   .scroll-enter-active,
//   .scroll-leave-active {
//     transition: all 0.3s linear;
//   }

//   .scroll-enter-to,
//   .scroll-leave {
//     transform: translateY(-100%);
//   }
    
    .list-item {
      // z-index: -1;
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
}
</style>