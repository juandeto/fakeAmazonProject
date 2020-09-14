import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyA79WAOZcjV8YU6X8qVjTXfhukLd8qgPGI",
    authDomain: "clone-42355.firebaseapp.com",
    databaseURL: "https://clone-42355.firebaseio.com",
    projectId: "clone-42355",
    storageBucket: "clone-42355.appspot.com",
    messagingSenderId: "967447635631",
    appId: "1:967447635631:web:6f8542d99137f95a93565a"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db= firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth };

