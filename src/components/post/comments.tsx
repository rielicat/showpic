import { MutableRefObject, useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { Comment } from "interfaces/post";
import AddComment from "./add-comment";

interface Props {
  docId: string;
  comments: Comment[];
  posted: number;
  commentInput: MutableRefObject<HTMLInputElement | null>;
}

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}: Props) {
  const [comments, setComments] = useState(allComments);
  const [show, setShow] = useState(3);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length > show && (
          <p
            className="text-sm text-gray-base mb-1 font-semibold cursor-pointer"
            onClick={() => setShow(comments.length)}
          >
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(comments.length - show, comments.length).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase font-semibold text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}
