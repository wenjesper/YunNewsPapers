import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import vantConfig from './vant-config'
import "tailwindcss/tailwind.css"
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.config.productionTip = false

Vue.use(vantConfig)

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => ({
    ...config,
    // baseURL: '',
    // headers:{
    //   'Content-Type':'application/x-www-from-urlencoded'
    // }
  }),
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: ({ data }) => data,
  resErrorFunc: error => Promise.reject(error)
})

// router.beforeEach((to, from, next) => {
//   //to.name是登录路由的名字
//     if (to.name!='Login') {
//     //token思路就是登录成功之后保存起来，然后下面拿来用
//       let token = sessionStorage.getItem("token")
//     //判断token是否已经保存了
//       if (token) {
//       //成功跳转
//         next()
//       } else {
//         Vue.prototype.$message({
//           type: "error",
//           message: "请先登录"
//        });
//         next('/')
//       }
//     } else {
//     //不能把所有路由都拦截拦，要留个登陆路由
//       next()
//     }
//   })
  
  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.replace('/home')
