<template>
  <div class="comment-inp">
    <div class="inp-s" v-show="show">
      <div class="inp-box">
        <input type="text" maxlength="300" placeholder="我也来说两句" v-model.trim="text"/>
      </div>
      <div class="footer">
        <div class="speech">语音</div>
        <div class="confirm" @click="addComments">确认</div>
        <div class="cancel">取消</div>
      </div>
    </div>
    <div class="inputbox" v-show="!show">
      <div class="inputbox-l" @click="show = true" v-show="!show">
        <div class="box">
          <div class="icon"><img src="@/assets/icon/edit.png" style="width:70%;height:70%;margin:15%;"/></div>
          <p>我也来说两句</p>
          <div class="icon"><img src="@/assets/icon/m1.png"/></div>
        </div>
      </div>
      <div class="inputbox-r">
        <span><img src="@/assets/icon/comment.png" /></span>
        <span><img src="@/assets/icon/xin1.png" /></span>
        <span><img src="@/assets/icon/share.png" /></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props:['id'],
  data() {
    return {
      show: false,
      text: "",
    };
  },
  computed:{
      vuexComments(){
        return this.$store.state.comments
      }
  },
  methods: {
    async addComments() {
      let search1 = localStorage.MyCommentList;
      if (search1&&this.text) {
        search1 = JSON.parse(search1);   
        this.commitAddComment({
          id: this.id,
          text: this.text,
          time:(new Date().getMonth() + 1)+'月'+ new Date().getDate()+'日'
        });
        this.text = "";
        this.show=false;
        let value2 = JSON.stringify(this.vuexComments)
        search1.push(value2);
        let value3= JSON.stringify(search1)
        await localStorage.setItem("MyCommentList",value3)
      } else {
        this.commitAddComment({
          id: this.id,
          text: this.text,
          time:(new Date().getMonth() + 1)+'月'+ new Date().getDate()+'日'
        });
        this.text = "";
        this.show=false;
        let value = JSON.stringify(this.vuexComments)
        await localStorage.setItem("MyCommentList",value)
      }
    },
    // addComment() {
    //   if (this.text) {
    //     // let history = localStorage.
    //     this.commitAddComment({
    //       id: this.id,
    //       text: this.text,
    //       time:new Date().getTime()
    //     });
    //   }
    //   this.text = "";
    //   this.show=false;
    // },
    ...mapMutations({
      commitAddComment: "addComment",
    }),
  },
};
</script>

<style lang="scss" scoped>
.comment-inp {
  .inp-s {
    padding: 2.5vw;
    padding-bottom: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    // height: 400px;
    // background-color: fff;
    overflow: hidden;
    .inp-box {
      width: 95vw;
      height: 200px;
      background-color: #fff;
      border: 1px solid #afafaf;
      input {
        border: none;
        outline: none;
        width: 100%;
        // height: 200px;
      }
    }
    .footer {
      width: 100%;
      height: 30px;
      overflow: hidden;
      padding: 2.5px;
      .speech {
        float: left;
        font-size: 14px;
        color: red;
      }
      .cancel {
        float: right;
        height: 25px;
        width: 60px;
        border-radius: 999px;
        border: 1px solid red;
        color: red;
        background-color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 25px;
      }
      .confirm {
        float: right;
        height: 25px;
        width: 60px;
        border-radius: 999px;
        font-size: 14px;
        background-color: red;
        color: #fff;
        text-align: center;
        line-height: 25px;
      }
    }
  }
  .inputbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 40px;
    background-color: #fff;
    overflow: hidden;
    .inputbox-l {
      float: left;
      width: 60%;
      height: 100%;
      .box {
        margin: 10px;
        width: 55vw;
        height: 25px;
        margin: 7px auto;
        background-color: rgb(248, 248, 248);
        border-radius: 999px;
        display: flex;
        p {
          font-size: 14px;
          width: 70%;
          height: 100%;
        }
        .icon {
          width: 15%;
          height: 100%;
          img {
            width: 80%;
            height: 90%;
          }
        }
      }
    }
    .inputbox-r {
      float: right;
      width: 40%;
      height: 100%;
      // background-color: pink;
      display: flex;
      span {
        flex: 1;
        img {
          margin: 8px auto;
          width: 60%;
          height: 60%;
        }
      }
    }
  }
}
</style>