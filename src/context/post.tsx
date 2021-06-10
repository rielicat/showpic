import { createContext } from "react";
import { Photo } from "interfaces/post";

export interface PostContextInterface {
  photos: Photo[] | null;
  setUpdate: (arg: boolean) => void;
}

const PostContext = createContext({} as PostContextInterface);
export default PostContext;
