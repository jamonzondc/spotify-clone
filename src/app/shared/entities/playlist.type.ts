import { Track } from './track.type';

export type Playlist = {
  id: string;
  name: string;
  description: string;
  images: string;
  tracks: Track[];
};
