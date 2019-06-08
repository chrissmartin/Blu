<template>
	<div class="login" align-v="center">
		<b-container>
			<b-row>
				<b-col class="register left d-flex justify-content-center align-middle">
					<signup v-if="supmode" v-on:after-leave="afterLeave" id="form-text"></signup>
					<transition name="fadeRight">
						<div v-if="!supmode" id="blugrad">
							<div id="welcome-text">
								<h1 style="font-weight: 800; font-size: 70px;">WELCOME<br/>BACK!</h1>
								<h3 style="font-weight: 300;">SIGN IN</h3>
								<h6 style="font-weight: 300;">SIGN IN TO ENTER THE SAFEST SOCIAL MEDIA IN THE WORLD</h6>
								<h4 id="small-text">NEW HERE?</h4>
								<button @click="supmode=!supmode">Sign Up</button>
							</div>
						</div>
					</transition>
				</b-col>
				<b-col class="signin right d-flex justify-content-center align-middle">
					<div v-if="!supmode" id="form-text">
						<h1 class="logo">Blu.</h1>
						<input type="text" v-model="email" placeholder="Email">
						<br>
						<input type="password" v-model="password" placeholder="Password">
						<br>
						<button @click="login">Login</button>
					</div>
					<transition name="fadeLeft">
						<div v-if="supmode" id="blugrad">
							<div id="welcome-text">
								<h1 style="font-weight: 800; font-size: 70px;">Hello<br/>There!</h1>
								<h3 style="font-weight: 300;">SIGN UP</h3>
								<h6 style="font-weight: 300;">SIGN UP TO ENTER THE SAFEST SOCIAL MEDIA IN THE WORLD</h6>
								<h4 id="small-text">ALREADY A USER?</h4>
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
import firebase from "firebase";
import signup from "./SignUp.vue";
//import { mapGetters, mapActions } from "vuex";

require('vue2-animate/dist/vue2-animate.min.css')

export default {
	name: "login",
	components: {
		signup
	},
	data() {
		return {
			email: "",
			password: "",
			supmode: false,
		};
	},
	methods: {
		//mapActions(['updateUser']),

		afterLeave: function(el) {
			supmode = !supmode;
		},
		login: function() {
			firebase
				.auth().signInWithEmailAndPassword(this.email, this.password).then(
					user => {
						const db=firebase.firestore();
						var userId = firebase.auth().currentUser.uid;
						var user = db.collection('users').doc(userId);
						let getDoc = user.get()
						.then(doc => {
								if (!doc.exists) {
								console.log('No such document!');
								} else {

								this.$store.dispatch("updateUser", doc.data());
								//console.log("UPDATED-user", this.$store.getters.getUser);								
								console.log('Document data:', doc.data());
								}
							})
						.catch(err => {
							console.log('Error getting document', err);
						});						

						this.$router.push("home");
						//console.log(guser());
					},
					err => {
						alert("Oops. " + err.message);
					}
				);
		},

	}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,800');
/* "scoped" attribute limit the CSS to this component only */
body {
	margin: 0px;
	padding: 0px;
	height: 100vh;
	width: 100vw;
}
#welcome-text {
	padding: 0px;
	position: relative;
	top: 30%;
	color: #ffffff;
	font-family: 'Open Sans', sans-serif;
	
}


#small-text{
	padding-top: 50px;
	font-weight: 600;
}
#form-text {
	position: absolute;
	padding: 0px;
}
.logo {
	color: #52a2dc;
	font-family: "Century Gothic";
	font-size: 120px;
	font-weight: 700;
	text-shadow: 0 1px 4px #939393;
	margin-bottom: 50px;
}
.login {
	font-family: "Century Gothic", "Arial Narrow", Arial, sans-serif;
}
.container {
	height: 100vh;
	width: 100vw;
	margin: 0px;
	padding: 0px;
	max-width: 100%;
}
.left {
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
.right {
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
	.left {
		height: 50%;
	}
	.right {
		height: 50%;
	}
}

#blugrad {
	height: 100vh;
	width: 100vw;
	background-color: #75bdf2; /* For browsers that do not support gradients */
	background-image: linear-gradient(
		to bottom,
		#7ee5f5,
		#75bdf2
	); /* Standard syntax (must be last) */
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
p {
	margin-top: 40px;
	font-size: 13px;
}
p a {
	text-decoration: underline;
	cursor: pointer;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              
.slide-fade-enter-active {
	transition: all 0.3s ease;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8  {
	transform: translateX(10px);
	opacity: 0;
}
.slide-fade-leave-to{
	transform: translateX(-10px);
	opacity: 0;
}*/
</style>