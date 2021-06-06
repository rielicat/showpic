import "./wdyr";

import React from "react";
import ReactDOM from "react-dom";
import App from "app";
import FirebaseContext from "context/firebase";
import { firestore, auth, storage, FieldValue } from "lib/firebase";

import "styles/app.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firestore, auth, storage, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
