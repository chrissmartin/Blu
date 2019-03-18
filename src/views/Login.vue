<template>
  <div class="login" align-v="center">
    <b-container>
      <b-row align-h="center" align-v="center">
        <b-col class="register left d-flex justify-content-center align-middle">
          <signup v-if="supmode" v-on:after-leave="afterLeave"></signup>
          <transition name="slide-fade">
          <div v-if="!supmode" >
            <h1>WELCOME BACK!</h1>
            <h6>SIGN IN TO ENTER THE SAFEST SOCIAL MEDIA IN THE WORLD</h6>
            <h4>NEW HERE?</h4>
            <button @click="supmode=!supmode">Sign Up</button>
          </div> 
          </transition>
        </b-col>
        <b-col class="signin right d-flex justify-content-center align-middle">
          <div v-if="!supmode">
            <h1 class="logo">Blu.</h1>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <button @click="login">Login</button>  
          </div>
          <transition name="slide-fade">
            <div v-if="supmode">
              <h1>WELCOME BACK!</h1>
              <h6>SIGN UP TO ENTER THE SAFEST SOCIAL MEDIA IN THE WORLD</h6>
              <h4>ALREADY A USER?</h4>
              <button @click="supmode=!supmode">Sign In</button>
            </div>
          </transition>  
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
  import firebase from 'firebase';
  import signup from './SignUp.vue';

  export default {
    name: 'login',
    components:{
      signup
    },
    data() {
      return {
        email: '',
        password: '',
        supmode: false
      }
    },
    methods: {
      afterLeave: function (el) {
        supmode=!supmode;
      },
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
  
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  
  .logo{
    color: #52A2DC;
    font-family: 'Century Gothic';
    font-size: 120px;
    font-weight: 700;
    text-shadow: 0 1px 4px #939393;
    margin-bottom: 50px;
  }
  .login {
    margin-top:5%;
    font-family: 'Century Gothic', 'Arial Narrow', Arial, sans-serif;
    
  }
  .left{
    text-align: center;
    background-color: #ffffff;
    height: 100%;
    color: #333333;

}
.right{
    text-align: center;
    display: block;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    height: 100%;
    color: #333333;
}
@media (max-width: 1200px) { 
  .left{
    height:50%
  }
  .right{
    height:50%
  }
}

#blugrad {
  height: 100%;
  background-color: #75BDF2; /* For browsers that do not support gradients */
  background-image: linear-gradient(to bottom, #7EE5F5, #75BDF2); /* Standard syntax (must be last) */
}

input {
    margin: 10px 0;
    padding: 15px;
    color: #212529;
    box-shadow: 0px 15px 32px #7EE5F5;
    border: none;
  }
  button {
    width: 120px;
    position: relative;
    display: block;
    margin: 50px auto;
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
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }


  /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(.17,.67,.83,.67);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(500px);
  opacity: 0;
}

</style>