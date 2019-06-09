<template>
  <div class="home">
    <img class="blu-nav" src="../assets/bg-crop.png" alt="Blu">
    <button @click="logout" class="logout float-left">Logout</button>
      <div class="profile-icon" @click="goToProfile()">
          <img src="../assets/user.png" alt="Profile" height="50px" width="50px">
      </div>
  
    <timeline></timeline>
  </div>
</template>


<script>
import timeline from './Timeline.vue';
import profile from './Profile.vue';
import firebase from 'firebase';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


export default {
  name: 'Home',

  components: {
    'timeline':timeline,
    'profile':profile
  },
  
  methods: {
    goToProfile:function() {
          this.$router.push({name:'profile'})
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('login')
      })
    }
  },
}

</script>

<style>
.blu-nav{
  position: absolute;
  width: 100%;
  top: -40px
}
@media only screen and (max-width: 600px) {
.blu-nav{
  top: 0px
}
}

.profile-icon{
    position: absolute;
    right: 10px;
    top: 20px;
}
.logout{
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 5px 30px;
    overflow: hidden;
    border-width: 0;
    outline: none;
    border-radius: 7px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    background-color: #ffffff;
    color: #333333;
    transition: background-color .3s;
  }
</style>
