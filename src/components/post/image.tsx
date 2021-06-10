/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import Img from "components/img";
import AssetsContext from "context/assets";

interface Props {
  photoId: number;
}

export default function Image({ photoId }: Props) {
  const { images, addPaths } = useContext(AssetsContext);

  useEffect(() => {
    addPaths([`${photoId}.jpg`], "/images/posts");
  }, [photoId]);

  return (
    <div>
      <Img
        className="flex w-full align-center justify-center"
        skeletonSize={{ height: 400 }}
        src={images[`${photoId}.jpg`]}
        alt={`Photo id ${photoId}`}
      />
    </div>
  );
}
