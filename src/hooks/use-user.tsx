import { User } from "interfaces/user";
import { useState, useEffect } from "react";
import { getUserByUserId } from "services/firebase";

export default function useUser(userId: string) {
  const [activeUser, setActiveUser] = useState({} as User);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    };

    if (userId) getUserObjByUserId();
  }, [userId]);

  return { user: activeUser };
}
