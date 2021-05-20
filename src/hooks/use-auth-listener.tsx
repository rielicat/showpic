import { useState, useEffect, useContext } from "react";
import FirebaseContext from "context/firebase";
import Firebase from "firebase";

export default function useAuthListener(): { user: Firebase.User } {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser") || "{}")
  );
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser({});
      }
    });

    return () => listener();
  }, [auth]);

  return { user };
}
