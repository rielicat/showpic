export interface Photo {
  caption: string;
  imageSrc: string;
  userId: string;
  userLatitude: string;
  userLongitude: string;
  photoId: number;
  docId: string;
  dateCreated: number;
  username: string;
  likes: string[];
  userLikedPhoto: boolean;
  comments: Comment[]
}

export interface Comment {
  comment: string;
  displayName: string;
}
