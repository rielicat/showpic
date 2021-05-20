import UserContext from "context/user";
import { useState, useContext } from "react";
import { likePhoto } from "services/firebase";

interface Props {
  docId: string;
  likes: string[];
  isLiked: boolean;
  handleFocus: () => void;
}
export default function Actions({ docId, likes, isLiked, handleFocus }: Props) {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  const [toggleLiked, setToggleLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [loadingLike, setLoadingLike] = useState(false);

  const handleToggleLiked = async () => {
    setLoadingLike(true);
    const result = await likePhoto(docId, userId, toggleLiked);

    setToggleLiked(result);
    setLikeCount(toggleLiked ? likeCount - 1 : likeCount + 1);

    setLoadingLike(false);
  };

  return (
    <>
      <div className="flex justify-between px-4 pt-4 pb-1">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 select-none cursor-pointer ${
              loadingLike && "opacity-20"
            } ${
              toggleLiked ? "text-red-primary fill-red" : "text-black-light"
            }`}
            fill={"none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleToggleLiked}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 ml-3 text-black-light select-none cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleFocus}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 ml-3 text-black-light select-none cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-black-light select-none cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold text-black-light text-sm">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </p>
      </div>
    </>
  );
}
