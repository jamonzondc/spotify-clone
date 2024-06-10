import { Artist } from './artist.type';
import { Track } from './track.type';
import {Image} from "./image.type";

export type Album = {
  id: string;
  name: string;
  images: Image[];
  totalTracks: number;
  artists: Artist[];
  releaseDate: string;
  tracks: Track[];
};
