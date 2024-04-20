// i created this file to contain all type declarations

export interface MenuitemTypes {
  iconString: string;
  colorString: string;
  sizeString: string;
}

export interface RandomUsers {
  name: string;
  username: string;
  id: string;
  image: string;
  verified: boolean;
}

export interface CropperImageTypes {
  width?: number | null;
  height?: number | null;
  left?: number | null;
  top?: number | null;
}

export interface showErrorObject {
  type: string;
  message: string;
}

// ///////////////////////////
// COMPONENT TYPES

export interface PostWithProfile {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string;
  profile: {
    user_id: string;
    name: string;
    username: string;
    image: string;
  };
}

export interface formatNumber {
  num: number;
  precision: number;
}

export interface CommentsHeaderCompTypes {
  post: PostWithProfile;
  params: {
    userId: string;
    postId: string;
  };
}

export interface CommentsCompTypes {
  params: {
    userId: string;
    postId: string;
  };
}

export interface SingleCommentCompTypes {
  comment: CommentWithProfile,
  params: {
    userId: string;
    postId: string;
  };
}

export interface postMainCompTypes {
  post: PostWithProfile;
}

export interface postMainLikesCompTypes {
  post: PostWithProfile;
}

export interface Post {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  views: number;
  created_at: string;
}

export CommentWithProfile {
  
}
export interface Like {
  id: string;
  user_id: string;
  post_id: string;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
}

export interface MenuItemFollowCompTypes {
  user: RandomUsers;
}

export interface UploadError {
  type: string;
  message: string;
}

export interface profilePageCompTypes {
  params: { id: string };
}

export interface postPageTypes {
  params: {
    userId: string;
    postId: string;
  };
}

export interface PostUserCompTypes {
  post: Post;
}

export interface TextInputCompTypes {
  string: string;
  error: string;
  placeholder: string;
  onUpdate: (newValue: string) => void;
  inputType: string;
}
