<template>
    <div class="lun" v-show="this.lun">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(b,i) in this.lun" :key="i" @click="gotoDetailsPage(b.articleId)">
              <img :src="b.images[0]" alt="">
              <p>{{b.title}}</p>
            </van-swipe-item>
          </van-swipe>
        </div>
</template>

<script>
export default {
    props:['lun'],
    methods:{
      gotoDetailsPage(id) {
      if (this.$route.name !== "details-page") {
        this.$router.push({
            path:"/details-page",
            query:{
                id,
            }
        });
      }
    },
    }
}
</script>
<style lang="scss" scoped>
    .lun {
      z-index: -1;
      width: 100vw;
    //   height: 250px;
      overflow: hidden;
      // overflow: auto;
      .my-swipe {
        height: 250px;
      .van-swipe-item {
        width: 100vw;
        height: 250px;
        float: left;
        position: relative;
        img{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        p{
          position: absolute;
          bottom: 10px;
          left: 0;
          font-weight: bold;
          color: rgb(252, 252, 252);
          z-index: 2;
          padding: 0 10px;
          // float: left;
        }
      }
      
    }
    }
</style>