
<template>
    <div id="Home">
        <router-link class="nav-link float-right" to="/profile">Profile</router-link>
        <!--Upload Component -->
        <newPost></newPost>
        <!--Feed Component -->  
        <feed></feed>
    </div>    
</template>

<script>
import newPost from '../components/newPost.vue';
import feed from '../components/feed.vue';

export default {
  components: {
    newPost,
    feed
  },
  name: 'Home',
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
