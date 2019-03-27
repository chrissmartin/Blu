import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

//Load Vuex
Vue.use(Vuex);

//create store

export default new Vuex.Store({
    modules:{
        auth
    }
});