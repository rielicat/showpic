import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCVbPlNwNM1_yckX23wmrOsj57nE6DMkMY",
  authDomain: "instagram-a76bb.firebaseapp.com",
  projectId: "instagram-a76bb",
  storageBucket: "instagram-a76bb.appspot.com",
  messagingSenderId: "806136304477",
  appId: "1:806136304477:web:d1ce46392eafc275944eb4",
};

const firebase = !Firebase.apps.length
  ? Firebase.initializeApp(config)
  : Firebase.app();

export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const FieldValue = Firebase.firestore.FieldValue;

// eslint-disable-next-line no-restricted-globals
if (location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
  firestore.useEmulator("localhost", 9098);
  storage.useEmulator("localhost", 9199);
}
