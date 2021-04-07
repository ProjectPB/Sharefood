import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAbXKWoTUBgxPUFFYc-W1dnBrKDopkkBH0",
    authDomain: "pb-sharefood.firebaseapp.com",
    projectId: "pb-sharefood",
    storageBucket: "pb-sharefood.appspot.com",
    messagingSenderId: "11246395766",
    appId: "1:11246395766:web:1f058f5b535ec9dfbb9a57",
    measurementId: "G-Q4959M5BS5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
