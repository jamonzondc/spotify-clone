import { Track } from 'src/app/shared';

export type AlbumViewModel = {
  id: string;
  name: string;
  artists: string;
  image: string;
  info: string;
  tracks: Track[];
};
