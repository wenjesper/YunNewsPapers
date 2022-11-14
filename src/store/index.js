import Vue from 'vue'
import Vuex from 'vuex'
// import { getDetailsPage } from '@/apis/home'
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityname: '昆明',
    cityid: '10',
    tname: [
      {
        categoryId: "15451",
        name: "推荐",
      },
      {
        categoryId: "15407",
        name: "政务",
      },
      {
        categoryId: "10",
        name: "昆明",
      },
      {
        categoryId: "15452",
        name: "专题",
      },
      {
        categoryId: "15463",
        name: "Myanmar",
      },
      {
        categoryId: "15406",
        name: "州市",
      },
      {
        categoryId: "15421",
        name: "经济",
      },
      {
        categoryId: "15422",
        name: "城市",
      },
      {
        categoryId: "15405",
        name: "观点",
      },
      {
        categoryId: "15374",
        name: "旅游",
      },
      {
        categoryId: "15459",
        name: "关注",
      },
      {
        categoryId: "15455",
        name: "开放",
      },
    ],
    citys:[ {
      "id":10,
      "categoryId":10,
      "position":"FIX",
      "name":"昆明",
      "simpleName":"昆明",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":11,
      "categoryId":11,
      "position":"NORMAL",
      "name":"曲靖",
      "simpleName":"曲靖",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":12,
      "categoryId":12,
      "position":"NORMAL",
      "name":"玉溪",
      "simpleName":"玉溪",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":13,
      "categoryId":13,
      "position":"NORMAL",
      "name":"保山",
      "simpleName":"保山",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":14,
      "categoryId":14,
      "position":"NORMAL",
      "name":"昭通",
      "simpleName":"昭通",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":15,
      "categoryId":15,
      "position":"NORMAL",
      "name":"丽江",
      "simpleName":"丽江",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":16,
      "categoryId":16,
      "position":"NORMAL",
      "name":"普洱",
      "simpleName":"普洱",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":17,
      "categoryId":17,
      "position":"NORMAL",
      "name":"临沧",
      "simpleName":"临沧",
      "systemType":"cms",
      "viewType":"article",
      "sort":95,
      "isRedirect":"否"
  },
  {
      "id":18,
      "categoryId":18,
      "position":"NORMAL",
      "name":"楚雄",
      "simpleName":"楚雄",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":19,
      "categoryId":19,
      "position":"NORMAL",
      "name":"红河",
      "simpleName":"红河",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":20,
      "categoryId":20,
      "position":"NORMAL",
      "name":"文山",
      "simpleName":"文山",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":21,
      "categoryId":21,
      "position":"NORMAL",
      "name":"西双版纳",
      "simpleName":"西双版纳",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":22,
      "categoryId":22,
      "position":"NORMAL",
      "name":"大理",
      "simpleName":"大理",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":23,
      "categoryId":23,
      "position":"NORMAL",
      "name":"德宏",
      "simpleName":"德宏",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":24,
      "categoryId":24,
      "position":"NORMAL",
      "name":"怒江",
      "simpleName":"怒江",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  },
  {
      "id":25,
      "categoryId":25,
      "position":"NORMAL",
      "name":"迪庆",
      "simpleName":"迪庆",
      "systemType":"cms",
      "viewType":"article",
      "sort":30,
      "isRedirect":"否"
  }
    ],
    comments:[
      
    ],
    Tokens:[],
    Historys:[],
    History:[],
    BookMark:[],
    filter:false,
    content: sessionStorage.getItem("content"),
    pausedshow:false,
    boshow:false,
    photoshow:true,
    share: false,
    size:18
  },
  getters: {
  },
  mutations: {
    // playVoice(state) {
    //   this.handleSpeak(state.content); // 传入需要播放的文字
    //   state.boshow = true
    //   console.log(123);
    // },
    // // stopVoice(state) {
    // //   this.handleStop(state.content); // 传入需要播放的文字
    // // },
    // pauseVoice(state) {
    //   this.handlePause(state.content); // 传入需要播放的文字
    //   state.pausedshow = true
    // },
    // 语音播报的函数
    handleSpeak(state,text) {
      state.content =text
      state.boshow = true
      msg.text = state.content; // 文字内容: 小朋友，你是否有很多问号
      msg.lang = "zh-CN"; // 使用的语言:中文
      msg.volume = 1; // 声音音量：1
      msg.rate = 1; // 语速：1
      msg.pitch = 1; // 音高：1
      synth.speak(msg); // 播放
    },
    // 语音停止
    handleStop(state) {
      console.log(123);
      // state.content =text
      msg.text = state.content;
      msg.lang = "zh-CN";
      // synth.cancel(msg);
      synth.stop(msg);
    },
    handlePause(state) {
      console.log(123);
      // state.content =text
      state.pausedshow = true
      msg.text = state.content;
      msg.lang = "zh-CN";
      // synth.cancel(msg);
      synth.pause(msg);
    },
    addComment(state, { id, text,time }) {
      state.comments = [
        {
          id,
          text,
          time
        },
        ...state.comments
      ]
    },
    addHistory( state,{ id, text,viewType,type}) {
      state.Historys = [
        {
          id:id,
          text:text,
          viewType:viewType,
          type:type,
          time:(new Date().getMonth() + 1)+'月'+ new Date().getDate()+'日'
        },
        ...state.Historys
      ]
      // console.log(state.Historys);
      // sessionStorage.setItem("historys",Historys)
      // state.Historys =''
    },
    addToken(state, { text,password,time }) {
      state.Tokens = [
        {
          text,
          password,
          user:'用户555',
          logo:'https://tse4-mm.cn.bing.net/th/id/OIP-C.hF5vKjg2T0s27BjncAXVTAHaHa?pid=ImgDet&rs=1',
          time
        },
        ...state.Tokens
      ]
    },
    addBookMark(state, { id, title,viewType,type,time,images }) {
      state.BookMark = [
        {
          id,
          title,
          viewType,
          type,
          time,
          images
        },
        // ...state.BookMark
      ]
    },
    setFilter(state, filter) {
      state.filter = filter
    },
    setPhotoshow(state, photoshow) {
      state.photoshow = photoshow
    },
    setShare(state, share) {
      state.share = share
    },
    setFont(state, size) {
      state.size = size
    },
    setHistorys(state,historys){
      // let history = sessionStorage.getItem('historys')
      // this.list = JSON.parse(history)
      // // console.log(history);
      // console.log(this.list);
      state.History = historys
    },
  },
  actions: {
    // async addHistory({commit,state},{id,text,viewType,type}) {
    //   commit('getHistory',{id,text,viewType,type})
    //   let historys = sessionStorage.historys
    //   if (!historys) {
    //     // commit('getHistory',{id,text,viewType,type})
    //     let value = JSON.stringify(state.Historys)
    //     // console.log(value);
    //     sessionStorage.setItem("historys",value)
    //   }
    //   else if(historys) {
    //     // commit('getHistory',{id,text,viewType,type})
    //     let value = JSON.stringify(state.Historys)
    //     historys = [value,...historys]
    //     // historys = JSON.parse(history) 
    //     // value = [value,...history]
    //     sessionStorage.setItem("historys",historys)
    //   }
    // },

    // async getNewHistory({ commit },{id}, { axios }) {
    //   // 获取本地是否已经缓存数据
    //   let historys = localStorage.historys
    //   let { result } = await axios(`http://appapi.yndaily.com/api/v2/articles/detail/${id}`)
    //   // 已经缓存
    //   if (historys) {
    //     // 不用网络请求直接通过localStorage获取
    //     //  将json字符串转化为数组
    //     // historys = JSON.parse(historys)
    //     historys = [result,...history]
    //     localStorage.historys = JSON.stringify(historys)
    //   } else {
    //     // 还没有缓存,发起网络请求
    //     historys = result
    //     // 存到本地缓存中
    //     localStorage.historys = JSON.stringify(historys)
    //   }
    //   commit('setHistorys', historys)
    //   // 判断是否已经有正在播的歌
    //   // if (!state.playingMusic) {
    //   //   commit('setPlayingMusic', songsList[0])
    //   // }
    // },
  },
  modules: {
  }
})
