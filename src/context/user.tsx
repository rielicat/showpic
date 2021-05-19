import { createContext } from "react";
import Firebase from "firebase";

export interface UserContextInterface {
  user: Firebase.User;
}

const UserContext = createContext({} as UserContextInterface);
export default UserContext;
