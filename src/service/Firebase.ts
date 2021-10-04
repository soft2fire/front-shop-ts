import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBZ4Aw_WW5i3_kyVmV6tF8IoUqSX-n5WB4",
    authDomain: "chat-63325.firebaseapp.com",
    projectId: "chat-63325",
    storageBucket: "chat-63325.appspot.com",
    messagingSenderId: "934657337589",
    appId: "1:934657337589:web:679d28598ef72588b47dbc",
    measurementId: "G-W558Z3RX6Y"
})

// const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
}
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }