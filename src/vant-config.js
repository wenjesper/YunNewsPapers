import { 
    NavBar, 
    Tabbar, 
    Search, 
    Slider,
    Popup,
    TabbarItem,
    Overlay, 
    Icon,
    Lazyload,
    Swipe, SwipeItem,
    Button,
    PullRefresh,
    List,
    Sticky,
    ActionSheet,
    Field,
    Switch,
    NoticeBar } from 'vant'

const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Slider,
    Popup,
    NoticeBar,
    Swipe, SwipeItem,
    Lazyload,
    PullRefresh,
    Overlay,
    List,
    Sticky,
    ActionSheet,
    Field,
    Switch,
    Button
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}