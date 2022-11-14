<template>
  <div class="video">
      <transition name="scroll">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div class="head">视频</div>
  </div>
  
</template>

<style lang="scss" scoped>
.video {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .scroll-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.scroll-enter{
  opacity: 0;
  transform: translateX(100%);
}

  .scroll-enter-active,
  .scroll-leave-active {
    transition: all 0.2s linear;
  }

  // .scroll-enter-to,
  // .scroll-leave {
  //   transform: translateX(-100%);
  // }
  .head {
    z-index: 100;
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
}
</style>