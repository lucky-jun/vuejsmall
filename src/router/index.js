import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const Home = ()=> import('../views/home/Home')
const Cart = ()=> import('../views/cart/Cart')
const Category = ()=> import('../views/category/Category')
const Profile = ()=> import('../views/profile/Profile')
const Login = ()=>import('../views/profile/Login')
const Regist = ()=>import('../views/profile/Regist')
const Details = ()=>import('../views/Details/Details')
const BuyGoods = ()=>import('../views/Details/BuyGoods')
const PaymentSuccessful = ()=>import('../views/Buy/PaymentSuccessful')
const PaymentFailed = ()=>import('../views/Buy/PaymentFailed')

//安装插件
Vue.use(VueRouter)

//防止路由访问重复错误
const replaces = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return replaces.call(this, location).catch(err => err);
};
const pushs = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return pushs.call(this, location).catch(err => err)
}
//创建对象
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/profile',
    component:Profile,
    //路由独享守卫，前置守卫
    beforeEnter:(to,from,next)=>{
      console.log('进入守卫');
      console.log("SessionID111:"+sessionStorage.getItem("sessionID"));
      console.log("SessionID111:"+sessionStorage.getItem("sessionID")===null);
      // if(store.getters.checkSessionID){
      //   console.log('路由判断已登录');
      //   console.log("sessionID:"+store.state.user.sessionID);
      //   next()
      // }else{
      //   console.log('路由判断未登录')
      //   console.log("sessionID:"+store.state.user.sessionID);
      //   next('/login')
      // }
      if(sessionStorage.getItem("sessionID")!=null){
        console.log('路由判断已登录');
        // console.log("sessionID:"+store.state.user.sessionID);
        next()
      }else{
        console.log('路由判断未登录')
        // console.log("sessionID:"+store.state.user.sessionID);
        next('/login')
      }
    }
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/regist',
    component:Regist
  },
  {
    path: '/details',
    // path: '/Details/:id',
    component:Details,
    beforeEnter:(to,from,next)=>{
      console.log('进入守卫');
      next()
    }
  },
  {
    path: '/buygoods',
    component:BuyGoods
  },
  {
    //支付成功
    path: '/paymentsuccessful',
    component:PaymentSuccessful
  },
  {
  //  支付失败
    path: '/paymentfailed',
    component:PaymentFailed
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
