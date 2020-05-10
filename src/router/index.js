import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Login from './../views/Login.vue'
import Index from './../views/Index.vue'
import Detail from  './../views/Detail.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import Pay from './../views/Pay.vue'
import Home from './../views/Home.vue'
import Hand from './../views/Hand.vue'
import Doll from './../views/Doll.vue'
import Clothes from './../views/Clothes.vue'
import Others from './../views/Others.vue'
// 后台
import BackLogin from './../views/BackLogin.vue'
import Back from './../views/Back.vue'
import BackIndex from './../views/BackIndex.vue'
import BackUser from './../views/BackUser.vue'
import BackGoods from './../views/BackGoods.vue'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path:'/index',
          component:Index
        },
        {
          path:'/detail/:productId',
          component:Detail
        },
        {
          path:'/address',
          component:Address
          },
          {
            path:'/pay',
            component:Pay
            },
            {
              path:'/cart',
              component:Cart
              },
              {
                path:'/hand',
                component:Hand
              },
              {
                path:'/doll',
                component:Doll
              },
              {
                path:'/clothes',
                component:Clothes
              },
              {
                path:'/others',
                component:Others
              }
      ]
    },
    {
      // 路由注册
      path: '/login',
      component: Login
    },
    {
      path:'/backlogin',
      component:BackLogin
    },
    {
      path:'/back',
      component:Back,
      redirect:'/backindex',
      children:[
        {
          path:'/backindex',
          component:BackIndex
        },
        {
          path:'/backuser',
          component:BackUser
        },
        {
          path:'/backgoods',
          component:BackGoods
        }
      ]
    }
  ]
})
