import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import config from 'firebase.config.json';

const firebase = !Firebase.apps.length
  ? Firebase.initializeApp(config)
  : Firebase.app();

export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const FieldValue = Firebase.firestore.FieldValue;


// eslint-disable-next-line no-restricted-globals
// if (location.hostname === "localhost") {
//   auth.useEmulator("http://localhost:9099");
//   firestore.useEmulator("localhost", 8080);
//   storage.useEmulator("localhost", 9199);
// }
