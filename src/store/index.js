import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const store = new Vuex.Store({
  state: {
    user:[{userID: '',power: '',sessionID:''}],
      Sumprice:0,
      checkboxGoods:Array
  },
  mutations: {
      // 登录后记录登录状态
    LoginUpstoreUser(state,payload){
      sessionStorage.setItem('userID',payload.userID)
      sessionStorage.setItem('power',payload.power)
      sessionStorage.setItem('sessionID',payload.sessionID)
      state.user.userID = sessionStorage.getItem('userID');
      state.user.power = sessionStorage.getItem('power');
      state.user.sessionID = sessionStorage.getItem('sessionID');
    },
      // 刷新过后重新从sessionStorage中获取登录信息
      updatestate() {
          store.state.user.userID = sessionStorage.getItem('userID');
          store.state.user.power = sessionStorage.getItem('power');
          store.state.user.sessionID = sessionStorage.getItem('sessionID');
      },
      //获取总价格
      SumPrice(state,payload){
        state.Sumprice = payload.sumprice
          state.checkboxGoods = payload.GoodsID
      },
      checkboxGoods(state,payload){
        state.checkboxGoods = payload.GoodsID
      }
  },
  getters:{
      checkSessionID(){
          store.commit('updatestate')
        return store.state.user.sessionID==null
      },
      getSumprice(){
          return store.state.Sumprice
      }
  },
  actions: {
  },
  modules: {
  }
})
export default store