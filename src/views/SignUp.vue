<template>
  <div class="sign-up">
    <h1 class="logo">Blu.</h1>
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <input type="text" v-model="username" placeholder="username"><br>
    <button @click="signUp">Sign Up</button>
  </div>
</template>

 <script>
  import firebase from 'firebase';
  /* require("firebase/firestore"); */
  

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: '',
        username: '',
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {

            user = firebase.auth().currentUser;
            //firebase.collection("users").doc(user.uid).update({walletId: this.$root.$data.currentAccount});
            firebase.collection("users").doc(user.uid).update("Hi");
            this.$router.push('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

 <style scoped>
   .logo{
    color: #52A2DC;
    font-family: 'Century Gothic';
    font-size: 120px;
    font-weight: 700;
    text-shadow: 0 1px 4px #939393;
    margin-bottom: 50px;
  }
  input{
    margin: 10px 0;
    border-radius: 2px;
    padding: 15px;
    width: 25vw;
    color: #212529;
    box-shadow: 1px 4px 12px 0px #7ee5f57d;
    border: none;
  }
  button {
    position: relative;
    display: block;
    margin: 20px auto;
    padding: 5px 30px;
    overflow: hidden;
    border-width: 0;
    outline: none;
    border-radius: 7px;
    height: 40px;
    box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.42);
    background-color: #ffffff;
    color: #000000a3;
    transition: background-color 0.3s;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 14px;
  }
</style>