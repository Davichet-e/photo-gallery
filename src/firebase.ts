import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgoEfYiGpHfeuEIpOaC0jrvKG2opfdkek",
  authDomain: "photos-sea.firebaseapp.com",
  databaseURL: "https://photos-sea.firebaseio.com",
  projectId: "photos-sea",
  storageBucket: "photos-sea.appspot.com",
  messagingSenderId: "891308346281",
  appId: "1:891308346281:web:59253463503762ed25d2b8"
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();
