// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 无限滚动
import infiniteScroll from 'vue-infinite-scroll'
// 导入vuex
// import Vuex from 'vuex'

//store
// import store from './store'

//  在main.js中引入创建好的bus.js文件
import bus from './bus'
Vue.use(bus);

// Vue.use(Vuex)
Vue.config.productionTip = false
// 使用element-ui
Vue.use(ElementUI)
// 使用图片懒加载
Vue.use(VueLazyLoad,{
  loading:require("./assets/loading.svg")
})
// 无限滚动
Vue.use(infiniteScroll)

//  挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   //  to 将要访问的路径
//   //  from 代表从哪个路径跳转而来
//   //  next 是一个函数，表示放行
// //    next()放行  next('/login) 强制跳转
//   if (to.path === '/login') return next()
//   // 获取token
//   const cookie =windows.cookies.get
//   console.log(cookie)
//   if (!cookie) return next('/login')
//   next()
//   this.$message.error("请先登录")
// })
// const store = new Vuex.Store({
//   state:{
//     nickname:'',
//     cartCount:0
//   },
  // mutations:{
  //   updateUserInfo(state,nickname){
  //     state.nickname=nickname;
  //   },
  //   updateCartCount(state,cartCount){
  //     state.cartCount +=cartCount;
  //   }
  // }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  // store,
  components: { App },
  template: '<App/>'
})

