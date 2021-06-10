import { Photo } from "interfaces/post";
import { User } from "interfaces/user";
import { useEffect, useReducer } from "react";
import { getUserPhotosByUserId } from "services/firebase";
import Header from "./header";
import Photos from "./photos";

interface InitialStateProps {
  profile: User;
  photosCollection?: Photo[];
  followerCount: number;
  followingCount: number;
}

interface Props {
  user: User;
}

const reducer = (
  state: InitialStateProps,
  newState: Partial<InitialStateProps>
) => ({
  ...state,
  ...newState,
});
const initialState: InitialStateProps = {
  followerCount: 0,
  followingCount: 0,
  profile: {} as User,
};

export default function UserProfile({ user }: Props) {
  const [
    { profile, photosCollection, followerCount, followingCount },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUserData = async () => {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
        followingCount: user.following.length,
      });
    };
    if (user.userId) getUserData();
  }, [user]);

  return (
    <div>
      <Header
        profile={profile}
        followerCount={followerCount}
        followingCount={followingCount}
        photosCount={photosCollection?.length}
        setFollowerCount={(followerCount: number) =>
          dispatch({ followerCount })
        }
      />
      <Photos photos={photosCollection} />
    </div>
  );
}
