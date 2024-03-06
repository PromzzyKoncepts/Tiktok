// i created this file to contain all type declarations

export interface MenuitemTypes {
  iconString: string;
  colorString: string;
  sizeString: string;
}

export interface RandomUsers {
    name: string,
    username: string,
    id: string,
    image: string,
    verified: boolean
}

export interface MenuItemFollowCompTypes {
    user: RandomUsers

}
