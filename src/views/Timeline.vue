
<template>
	<div id="timeline">
		<!--<router-link class="nav-link float-right" to="/profile">Profile</router-link>-->
		<button @click="logout" class="nav-link float-right">Logout</button>
		<!--Upload Component -->
		<newPost></newPost>
		<!--Feed Component -->
		<feed></feed>
	</div>
</template>

<script>
import newPost from "../components/newPost.vue";
import feed from "../components/feed.vue";
import firebase from "firebase";

export default {
	components: {
		newPost,
		feed
	},
	methods: {
		logout: function() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.replace("login");
				});
		}
	},
	name: "timeline"
};
</script>

<style>
.nav-link {
	width: 120px;
	position: relative;
	top: -10px;
	right: 50px;
	display: block;
	margin: 30px auto;
	padding: 5px 30px;
	overflow: hidden;
	border-width: 0;
	outline: none;
	border-radius: 7px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
	background-color: #ffffff;
	color: #333333;
	transition: background-color 0.3s;
}
</style>
