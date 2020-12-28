import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Home from '../views/home/Home'

Vue.use(ElementUI)

new Vue({
    el:'home',
    rename:h=>h(Home)
})