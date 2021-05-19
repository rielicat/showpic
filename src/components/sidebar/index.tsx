import UserContext from "context/user";
import useUser from "hooks/use-user";
import { useContext } from "react";
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar() {
  const { user } = useContext(UserContext);
  const {
    user: { username, fullName, userId, docId, following },
  } = useUser(user?.uid);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} docId={docId} following={following} />
    </div>
  );
}
