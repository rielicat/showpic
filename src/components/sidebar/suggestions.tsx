/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "interfaces/user";
import { useState, useEffect } from "react";
import { getSuggestedProfiles } from "services/firebase";
import SuggestedProfile from "./suggested-profile";
import Skeleton from "react-loading-skeleton";

interface Props {
  userId: string;
  docId: string;
  following: string[];
}

export default function Suggestions({ userId, docId, following }: Props) {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthSuggestions = async () => {
      try {
        setProfiles(await getSuggestedProfiles(userId));
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    if (userId) fecthSuggestions();
  }, [userId]);

  return loading ? (
    <Skeleton height={150} className="mt-5" />
  ) : (
    <div className="rounded flex- flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {error ||
          profiles.map(({ username, followers, ...rest }) => (
            <SuggestedProfile
              key={rest.docId}
              username={username}
              profileDocId={rest.docId}
              profileId={rest.userId}
              userDocId={docId}
              userId={userId}
              userFollowing={following}
            />
          ))}
      </div>
    </div>
  );
}
