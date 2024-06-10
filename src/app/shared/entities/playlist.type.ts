import { Track } from './track.type';
import {Image} from "./image.type";

export type Playlist = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  tracks: Track[];
};
