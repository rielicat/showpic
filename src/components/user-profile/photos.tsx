import { Photo } from "interfaces/post";

interface Props {
  photos: Photo[];
}

export default function Photos({ photos }: Props) {
  return <div>I'm a Photo</div>;
}
