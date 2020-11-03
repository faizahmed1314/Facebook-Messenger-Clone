import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1bA4gA9TJdEJJr0V8ZB6PxzZYsHydvrs",
  authDomain: "facebook-messenger-clone-d2a7e.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-d2a7e.firebaseio.com",
  projectId: "facebook-messenger-clone-d2a7e",
  storageBucket: "facebook-messenger-clone-d2a7e.appspot.com",
  messagingSenderId: "153234157192",
  appId: "1:153234157192:web:b581c2c27d2c07edfd793d",
  measurementId: "G-N8CMPRD131",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
