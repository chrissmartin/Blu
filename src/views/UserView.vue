
<template>
    <div id="UserView">
     <!-- Profile info --> 
      <p>User Address : {{this.$root.$data.currentAccount}}</p>
      <p>Bio</p>
      <p>Username : </p>
      <p>No of posts: </p>
      <p>Following: </p>
      <p>User image<p>    
     
    </div>
</template>

<script>

export default {
  
  name: 'UserView',
  // data variables
  data() {
    return {
      selectedUser: '',
    };
  },

  methods: {

    sendInfo(item) {
        this.selectedUser = item;
    },
  },
}; 
</script>

<style>

#profile{
  
  justify-content: center;
  color: #212529;
  margin-top: 3%;
}


</style>
