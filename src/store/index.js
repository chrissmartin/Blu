import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';


Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    user:"LOL"
  }
  
  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  const mutations = {
    updateUser (state,payload) {
      state.user=payload;
    }
  }
  
  // actions are functions that cause side effects and can involve
  // asynchronous operations.
  const actions = {
    updateUser: ({commit}, payload) => commit('updateUser',payload) //this.$store.dispatch('updateUser', payload)
  }
  
  // getters are functions
  const getters = {
    getUser: state => {return state.user}
  }
  

  const vuexLocalStorage = new VuexPersist({
    storage: window.localStorage
  })
  
  export const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [vuexLocalStorage.plugin]
  })
