import { Track } from 'src/app/shared';

export type AlbumViewData = {
  id: string;
  type: string;
  name: string;
  description: string;
  artists: string;
  image: string;
  info: string;
  tracks: Track[];
};
