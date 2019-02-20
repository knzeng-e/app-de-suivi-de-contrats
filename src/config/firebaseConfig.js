import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//Initialize firebase

var config = {
    apiKey: "", //YOUR API_KEY HERE
    authDomain: "sage-papel-suivi-de-contrats.firebaseapp.com",
    databaseURL: "https://sage-papel-suivi-de-contrats.firebaseio.com",
    projectId: "sage-papel-suivi-de-contrats",
    storageBucket: "sage-papel-suivi-de-contrats.appspot.com",
    messagingSenderId: "494365980569"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({});

  //  firebase.firestore().settings({timestampsInSnapshots: true });

  export default firebase;