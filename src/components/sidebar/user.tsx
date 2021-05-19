/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import AssetsContext from "context/assets";
import Img from "components/img";

interface Props {
  fullName: string;
  username: string;
}

export default function User({ username, fullName }: Props) {
  const { images, getAvatar } = useContext(AssetsContext);

  useEffect(() => {
    if (username) {
      getAvatar(username);
    }
  }, []);

  return !username || !fullName ? (
    <Skeleton height={61} />
  ) : (
    <Link
      to={`/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <Img
          className="rounded-full w-16 flex mr-3"
          src={images[`${username}.jpg`]}
          alt="Avatar"
          skeletonSize={{ width: 61, height: 61 }}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}
