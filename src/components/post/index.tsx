import { Photo } from "interfaces/post";
import { useRef } from "react";
import Actions from "./actions";
import Comments from "./comments";
import Footer from "./footer";
import Header from "./header";
import Image from "./image";

interface Props {
  photo: Photo;
}

export default function Post({ photo }: Props) {
  const commentInput = useRef<null | HTMLInputElement>(null);
  const handleFocus = () => commentInput.current?.focus();

  return (
    <div className="mb-16 flex flex-col border border-gray-primary bg-white rounded">
      <Header username={photo.username} />
      <Image photoId={photo.photoId} />
      <Actions
        docId={photo.docId}
        likes={photo.likes}
        isLiked={photo.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={photo.caption} username={photo.username} />
      <Comments docId={photo.docId} comments={photo.comments} posted={photo.dateCreated} commentInput={commentInput} />
    </div>
  );
}
