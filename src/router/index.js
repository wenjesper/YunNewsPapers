import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import VideoView from '@/views/Video/VideoView.vue'
import NewspaperView from '@/views/Newspaper/NewspaperView.vue'
import YunnanView from '@/views/Yunnan/YunnanView.vue'
import UserView from '@/views/User/UserView.vue'
import SearchView from '@/views/Search/SearchView.vue'
// import DetailsPage from '@/views/DetailsPage/DetailsPage.vue'
// import DetailsPage2 from '@/views/DetailsPage/DetailsPage2.vue'
import CityChange from '@/views/DetailsPage/CityChange.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      index: 1,
      keepAlive: true
    },
    children: [

    ]
  },
  {
    path: '/details-page',
    name: 'details-page',
    component: () => import('../views/DetailsPage/DetailsPage.vue'),
    meta: {
      index: 2,
      keepAlive: false
    }
  },
  {
    path: '/details-page2',
    name: 'details-page2',
    component: () => import('../views/DetailsPage/DetailsPage2.vue'),
    meta: {
      index: 2,
      keepAlive: false
    }
  },
  {
    path: '/SpecialView',
    name: 'SpecialView',
    component: () => import('../views/DetailsPage/SpecialView.vue'),
    meta: {
      index: 2,
      keepAlive: false
    }
  },
  {
    path: '/video',
    name: 'video',
    redirect: '/video/video-list',
    component: VideoView,
    meta: {
      index: 1,
      keepAlive: true
    },
    children: [
      {
        path: 'video-list',
        name: 'video-list',
        component: () => import('@/views/Video/VideoList.vue'),
        meta: {
          index: 1,
          keepAlive: true
        },
      },
    ]
  },
  {
    path: '/yunnan',
    name: 'yunnan',
    component: YunnanView,
    meta: {
      index: 1,
      keepAlive: true
    }
  },
  {
    path: '/newspaper',
    name: 'newspaper',
    // redirect: '/newspaper/newspaper-list',
    component: NewspaperView,
    meta: {
      index: 1,
      keepAlive: true
    },
  },
  {
    path: '/details-page4',
    name: 'details-page4',
    component: () => import('@/views/DetailsPage/DetailsPage4.vue'),
    meta: {
      index: 2,
      keepAlive: false
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    redirect: '/user/user-body',
    meta: {
      index: 1,
      keepAlive: true
    },
    children: [
      {
        path: 'user-body',
        name: 'user-body',
        component: () => import('@/views/User/UserBody.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/User/LoginView.vue'),
        meta: {
          index: 2,
          keepAlive: false
        }
      },
      {
        path: 'personal-data',
        name: 'personal-data',
        component: () => import('@/views/User/PersonalData.vue'),
        meta: {
          index: 2,
          keepAlive: false
        },
      },
      {
        path: 'book-mark',
        name: 'book-mark',
        component: () => import('@/views/User/BookMark.vue'),
        meta: {
          index: 2,
          keepAlive: false
        }
      },
      {
        path: 'history-view',
        name: 'history-view',
        component: () => import('@/views/User/HistoryView.vue'),
        meta: {
          index: 2,
          keepAlive: false
        }
      },
      {
        path: 'my-comments',
        name: 'my-comments',
        component: () => import('@/views/User/MyComments.vue'),
        meta: {
          index: 2,
          keepAlive: false
        }
      },
      {
        path: 'photo-show',
        name: 'photo-show',
        component: () => import('@/views/User/PhotoShow.vue'),
        meta: {
          index: 2,
          keepAlive: false
        }
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      index: 2,
      keepAlive: false
    }
  },
  {
    path: '/city-change',
    name: 'city-change',
    component: CityChange,
    meta: {
      index: 2,
      keepAlive: false
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.name === "personal-data" || to.name === "book-mark" || to.name === "my-comments") {
    // 因为这个守卫没有任何DOM操作或者对组件自身状态进行读写
    // 这样的守卫就可以作为路由独享守卫
    // 正确的做法存在cookie storage中
    let token = window.sessionStorage.getItem('token')
    if (token) {
      next();
    } else {
      next("/user/login"); //阻止本次跳转,直接导航到指定路由
    }
    // if (!token) return next("/login")
  } else {
    next()
  }

})

export default router
