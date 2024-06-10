import {Image} from "./image.type";

export type Artist = {
  id: string;
  name: string;
  images: Image[];
  followersCount: number;
};
