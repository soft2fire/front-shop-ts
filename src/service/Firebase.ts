import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    firebase: {
        apiKey: "AIzaSyDP0yUmKEAjHRwN6cohjf85FoU-XFzuhj4",
        authDomain: "shoppingcart-18671.firebaseapp.com",
        projectId: "shoppingcart-18671",
        storageBucket: "shoppingcart-18671.appspot.com",
        messagingSenderId: "725595144796",
        appId: "1:725595144796:web:c92486b7ede4ab4c315c99"
    }
}

const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
}
export const auth = firebase.auth();
export default Firebase;