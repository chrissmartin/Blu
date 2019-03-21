exports.addUserToDb = functions.auth.user().onCreate((user) => {
    // ...
    console.log("New Registration!");

    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user. String or Null
    const uid = user.uid;


    const functions = require('firebase-functions');
    const admin = require('firebase-admin');
    admin.initializeApp(functions.config().firebase);

    const db = admin.firestore();

db.collection("users").doc(uid).set({
    email: email
}) //returns promise | TODO : handle the promise
  });