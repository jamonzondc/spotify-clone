import {
  Album,
  Track,
  getArtistsAdapter,
  getImageAdapter,
} from 'src/app/shared';
import { AlbumViewData } from '../models/album.type';
import { formatDate } from '@angular/common';

export const albumViewDataAdapter = (
  album: Album | null
): AlbumViewData | null => {
  if (!album) return null;
  return {
    id: album.id,
    type: 'Album',
    name: album.name,
    description: '',
    artists: getArtistsAdapter(album.artists),
    image: getImageAdapter(album.images),
    info: getInfo(album),
    tracks: album.tracks,
  };
};

const getInfo = (album: Album): string => {
  return `${formatDate(album.releaseDate, 'yyyy', 'en-US')} • ${
    album.totalTracks
  } canciones`;
};
