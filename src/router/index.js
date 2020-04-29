import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Login from './../views/Login.vue'
import Index from './../views/Index.vue'
import Detail from  './../views/Detail.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import Pay from './../views/Pay.vue'
import Product from './../views/Product.vue'
import Home from './../views/Home.vue'
import Hand from './../views/Hand.vue'
import Doll from './../views/Doll.vue'
import Clothes from './../views/Clothes.vue'
import Others from './../views/Others.vue'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 路由注册
      path: '/',
      component: Login
    },
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
          path:'/detail',
          component:Detail
        },
        {
        path:'/prodcut',
        component:Product
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
    }
  ]
})
