import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('views/home/Home')
const Cart = ()=> import('views/cart/Cart')
const Category = ()=> import('views/category/Category')
const Profile = ()=> import('views/profile/Profile')
const Login = ()=>import('views/profile/Login')
const Regist = ()=>import('views/profile/Regist')
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
    redirect:Home
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
    component:Profile
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/regist',
    component:Regist
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
