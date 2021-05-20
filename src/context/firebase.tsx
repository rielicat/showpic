import { createContext } from "react";
import Firebase from "firebase";

export interface FirebaseContextInterface {
  auth: Firebase.auth.Auth;
  firestore: Firebase.firestore.Firestore;
  storage: Firebase.storage.Storage;
  FieldValue: typeof Firebase.firestore.FieldValue;
}

const FirebaseContext = createContext({} as FirebaseContextInterface);
export default FirebaseContext;
