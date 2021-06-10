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
          : photos.map(({ docId, photoId, caption, likes, comments }) => (
              <div key={docId} className="relative group">
                <Img
                  skeletonSize={{ height: "36vw" }}
                  skeletonStyle={{ maxHeight: 400 }}
                  src={images[`${photoId}.jpg`]}
                  alt={caption}
                />
                <p className="hidden cursor-pointer absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex">
                  <p className="flex select-none items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 mr-4"
                      fill={"none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {likes.length}
                  </p>
                  <p className="flex select-none items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 mr-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {comments.length}
                  </p>
                </p>
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
