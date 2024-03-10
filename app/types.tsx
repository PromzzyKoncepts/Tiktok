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
  num: number,
  precision: number
}


export interface postMainCompTypes {
  post: PostWithProfile;
}

export interface postMainLikesCompTypes {
  post: PostWithProfile;
}

export interface Like {
  id:string,
  user_id: string,
  post_id: string,
}

export interface Comment {
  id:string,
  user_id: string,
  post_id: string,
  text: string,
  created_at: string
}


export interface MenuItemFollowCompTypes {
  user: RandomUsers;
}
