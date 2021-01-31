import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:()=>import('../pages/index'),
      children:[
        {
          path:'/cart',
          component:()=>import('../view/cart')
        },
        {
          path:'/home',
          component:()=>import('../view/home')
        },
        {
          path:'/cate',
          component:()=>import('../view/cate')
        },
        {
          path:'/mine',
          component:()=>import('../view/mine')
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('@/pages/login')
    },
    {
      path:'/register',
      component:()=>import('@/pages/register')
    },
    {
      path:'/list',
      component:()=>import('../pages/list')
    },
    {
      path:'/detail',
      component:()=>import('../pages/detail')
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
