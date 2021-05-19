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
  ).docs.map((item) => ({ ...item.data(), docId: item.id } as User));
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
      .where("userId", "!=", userId)
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
  followers?: string[];
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
  target: UpdateFollowingProps
) => {
  const isFollowing: UpdateMethod = current.following?.some((f) =>
    target.followers?.includes(f)
  )
    ? "arrayRemove"
    : "arrayUnion";

  try {
    await Promise.all([
      firestore
        .collection("users")
        .doc(current.doc)
        .update({ following: FieldValue[isFollowing](target.id) }),
      firestore
        .collection("users")
        .doc(target.doc)
        .update({ followers: FieldValue[isFollowing](current.id) }),
    ]);
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
};
