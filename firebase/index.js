import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDPqdsbLEAWGrUcX_a63T1s49cFBvenCLs",
    authDomain: "expo-chat-28e9e.firebaseapp.com",
    databaseURL: "https://expo-chat-28e9e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expo-chat-28e9e",
    storageBucket: "expo-chat-28e9e.appspot.com",
    messagingSenderId: "462193908692",
    appId: "1:462193908692:web:0baef99522ba813fa15441",
    measurementId: "G-M2P47BGYFB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth, firebase as default };
