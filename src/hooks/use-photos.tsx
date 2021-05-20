/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import UserContext from "context/user";
import { getUserByUserId, getTimelinePhotos } from "services/firebase";
import { Photo } from "interfaces/post";

export default function usePhotos() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    const fecthData = async () => {
      const user = await getUserByUserId(userId);

      if (user?.following?.length > 0) {
        setPhotos(await getTimelinePhotos(userId, user.following));
      }
    };

    if (userId) fecthData();
  }, [userId]);

  return { photos };
}
