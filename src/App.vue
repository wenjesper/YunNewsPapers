<template>
  <div id="app1">
    <transition :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <van-tabbar
      v-model="active"
      active-color="#000"
      class="tab-bar"
      fixed
      v-if="$route.meta.keepAlive"
    >
      <van-tabbar-item
        :to="item.name"
        v-for="(item, index) in tabbars"
        :key="index"
        class="flex-1 text-center text-xs"
      >
        {{ item.title }}
        <template #icon="props">
          <img
            :src="props.active ? item.active : item.normal"
            class="w-6 mx-auto"
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <div class="CoverLayer" v-show="this.vuexfilter"></div>
    <div class="speech" v-if="vuexboshow == true" @click="handleStop">
      <div class="item imgbox" v-if="vuexboshow == true"></div>
      <div class="item paused" v-if="vuexpausedshow == false">
        <img src="@/assets/icon/pause.png">
      </div>
      <div class="item play" v-if="vuexpausedshow==true">
        <img src="@/assets/icon/play2.png">
      </div>
      <div class="item del" v-if="vuexpausedshow==true">
        <img src="@/assets/icon/shop.png">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      pausedshow:false,
      active: 0,
      CoverLayer: false,
      tabbars: [
        {
          name: "/home",
          title: "资讯",
          normal: require("@/assets/icon/home.png"),
          active: require("@/assets/icon/home1.png"),
        },
        {
          name: "/video",
          title: "视频",
          normal: require("@/assets/icon/sort.png"),
          active: require("@/assets/icon/sort1.png"),
        },
        {
          name: "/yunnan",
          title: "云南号",
          normal: require("@/assets/icon/ring.png"),
          active: require("@/assets/icon/ring1.png"),
        },
        {
          name: "/newspaper",
          title: "读报",
          normal: require("@/assets/icon/shop.png"),
          active: require("@/assets/icon/shop1.png"),
        },
        {
          name: "/user",
          title: "我的",
          normal: require("@/assets/icon/user.png"),
          active: require("@/assets/icon/user1.png"),
        },
      ],
      transitionName: "",
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      console.log(to, "to");
      console.log(from, "from");
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      }
      if(to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      }
      if(to.meta.index == from.meta.index) {
        this.transitionName != "slide-right";
      }
      // else {
      //   this.transitionName = "slide-right";
      // }
    },
  },

  computed: {
    vuexfilter() {
      return this.$store.state.filter;
    },
    vuexpausedshow() {
      return this.$store.state.pausedshow;
    },
    vuexboshow() {
      return this.$store.state.boshow;
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(["handleStop"])
  },
};
</script>


<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: fixed;
}
.slide-right-enter {
  // opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  // opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  // align-content: center;
  width: 100vw;
  height: 55px;
  font-size: 12px;
  background-color: #fff;
  box-shadow: 0px -7px 7px -7px #afafaf;
}
.CoverLayer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 200;
}
.speech{
  position: fixed;
  bottom: 60px;
  left: 0;
  height: 40px;
  display: flex;
  padding: 0 10px;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
  background-color: #d4cdcd;
  .item{
    width: 40px;
    height: 40px;
    img{
      width: 70%;
      height: 70%;
      margin: 15% 0;
    }
  }
}
</style>
