<template>
  <div id="app">
    <div style="display: flex; flex-direction: column;">
      <h1 class="text-center">Blu.</h1>
      <p class="text-center">User Address : {{this.$root.$data.currentAccount}}</p>
      <!-- Upload Interface -->
      <div id="newPost">
      <button class="up-btn" v-on:click="show = !show"><p class="plus">+</p></button>
      <transition name="fade">     
      <div id="upload" v-if="show">
        <div v-if="this.$root.$data.loading === false">
          <h1>New Post</h1>

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
      </div>

      <!-- Posts Interface -->
      <ul class="home-list">
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
            <p class="home-card-text"> Caption : {{ item.caption }}</p>
            
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
          //imgHash_2 = imgHash;
          //console.log("Img Hash: "+imgHash_2);
          return this.convertToBuffer(this.caption);
        }).then(bufferDesc => ipfs.add(bufferDesc)
          .then(hashedText => hashedText[0].hash)).then((textHash) => {
          //textHash_2 = textHash; 
          //console.log("Text Hash: "+textHash);  
          this.$root.contract.methods
            .sendHash(imgHash, textHash)
            .send({ from: this.$root.currentAccount },
              (error, transactionHash) => {
                //transHash = transactionHash;
                //console.log("Transaction Hash: "+transactionHash);
                if (typeof transactionHash !== 'undefined') {
                  //alert('Storing on Ethereum...');
                  console.log("Alert-1  "+this.$root.currentAccount);
                  this.$root.contract.once('NewPost',
                    { from: this.$root.currentAccount },
                    () => {
                      console.log("Alert-2");
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
        console.log(this.$root.$data);
        
      } else {
        this.onSubmit();
      }
    },

  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  color: #2c3e50;
  margin-top: 3%;
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
  width: 500px;
}

.card {
  text-align: left;
  width: 500px;
  margin-bottom: 20px;
}


.home-list{
  padding: 0;
  list-style: none;
}

.home-card-text {
  text-align: justify;
  margin-top: 10px;
}

#upload {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5%;
  width: 500px;
}
.up-btn{
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #db4437;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  border: 0px;
  box-shadow: 0px 2px 5px #666;
}
.up-btn:active{outline:0;}
button:focus {outline:0;}
.plus{
  color: white;
  position: absolute;
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
  font-family: 'Roboto';
  font-weight: 300;
  animation: plus-out 0.3s;
  transition: all 0.3s;
}

.up-btn:hover .plus{
  animation: plus-in 0.15s linear;
  animation-fill-mode: forwards;
}

.up-btn:hover{
    background: #db4437;
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
    box-shadow: 0px 2px 5px #666;
}
</style>
