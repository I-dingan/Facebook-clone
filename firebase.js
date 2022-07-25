// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/firestore'
import { getStorage } from "firebase/storage"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAza2F92EFly1TnXugmSUBHgqZithD2ffI",
  authDomain: "facebook-yt-f3545.firebaseapp.com",
  projectId: "facebook-yt-f3545",
  storageBucket: "facebook-yt-f3545.appspot.com",
  messagingSenderId: "604007103632",
  appId: "1:604007103632:web:66e8f708d7ae56639fec15"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();
const db=app.firestore()
const storage = getStorage()

export {db,storage}