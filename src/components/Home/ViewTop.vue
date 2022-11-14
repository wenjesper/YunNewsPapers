<template>
    <div class="gnav">
        <div class="gnav-item" v-for="(t, i) in this.top" :key="i"  @click="gotoDetailsPage(t.articleId)">
          <div class="icon"><span>置顶</span></div>
          <div class="txt">{{ t.listTitle }}</div>
        </div>
      </div>
</template>


<script>
export default {
    props:['top'],
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
    .gnav {
      width: 90vw;
      // height: 60px;
      // margin: 0 auto;
      .gnav-item {
        width: 100%;
        height: 30px;
        overflow: hidden;
        // display: flex;
        .icon {
          width: 40px;
          height: 30px;
          float: left;
          z-index: 1;
          padding: 2px;
          span {
            margin-left: 10px;
            font-size: 12px;
            border-radius: 2px;
            color: #fff;
            background-color: rgb(202, 15, 15);
          }
        }
        .txt {
          font-size: 14px;
          width: 230%;
          height: 30px;
          line-height: 30px;
        }
      }
    }
</style>