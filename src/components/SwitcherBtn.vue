<template>
  <div class="switcher">
    <input id="switcher-check" type="checkbox" checked v-model="text"/>
    <label for="switcher-check" class="switcher-layer">
      <span class="switcher-point"></span>
    </label>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data(){
        return{
            text:true
        }
    },
    methods: mapMutations(["setFilter"]),
};
</script>

<style scoped>
.switcher {
}
/*把input藏起来~*/
.switcher input[type="checkbox"] {
  display: none;
}
.switcher-layer {
  cursor: pointer;
  width: 80px;
  height: 40px;
  display: block;
  border-radius: 20px;
  background-color: #aaa;
  transition: background 0.6s;
}
.switcher-point {
  width: 30px;
  height: 30px;
  display: inline-block;
  background-color: white;
  border-radius: 50px;
  margin: 5px;
  transition: margin 0.6s;
}
/*checkbox勾选状态下，它兄弟换了个背景色*/
.switcher input[type="checkbox"]:checked ~ .switcher-layer {
  background-color: rgba(255, 51, 0, 0.386);
}
/*而且兄弟家小圈还跑右边去了*/
.switcher input[type="checkbox"]:checked ~ .switcher-layer .switcher-point {
  margin-left: 45px;
}
</style>