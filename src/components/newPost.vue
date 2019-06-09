<template>
	<!-- Upload Interface -->

	<div id="newPost">
		<b-button v-b-modal.upload-modal class="up-btn">
			<p class="plus">+</p>
		</b-button>
		<b-modal ref="upload_modal1" hide-footer centered id="upload-modal" title="New Post">
			<transition name="fade">
				<div id="upload">
					<div v-if="this.$root.$data.loading === false">
						<!-- Form for file choose, caption text and submission -->
						<form class="margin-sm" @submit.stop.prevent="handleSubmit">
							<div class="border-style">
								<b-form-file accept="image/jpeg, image/png, image/gif" plain @change="captureFile"/>
							</div>
							<b-form-textarea
								v-model="caption"
								placeholder="Post description"
								:rows="3"
								:max-rows="6"
								class="margin-xs"
							/>
							<b-button class="margin-xs" variant="secondary" @click="handleOk">Upload</b-button>
						</form>
					</div>
					<div v-if="this.$root.$data.loading === true" style="margin-top: 10%; margin-bottom: 5%">
						<img class="upload-load" src="../assets/giphy.gif">
					</div>
				</div>
			</transition>
		</b-modal>
	</div>
</template>

<script>

import ipfs from '../contracts/ipfs';

export default {
	name: "newPost",
	// data variables
	data() {
		return {
			show: false,
			buffer: "",
			caption: "",
			transactionHash: ""
		};
	},
	methods: {
		hideModal() {
			console.log("close1");
			this.$refs.upload_modal1.hide();
			console.log("close");
		},
		/* used to catch chosen image &
		 * convert it to ArrayBuffer.
		 */
		captureFile(file) {
			const reader = new FileReader();
			if (typeof file !== "undefined") {
				reader.readAsArrayBuffer(file.target.files[0]);
				reader.onloadend = async () => {
					this.buffer = await this.convertToBuffer(reader.result);
				};
			} else this.buffer = "";
		},
		/**
		 * converts ArrayBuffer to
		 * Buffer for IPFS upload.
		 */
		async convertToBuffer(reader) {
			return Buffer.from(reader);
		},
		/**
		 * submits buffered image & text to IPFS
		 * and retrieves the hashes, then store
		 * it in the Contract via sendHash().
		 */
		onSubmit() {
			this.$root.loading = true;
			let imgHash;
			ipfs
				.add(this.buffer)
				.then(hashedImg => {
					imgHash = hashedImg[0].hash;
					return this.convertToBuffer(this.caption);
				})
				.then(bufferDesc =>
					ipfs.add(bufferDesc).then(hashedText => hashedText[0].hash)
				)
				.then(textHash => {
					this.$root.contract.methods
						.sendHash(imgHash, textHash)
						.send(
							{ from: this.$root.currentAccount },
							(error, transactionHash) => {
								console.log("ERROR: " + error);
								console.log("THASH: " + transactionHash);
								if (error == null) {
									this.$root.getPosts().then(() => {
										//wait for the new posts

										console.log("Done feching new post");

										this.$root.$data.loading = false; //Stop the loading animation
										this.$refs.upload_modal1.hide(); //Hide the Model

										this.$router.go(0); //refresh page || TODO -> update only component
									});
								}
							}
						);
				});
		},
		/**
		 * validates if image & captions
		 * are filled before submission.
		 */
		handleOk() {
			if (!this.buffer || !this.caption) {
				alert("Please fill in the information.");
			} else {
				this.onSubmit();
			}
		}
	}
};
</script>

<style scoped>

.modal-content{
  border:  none;
}

#newPost {
	margin: auto;
}

.home-load {
	width: 50px;
	height: 50px;
}

#upload {
	font-family: Helvetica, sans-serif, Arial;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-bottom: 5%;
}
.up-btn {
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background: #00abe7;
	position: fixed;
	bottom: 30px;
	right: 30px;
	cursor: pointer;
	border: 0px;
	box-shadow: 0px 13px 13px rgba(0, 0, 0, 0.16);
}

.up-btn:active {
	outline: 0;
}
button:focus {
	outline: 0;
}
.plus {
	color: white;
	top: 0;
	display: block;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;
	padding: 0;
	margin: 0;
	line-height: 55px;
	font-size: 38px;
	font-family: Helvetica, sans-serif, Arial;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: 300;
	animation: plus-out 0.3s;
	transition: all 0.3s;
	outline: none;
}

.up-btn:hover .plus:hover {
	animation: plus-in 0.15s linear;
	animation-fill-mode: forwards;
}

.up-btn:hover {
	background: #00abe7;
	text-decoration: none;
	text-align: center;
}

.upload-load {
	width: 50px;
	height: 50px;
}
</style>
