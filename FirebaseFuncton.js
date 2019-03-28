// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Get the `FieldValue` object
//var FieldValue = admin.FieldValue;
var FieldValue = require("firebase-admin").firestore.FieldValue;

/* // Create a document reference
var docRef = db.collection('objects').doc('some-id');

// Update the timestamp field with the value from the server
var updateTimestamp = docRef.update({
    timestamp: FieldValue.serverTimestamp()
}); */

exports.addUserToDb = functions.auth.user().onCreate(user => {
	console.log("New Registration!");

	const email = user.email; // The email of the user.
	const displayName = user.displayName; // The display name of the user. String or Null
	const uid = user.uid;

	admin.initializeApp(functions.config().firebase);

	const db = admin.firestore();

	var NewData = db
		.collection("users")
		.doc(uid)
		.set({
			email: email,
			name: displayName,
			userId: null,
			walletId: null,
			followers: 0,
			profilePhotoHash: null,
			verified: false,
			timestamp: FieldValue.serverTimestamp()
		}); //returns promise | TODO : handle the promise

	/* var updateTimestamp = db.collection("users").doc(uid).update({
        timestamp: FieldValue.serverTimestamp()
    }); */
});
