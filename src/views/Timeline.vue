
<template>
    <div id="timeline">
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
  name: 'timeline',
  components: {
    newPost,
    feed
  },

  
};
</script>

<style>

</style>
