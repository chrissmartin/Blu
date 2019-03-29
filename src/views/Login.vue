<template>
  <div class="login" align-v="center">
    <b-container>
      <b-row>
        <b-col class="register left d-flex justify-content-center align-middle">
          <signup v-if="supmode" v-on:after-leave="afterLeave" id="form-text"></signup>
          <transition name="slide-fade">
          <div v-if="!supmode" id="blugrad">
            <div id="welcome-text">
              <h1>WELCOME BACK!</h1>
              <h6>SIGN IN TO ENTER THE SAFEST SOCIAL MEDIA IN THE WORLD</h6>
              <h4>NEW HERE?</h4>
              <button @click="supmode=!supmode">Sign Up</button>
            </div>
          </div> 
          </transition>
        </b-col>
        <b-col class="signin right d-flex justify-content-center align-middle">
          <div v-if="!supmode" id="form-text">
            <h1 class="logo">Blu.</h1>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <button @click="login">Login</button>  
          </div>
          <transition name="slide-fade">
            <div v-if="supmode" id="blugrad">
              <div id="welcome-text">
                <h1>WELCOME BACK!</h1>
                <h6>SIGN UP TO ENTER THE SAFEST SOCIAL MEDIA IN THE WORLD</h6>
                <h4>ALREADY A USER?</h4>
                <button @click="supmode=!supmode">Sign In</button>
              </div>
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

  import { mapGetters, mapActions } from 'vuex'

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
      //mapActions(['updateUser']),

      afterLeave: function (el) {
        supmode=!supmode;
      },
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            console.log(this.$store.getters.getUser);
            this.$router.replace('home');
            //console.log(guser());
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
  body{
    margin: 0px;
    padding: 0px;
    height: 100vh;
    width: 100vw;
  }
  #welcome-text{
    padding: 0px;
    position: relative;
    top: 30%;
    
  }
  #form-text{
    position: relative;
    padding: 0px;
    
  }
  .logo{
    color: #52A2DC;
    font-family: 'Century Gothic';
    font-size: 120px;
    font-weight: 700;
    text-shadow: 0 1px 4px #939393;
    margin-bottom: 50px;
  }
  .login {
    font-family: 'Century Gothic', 'Arial Narrow', Arial, sans-serif;
    
  }
  .container{
    height: 100vh;
    width: 100vw;
    margin: 0px;
    padding: 0px;
    max-width: 100%;
  }
  .left{
    text-align: center;
    display: block;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    height: 100vh;
    width: 50vw;
    padding: 0px;
    color: #333333;

}
.right{
    text-align: center;
    display: block;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    height: 100vh;
    width: 50vw;
    padding: 0px;
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
  height: 100vh;
  width: 100vw;
  background-color: #75BDF2; /* For browsers that do not support gradients */
  background-image: linear-gradient(to bottom, #7EE5F5, #75BDF2); /* Standard syntax (must be last) */
}

input {
    margin: 10px 0;
    border-radius: 2px;
    padding: 15px;
    width: 25vw;
    color: #212529;
    box-shadow: 1px 4px 12px 0px #7ee5f57d;
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
  transform: translateX(10px);
  opacity: 0;
}

</style>