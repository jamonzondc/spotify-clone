import {Artist} from "./artist.type";
import {Image} from "./image.type";

export type Track = {
  id: string;
  images: Image[];
  artists: Artist[];
  duration: number;
  name: string;
  previewUrl: string;
  isPlaying?:boolean;
};
