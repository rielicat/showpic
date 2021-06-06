/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "interfaces/user";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "services/firebase";
import UserProfile from "components/user-profile";

import * as ROUTES from "constants/routes";
import Header from "components/header";

export default function Profile() {
  const { push } = useHistory();
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user) {
        setUser(user);
      } else {
        push(ROUTES.NOT_FOUND);
      }
    };
    checkUserExists();
  }, [username]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  );
}
