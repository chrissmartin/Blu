
<template>
    <div id="timeline">
        <router-link class="nav-link float-right" to="/profile">Profile</router-link>
        <button @click="logout" class="nav-link float-right">Logout</button>
        <!--Upload Component -->
        <newPost></newPost>
        <!--Feed Component -->  
        <feed></feed>
    </div>    
</template>

<script>
import newPost from '../components/newPost.vue';
import feed from '../components/feed.vue';
import firebase from 'firebase';

export default {
  components: {
    newPost,
    feed
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  name: 'timeline',
};
</script>

<style>
.nav-link{
  position: relative;
  z-index: 2;
  top: -10px;
  right: 50px;
}
</style>
