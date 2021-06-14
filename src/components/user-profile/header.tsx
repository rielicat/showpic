/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "interfaces/user";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import UserContext from "context/user";
import Img from "components/img";
import AssetsContext from "context/assets";
import { getUserByUserId, updateFollowing } from "services/firebase";

interface Props {
  profile: User;
  followerCount: number;
  followingCount: number;
  photosCount?: number;
  setFollowerCount: (followerCount: number) => void;
}

export default function Header({
  profile,
  followerCount,
  followingCount,
  photosCount,
  setFollowerCount,
}: Props) {
  const { user } = useContext(UserContext);
  const { images, getAvatar } = useContext(AssetsContext);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile.username) getAvatar(profile.username);
  }, [profile.username]);

  useEffect(() => {
    if (profile.followers?.some((f) => f === user.uid))
      setIsFollowingProfile(true);
    if (profile.userId === user.uid) setIsCurrentUserProfile(true);
  }, [user, profile]);

  const handleFollow = async () => {
    const currentUser = await getUserByUserId(user.uid);
    if (
      await updateFollowing(
        {
          doc: currentUser.docId,
          id: currentUser.userId,
          following: currentUser.following,
        },
        {
          doc: profile.docId,
          id: profile.userId,
        }
      )
    )
      setIsFollowingProfile(!isFollowingProfile);

    if (currentUser.following.includes(profile.userId)) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <Img
          circle
          skeletonSize={{ width: 160, height: 160 }}
          className="rounded-full h-24 w-24 sm:h-40 sm:w-40 "
          alt={`${profile.username} profile picture`}
          src={images[`${profile.username}.jpg`]}
        />
      </div>
      {!profile.userId ? (
        <Skeleton height={160} />
      ) : (
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4 text-gray-base">{profile.username}</p>
            {!isCurrentUserProfile && (
              <button
                disabled={isLoading}
                className="w-24 h-9 rounded-md border border-gray-primary border-solid"
                onClick={handleFollow}
              >
                {isFollowingProfile ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="container mt-6 flex items-center ">
            <p className="mr-8">
              <span className="font-bold">{photosCount || 0}</span> photo
              {photosCount !== 1 && "s"}
            </p>
            <p className="mr-8">
              <span className="font-bold">{followingCount}</span> following
            </p>
            <p>
              <span className="font-bold">{followerCount}</span> follower
              {followerCount !== 1 && "s"}
            </p>
          </div>
          <div className="container mt-4">
            <p className="font-medium">{profile.fullName}</p>
          </div>
        </div>
      )}
    </div>
  );
}
