import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyBClBk0oflBz2SqwwGGe7SYFP3QIOdrBVA",
    authDomain: "react-slack-clone-54a1e.firebaseapp.com",
    databaseURL: "https://react-slack-clone-54a1e.firebaseio.com",
    projectId: "react-slack-clone-54a1e",
    storageBucket: "react-slack-clone-54a1e.appspot.com",
    messagingSenderId: "1089012453659"
  };
  firebase.initializeApp(config);

  export default firebase;