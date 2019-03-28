import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

//import auth from './modules/auth';

//Load Vuex
Vue.use(Vuex);

//create store

export const store = new Vuex.Store({
	state: {
		user: null,
		loading: false,
		error: null
	},

	getters: {
		user(state) {
			return state.user;
		},
		loading(state) {
			return state.loading;
		},
		error(state) {
			return state.error;
		}
	},

	actions: {
		signUserUp({ commit }, payload) {
			commit("setLoading", true);
			commit("clearError");
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					commit("setLoading", false);
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					};
					commit("setUser", newUser);
				})
				.catch(error => {
					commit("setLoading", false);
					commit("setError", error);
					console.log(error);
				});
		},
		signUserIn({ commit }, payload) {
			commit("setLoading", true);
			commit("clearError");

			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					commit("setLoading", false);
					const newUser = {
						id: user.uid
					};
					commit("setUser", newUser);
				})
				.catch(error => {
					commit("setLoading", false);
					commit("setError", error);
					console.log(error);
				});
		},
		clearError({ commit }) {
			commit("clearError");
		}
	},

	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		setLoading(state, payload) {
			state.loading = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		clearError(state) {
			state.error = null;
		}
	}
});
