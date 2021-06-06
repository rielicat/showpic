/* eslint-disable react-hooks/exhaustive-deps */
import Img from "components/img";
import AssetsContext from "context/assets";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  username: string;
}

export default function Header({ username }: Props) {
  const { images, getAvatar } = useContext(AssetsContext);

  useEffect(() => {
    if (username) getAvatar(username);
  }, [username]);


  return (
    <div className="w-full h-12 flex flex-row justify-between items-center">
      <div className="flex items-center ml-2">
        <Img
          circle
          className="mr-3 flex rounded-full w-8"
          src={images[`${username}.jpg`]}
          alt=""
          skeletonSize={{ width: 32, height: 32 }}
        />
        <Link to={`/p/${username}`}>
          <p className="text-sm font-bold cursor-pointer">{username}</p>
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-black-light cursor-pointer mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </div>
  );
}
