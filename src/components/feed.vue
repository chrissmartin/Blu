
<template>
    <div id="feed" style="display: flex; flex-direction: column;">
      <!-- Posts Interface --> 

      <!--Hashmodal-->
          <b-modal id="hash-modal" title="Hashes" ok-only no-stacking>
                      <p><b> Caption Hash: </b>{{ selectedUser.tHash }}</p>
                      <p><b>Image Hash: </b> {{ selectedUser.iHash }}</p>
                      <p><b>Owner Address: </b>{{ selectedUser.ownHash }}</p>
          </b-modal>
      <!--IMG Hashmodal-->
          <b-modal id="img-link-modal" title="Image URL" ok-only no-stacking>
                      <p>https://ipfs.infura.io/ipfs/{{selectedUser.iHash}}</p>
          </b-modal>
      <!-- Posts -->
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
            <b-dropdown variant="link" size="lg" no-caret id="post-option">
              <template slot="button-content" >&#x22EE;<span class="sr-only">Options</span></template>
              <b-dropdown-item v-b-modal.hash-modal @click="sendInfo(item)">Hashes</b-dropdown-item>
              <b-dropdown-item v-b-modal.img-link-modal @click="sendInfo(item)">Image Link</b-dropdown-item>
            </b-dropdown>
            
          </div>          
          <div>
              <p class="home-card-text"> Caption : {{ item.caption }}</p> 
              
          </div>
          </b-card>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'feed',
  // data variables
  data() {
    return {
      item: '',
      selectedUser: '',
    };
  },
  methods: {

	methods: {
		sendInfo(item) {
			this.selectedUser = item;
		}
	}
};
</script>

<style>

#feed{
  
  justify-content: center;
  color: #212529;
  
}

.profile-icon{
  float: right;
}
.card img {
	object-fit: cover;
	height: 375px;
	width: 500px;
}

.card {
	text-align: left;
	width: 500px;
	margin-bottom: 20px;
}

.home-list{
  padding: 0px;
  list-style: none;
  margin: 250px auto;
}

.home-card-text {
	margin-top: 10px;
}

#post-option * {
	text-decoration: none;
	margin-right: 0px;
	top: -20px;
	left: 440px;
	color: #000000;
}
.modal-body{
  word-wrap: break-word;
}
</style>
