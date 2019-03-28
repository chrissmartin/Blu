import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';
import
{
  Nav, Image, Card, Layout, Button, Modal, FormFile,
}
  from 'bootstrap-vue/es/components';
import App from './App.vue';
import web3 from './contracts/web3';
import contract from './contracts/contractInstance';
import VueRouter from 'vue-router';
import { routes } from './routes';
import firebase from 'firebase';

//Vue.forceUpdate(); //global declaration 

Vue.use(VueRouter);
/**
 * injects bootstrap libraries
 * in Vue instance.
 */
Vue.use(BootstrapVue);
Vue.use(Nav);
Vue.use(Image);
Vue.use(Card);
Vue.use(FormFile);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Modal);

//LOL

let app = '';
const config = {
  apiKey: "AIzaSyBD_HAKD-YwbSOgXQ_xqWOGMOaM8QuTTNQ",
  authDomain: "blu-dapp.firebaseapp.com",
  databaseURL: "https://blu-dapp.firebaseio.com",
  projectId: "blu-dapp",
  storageBucket: "blu-dapp.appspot.com",
  messagingSenderId: "1068703469753"
};

//Firebase Init
firebase.initializeApp(config);

//Router Initialized
const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

// Vue instance and Session
firebase.auth().onAuthStateChanged(() => {
  if (!app) { 
  
  app =  new Vue({
  el: '#app',
  router,
  data: {
    currentPosts: [],
    currentAccount: '',
    loading: true,
    contract,
  },
  /**
   * calls functions for getting
   * account & current posts.
   */
  async created() {
    await this.updateAccount();
    await this.getPosts();
  },
  transformToRequire: {
    img: 'src',
    image: 'xlink:href',
  },
  methods: {
    /**
     * gets current account on web3 and
     * store it on currentAccount variable.
     */
    async updateAccount() {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      
      this.currentAccount = account;
    },
    /**
     * using the Smart Contract instance:
     * getCounter() - gets the length of total posts
     * getHash() - gets the image & text hashes using an index
     *
     * index is from the iteration of the retrieved total
     * post count. every loop gets the hashes and fetches
     * text & image using the IPFS gateway URL.
     */
    async getPosts() {
      //this.loading = false;
      const posts = [];
      const counter = await contract.methods.getCounter().call({
        from: this.currentAccount,
      });
      
      if (counter !== null) {
        const hashes = [];
        const captions = [];
        for (let i = counter; i >= 1; i -= 1) {
          hashes.push(contract.methods.getHash(i).call({
            from: this.currentAccount,
          }));
        }
         
        const postHashes = await Promise.all(hashes);

        for (let i = 0; i < postHashes.length; i += 1) {
          captions.push(fetch(`https://ipfs.infura.io/ipfs/${postHashes[i].text}`)
            .then(res => res.text()));
        }
        const postCaptions = await Promise.all(captions);

        for (let i = 0; i < postHashes.length; i += 1) {
          posts.push({
            id: i,
            key: `key${i}`,
            caption: postCaptions[i],
            src: `https://ipfs.infura.io/ipfs/${postHashes[i].img}`,
            tHash: postHashes[i].text,
            iHash: postHashes[i].img,
            ownHash: postHashes[i].owner
          });
        }

        this.currentPosts = posts;
        this.loading = false;
      }
    },
  },
  render: h => h(App),
});
}});
