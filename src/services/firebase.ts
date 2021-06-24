import { Photo } from "interfaces/post";
import { User } from "interfaces/user";
import { storage, firestore, FieldValue } from "lib/firebase";

/**
 * Check if username exists in collection "users"
 * @param username Username to check if exists
 * @returns true if username exists
 */
export const doesUsernameExist = async (username: string): Promise<boolean> => {
  return (
    (
      await firestore
        .collection("users")
        .where("username", "==", username)
        .get()
    ).docs.length > 0
  );
};

/**
 * This function recieves an array of strings as relative paths for creating an array of objects
 * of any key and its value as an URL
 *
 * @param paths Array of strings that indicate the name of the image as relative paths
 * @param setter Setter hook for updating the images
 * @param data data for updating the images
 * @param root optional value for root path, default is images/public
 *
 * @returns Returns false if images already loaded
 */
export const fetchImages = async (
  paths: string[],
  data: { [K in string]?: string },
  setter: Function,
  root?: string
): Promise<boolean> => {
  for (const path of paths) {
    if (!data[path]) {
      try {
        data[path] = await storage
          .ref(`/${root || "images/public"}/${path}`)
          .getDownloadURL();
      } catch (e) {
        console.error(e);
      }
      setter({ ...data });
    }
  }

  return false;
};

/**
 *
 * @param userId user id firebase auth
 * @returns returns document where userId matchs user's uid
 */
export const getUserByUserId = async (userId: string) => {
  return (
    await firestore.collection("users").where("userId", "==", userId).get()
  ).docs.map((item) => ({ ...item.data(), docId: item.id } as User))[0];
};

/**
 *
 * @param username user id firebase auth
 * @returns returns document where userId matchs user's uid
 */
export const getUserByUsername = async (username: string) => {
  return (
    await firestore.collection("users").where("username", "==", username).get()
  ).docs.map((item) => ({ ...item.data(), docId: item.id } as User))[0];
};

/**
 *
 * @param userId User's ID
 * @returns List of Photo objects for the user specified
 */
export const getUserPhotosByUserId = async (
  userId: string
): Promise<Photo[]> => {
  return (
    await firestore.collection("photos").where("userId", "==", userId).get()
  ).docs.map((item) => ({ ...item.data(), docId: item.id } as Photo));
};

/**
 *
 * @param query Value to search user with this username
 * @returns List of users that match the specified query
 */
export const getProfilesByName = async (query: string): Promise<User[]> => {
  return (
    await firestore
      .collection("users")
      .orderBy("username")
      .startAt(query)
      .endAt(query + "\uf8ff")
      .get()
  ).docs.map((d) => ({ ...d.data(), docId: d.id } as User));
};

/**
 *
 * @param userId current user's uid from firebase auth
 * @returns return list of users what are not being followed by current user
 */
export const getSuggestedProfiles = async (userId: string) => {
  return (
    await firestore
      .collection("users")
      .limit(5)
      .where("followers", "not-in", [userId])
      .get()
  ).docs
    .map((d) => ({ ...d.data(), docId: d.id } as User))
    .filter((u) => !u.followers.includes(userId));
};

/**
 * User data to get follow props
 */
interface UpdateFollowingProps {
  doc: string;
  id: string;
  following?: string[];
}

type UpdateMethod = "arrayRemove" | "arrayUnion";

/**
 * Function that adds current user as new follower to target user.
 * Also adds target user as following by current's user
 *
 * @param current Current's user as FollowProps object
 * @param target Target user as FollowProps object
 *
 * @returns true if users sucsesfully updated, false if error was trown
 */
export const updateFollowing = async (
  current: UpdateFollowingProps,
  target: Pick<UpdateFollowingProps, "doc" | "id">
) => {
  const method: UpdateMethod = current.following?.some((f) => f === target.id)
    ? "arrayRemove"
    : "arrayUnion";

  try {
    await Promise.all([
      firestore
        .collection("users")
        .doc(current.doc)
        .update({ following: FieldValue[method](target.id) }),
      firestore
        .collection("users")
        .doc(target.doc)
        .update({ followers: FieldValue[method](current.id) }),
    ]);
    return true;
  } catch (e) {
    console.error(e.message);
  }
  return false;
};

/**
 * Get photos for timeline
 *
 * @param userId Current's user ID
 * @param following Users followed by current user
 * @returns List of photos from followed users
 */
export const getTimelinePhotos = async (
  userId: string,
  following: string[]
) => {
  return (
    await firestore.collection("photos").where("userId", "in", following).get()
  )?.docs
    .map(
      (photo) =>
        ({
          ...photo.data(),
          docId: photo.id,
          userLikedPhoto: photo.data().likes?.includes(userId),
        } as Photo)
    )
    .sort((a, b) => b.dateCreated - a.dateCreated);
};

/**
 * Like or unlike photo function
 *
 * @param docId photo document id
 * @param userId current user id
 * @param isLiked tells if photo is currently liked
 * @returns boolean value if successfully updated or current state if an error was caught
 */
export const likePhoto = async (
  docId: string,
  userId: string,
  isLiked: boolean
) => {
  const method: UpdateMethod = isLiked ? "arrayRemove" : "arrayUnion";

  try {
    await firestore
      .collection("photos")
      .doc(docId)
      .update({ likes: FieldValue[method](userId) });
    return !isLiked;
  } catch (e) {
    console.error(e.message);
  }
  return isLiked;
};

/**
 * Post comment to photo
 * @param docId Photo's doc ID
 * @param comment Comment object that has comment string and displayName
 * @returns true if updated false if an error was caught
 */
export const postComment = async (
  docId: string,
  comment: { comment: string; displayName: string }
) => {
  try {
    await firestore
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion(comment),
      });
    return true;
  } catch (e) {
    console.error(e.message);
  }
  return false;
};
