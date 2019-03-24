
<template>
    <div id="profile">
     <!-- Profile info --> 
     <div class="profile-card">
      <b-card>
        <div class="image-cropper">
        <b-card-img src="https://placekitten.com/480/210" alt="Profile image" img-left class="mx-auto"/>
        </div>
        <b-card-text class="mx-auto profile-info">
          <p>User Address : {{this.$root.$data.currentAccount}}</p>
          <p>Bio</p>
          <p>Username : </p>
          <p>No of posts: </p>
          <p>Following: </p>
          <p>User image</p>
        </b-card-text>
      </b-card>
     </div>    
     
    </div>
</template>

<script>

export default { 
  name: 'profile',
}; 

var user = firebase.auth().currentUser;
var name, email, imgUrl, userId, verified,walletId,followers;

if (user != null) {
  name = user.displayName;
  email = user.email;
  imgUrl = "https://ipfs.io/ipfs/"+user.profilePhotoHash;
  verified = user.verified;
  walletId = user.walletId;
  followers = user.followers;

  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}

</script>

<style>

.profile-card{
  z-index:2;
 position: relative;
 left: 0px;
 right:0px;
 margin-top: 5%;
}

.card{
  position: relative;
  margin: auto;
  max-width: 800px;
}

.image-cropper {
    width: 200px;
    height: 200px;
    position: absolute;
    overflow: hidden;
    margin-top: 20px;
    margin-left: 20px;
    border-radius: 50%;
}

.card-img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
}
.card-text{
  position: relative;
  float: right;
}
.profile-info{
  float: right;
}
</style>
