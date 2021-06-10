/* eslint-disable react-hooks/exhaustive-deps */
import Img from "components/img";
import AssetsContext from "context/assets";
import { Photo } from "interfaces/post";
import { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  photos?: Photo[];
}

export default function Photos({ photos }: Props) {
  const { images, addPaths } = useContext(AssetsContext);

  useEffect(() => {
    if (photos)
      for (const photo of photos)
        addPaths([`${photo.photoId}.jpg`], "/images/posts");
  }, [photos]);

  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos
          ? [1, 2, 3, 4, 5, 6].map((_, index) => (
              <Skeleton
                key={`loading-photo-${index}`}
                height="36vw"
                style={{ maxHeight: 400 }}
              />
            ))
          : photos.map(({ docId, photoId, caption }) => (
              <div key={docId} className="relative group">
                <Img
                  skeletonSize={{ height: "36vw" }}
                  skeletonStyle={{ maxHeight: 400 }}
                  src={images[`${photoId}.jpg`]}
                  alt={caption}
                />
              </div>
            ))}
      </div>
      {photos?.length === 0 && (
        <div className="text-center font-semibold text-gray-base">
          No photos has been uploaded!
        </div>
      )}
    </div>
  );
}
