import UserContext from "context/user";
import { Comment } from "interfaces/post";
import { useState, useContext, MutableRefObject, FormEvent } from "react";
import { postComment } from "services/firebase";

interface Props {
  docId: string;
  comments: Comment[];
  setComments: Function;
  commentInput: MutableRefObject<HTMLInputElement | null>;
}

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}: Props) {
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPosting(true);
    const c = {
      comment,
      displayName: displayName || "",
    };
    const result = await postComment(docId, c);
    if (result) {
      setComment("");
      setComments([...comments, c]);
    }
    setPosting(false);
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length > 0 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          ref={commentInput}
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            (!comment || posting) && "opacity-25"
          }`}
          type="submit"
          disabled={!comment || posting}
        >
          Post
        </button>
      </form>
    </div>
  );
}
