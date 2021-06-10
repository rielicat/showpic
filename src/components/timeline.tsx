import PostContext from "context/post";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import Post from "./post";

export default function Timeline() {
  const { photos } = useContext(PostContext);

  return (
    <div className="container lg:col-span-2 max-w-2xl">
      {!photos ? (
        <Skeleton count={4} height={400} className="mb-16" />
      ) : (
        photos.map((photo) => <Post key={photo.docId} photo={photo} />)
      )}
      {photos?.length === 0 && (
        <div className="text-center text-2xl">Follow users to see photos!</div>
      )}
    </div>
  );
}
