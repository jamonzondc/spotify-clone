import { Artist } from './artist.type';
import { Track } from './track.type';

export type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  totalTracks: number;
  artists: Artist[];
  releaseDate: string;
  tracks: Track[];
};
