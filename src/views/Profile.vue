<template>
	<div id="profile">
		<!-- Profile info -->
		
			<b-card id="profile-card">
				<div class="image-cropper">
					<b-card-img src="https://placekitten.com/480/210" alt="Profile image" img-left class="mx-auto"/>
				</div>
				<router-link to="home" id="back-btn">
					<a>BACK</a>
				</router-link>
				<b-card-text class="mx-auto profile-info">
					<p>Wallet Address : {{this.$root.$data.currentAccount}}</p>
					<p>Email: {{email}} </p>
					<p>Username : {{username}} <p>
					<p>Wallet: {{walletid}} </p>
					<p>Followers: {{followers}} </p>
					<p>User image</p>
				</b-card-text>
			</b-card>
		
	</div>
</template>

<script>
// import firebase from 'firebase';
//console.log(this.$store.getters.getUser.email);
export default {
	name: "profile",
	data() {
		return {
			username: this.$store.getters.getUser.username,
			email: this.$store.getters.getUser.email,
			followers: this.$store.getters.getUser.followers,
			walletid: this.$store.getters.getUser.walletId
		};
	},
};
</script>

<style scoped>
.profile-card {
	z-index: 2;
	position: relative;
	left: 0px;
	right: 0px;
	margin-top: 5%;
}

.card {
	box-shadow: 0px 1px 11px 0px #90A4AE;
	border: none;
	position: relative;
	margin: auto;
	max-width: 800px;
}

.image-cropper {
	width: 100px;
	height: 100px;
	overflow: hidden;
	border-radius: 50%;
}
#back-btn{
	float: right;
    border-radius: 2px;
    padding: 10px;
    font-size: 15px;
    font-family: Helvetica;
    box-shadow: 0px 1px 5px 0px #d3d3d3;;
}
.card-img {
	display: inline;
	margin: 0 auto;
	height: 100%;
	width: auto;
}
.card-text {
	position: relative;
	float: right;
}
.profile-info {
	float: right;
}
</style>
