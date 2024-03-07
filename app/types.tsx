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
  video_url: string,
  text: string,
  created_at: string,
  profile: {
    user_id: string,
    name: string,
    username: string,
    image: string,
  };
}

export interface postMainCompTypes {
  post: PostWithProfile;
}

export interface MenuItemFollowCompTypes {
  user: RandomUsers;
}
