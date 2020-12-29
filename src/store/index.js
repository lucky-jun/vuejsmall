import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user:[{userID: '',power: '',sessionID:''}],
  },
  mutations: {
    LoginUpstoreUser(state,payload){
      state.user.userID = payload.userID;
      state.user.power = payload.power;
      state.user.session = payload.session;
    }
  },
  getters:{
      checkLogin(){
        // if(state.user.userID==''|| state.user.power==''||state.user.sessionID==''){
        //     return false
        // }else{
        //     return true
        // }
        return true
      }
  },
  actions: {
  },
  modules: {
  }
})
