

const state = {
    user: null,
    loading: false,
    error: null
},

const getters = {

},

const actions = {
    signUserUp ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.uid,
                registeredMeetups: []
              }
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      signUserIn ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.uid,
                registeredMeetups: []
              }
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      clearError ({commit}) {
        commit('clearError')
      }
    },

},
const mutations= {
    setUser (state,payload){
        state.user = payload
    },
    setLoading (state,payload){
        state.loading = payload
    },
    setError (state,payload){
        state.error = payload
    },
    clearError (state){
        state.error = null
    },
},

export default {
    state,
    getters,
    actions,
    mutations
}