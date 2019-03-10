<template>
  <div id="app">
    <h1 class="logo-b">B</h1><h1 class="logo-lu">lu.</h1>
    <div class="sidenav">
    </div>
    <div class="account-circle"><i class="fas fa-igloo"></i></div>
    <div id="feed" style="display: flex; flex-direction: column;">

      <p class="text-center">User Address : {{this.$root.$data.currentAccount}}</p>
      <!-- Upload Interface -->
            
      <div id="newPost">
      <b-button v-b-modal.upload-modal class="up-btn" v-on:click="show = !show"><p class="plus">+</p></b-button>
      <b-modal id="upload-modal" title="Upload Image">
      <transition name="fade">     
      <div id="upload" v-if="show">
        <div v-if="this.$root.$data.loading === false">
          <h4>New Post</h4>

          <!-- Form for file choose, caption text and submission -->
          <form
            class="margin-sm"
            @submit.stop.prevent="handleSubmit"
          >
            <div class="border-style">
              <b-form-file accept="image/jpeg, image/png, image/gif"
                plain
                @change="captureFile"
              />
            </div>
            <b-form-textarea
              v-model="caption"
              placeholder="Post description"
              :rows="3"
              :max-rows="6"
              class="margin-xs"
            />
            <b-button
              class="margin-xs"
              variant="secondary"
              @click="handleOk"
            >
              Upload
            </b-button>
          </form>
        </div>
        <div
          v-if="this.$root.$data.loading === true"
          style="margin-top: 10%; margin-bottom: 5%"
        >
          <img
            class="upload-load"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
        </div>
      </div>
      </transition>
      </b-modal>
      </div>

      <!-- Posts Interface -->
      <ul class="home-list" align-h="center">
        <li
          v-for="item in this.$root.$data.currentPosts"
          :key="item.key"
          :item="item"
        >
          <!-- Card UI for post's image & caption text -->
          <b-card
            border-variant="secondary"
            :img-src="item.src"
          >
          <div>
              <p class="home-card-text"> Caption : {{ item.caption }}</p>
              
              <b>Hashes</b>
              <p><b> Caption Hash: </b>{{ item.tHash }}</p>
              <p><b>Image Hash: </b> {{ item.iHash }}</p>
              <p><b>Owner Address: </b>{{ item.ownHash }}</p>
          </div>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ipfs from './contracts/ipfs';

export default {
  name: 'App',
  // data variables
  data() {
    return {
      show: false,
      buffer: '',
      caption: '',
    };
  },
  created:function(){

    console.log("Hi");
    
  },

  methods: {
    /* used to catch chosen image &
     * convert it to ArrayBuffer.
     */

    
    captureFile(file) {
      const reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsArrayBuffer(file.target.files[0]);
        reader.onloadend = async () => {
          this.buffer = await this.convertToBuffer(reader.result);
        };
      } else this.buffer = '';
    },
    /**
     * converts ArrayBuffer to
     * Buffer for IPFS upload.
     */
    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    /**
     * submits buffered image & text to IPFS
     * and retrieves the hashes, then store
     * it in the Contract via sendHash().
     */
    onSubmit() {
      //alert('Uploading on IPFS...');
      this.$root.loading = true;
      let imgHash;
      
      ipfs.add(this.buffer)
        .then((hashedImg) => {
          imgHash = hashedImg[0].hash;
          
          return this.convertToBuffer(this.caption);
        }).then(bufferDesc => ipfs.add(bufferDesc)
          .then(hashedText => hashedText[0].hash)).then((textHash) => {
           
          this.$root.contract.methods
            .sendHash(imgHash, textHash)
            .send({ from: this.$root.currentAccount },
              (error, transactionHash) => {
                
                if (typeof transactionHash !== 'undefined') {
                  //alert('Storing on Ethereum...');
                  console.log("Storing on Ethereum..."+this.$root.currentAccount);
                  this.$root.contract.once('NewPost',
                    { from: this.$root.currentAccount },
                    () => {
                      console.log("After eth store");
                      this.$root.getPosts();
                      alert('Operation Finished! Refetching...');
                    });
                } else this.$root.loading = false;
              });
        });
    },
    /**
     * validates if image & captions
     * are filled before submission.
     */
    handleOk() {
      if (!this.buffer || !this.caption) {
        alert('Please fill in the information.');
        
        
      } else {
        this.onSubmit();
      }
    },

  },
};
</script>

<style>
.logo-b{
  position: fixed;
  z-index: 2;
  top: 1px;
  left: 45px;
  color: #ffffff;
  font-size: 90px;
}
.logo-lu{
  position: fixed;
  z-index: 2;
  top: 10px;
  left: 100px;
  color: #00ABE7;
  font-size: 80px;
}
.sidenav {
  height: 100%;
  width: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #00ABE7;
  overflow-x: hidden;
  padding-top: 20px;
}
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
#feed{
  
  justify-content: center;
  color: #2c3e50;
  margin-top: 3%;
}
#newPost{
  margin:auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.home-load {
  width: 50px;
  height: 50px;
}

.card img {
  object-fit: cover;
  height: 500px;
  width: 700px;
}

.card {
  text-align: left;
  width: 700px;
  margin-bottom: 20px;
}


.home-list{
  padding: 0;
  list-style: none;
  margin: auto;
}

.home-card-text {
  margin-top: 10px;
}

#upload {
  font-family: Helvetica, sans-serif, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5%;
}
.up-btn{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #00ABE7;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  border: 0px;
  box-shadow: 0px 13px 13px rgba(0, 0, 0, 0.16);
}

.btn-primary {
    color: #fff;
    background-color: #00ABE7;
    border-color: #fff0;
}

.btn-secondary {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}
.btn-primary:hover {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}

.btn-secondary.focus, .btn-secondary:focus {
    box-shadow: none;
}

.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}


.btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}

.up-btn:active{outline:0;}
button:focus {outline:0;}
.plus{
  color: white;
  top: 0;
  display: block;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0;
  margin: 0;
  line-height: 55px;
  font-size: 38px;
  font-family: Helvetica, sans-serif, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  animation: plus-out 0.3s;
  transition: all 0.3s;
}

.up-btn:hover .plus{
  animation: plus-in 0.15s linear;
  animation-fill-mode: forwards;
}

.up-btn:hover {
    background: #00ABE7;
    text-decoration: none;
    text-align: center;
    
}

.upload-load {
  width: 50px;
  height: 50px;
}

.margin-xs {
  margin-top: 3%;
}

.margin-sm {
  margin-top: 7%;
}

.border-style {
  border: 1px solid #ced4da;
}
.border-secondary {
    border-color: #ffffff!important;
    border: 0px;
    box-shadow: 6px 15px 20px 3px #f8f9fa;
}
</style>
