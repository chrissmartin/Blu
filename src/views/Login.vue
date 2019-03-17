<template>
  <div class="login">
    <b-container>
      <b-row align-h="center">
        <b-col>

          <h3>Sign In</h3>
          <input type="text" v-model="email" placeholder="Email"><br>
          <input type="password" v-model="password" placeholder="Password"><br>
          <button @click="login">Login</button>
          <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>   

        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
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
  .login {
    margin-top:5%;
    margin-left: 400px;
    
  }
  input {
    margin: 10px 0;
    padding: 15px;
    width: 40%;
  }
  button {
    margin-top: 20px;
    width: 20%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>