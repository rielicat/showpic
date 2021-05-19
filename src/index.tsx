import "./wdyr";

import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import FirebaseContext from "context/firebase";
import { firestore, auth, storage } from "lib/firebase";

import "styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firestore, auth, storage }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
