import { formatDate } from '@angular/common';
import {
  Album,
  CardType,
  getArtistsAdapter,
  getImageAdapter,
  Playlist,
} from 'src/app/shared';

export const albumHomeDataAdapter = (albums: Album[] | null): CardType[] => {
  if (!albums) return [];

  return albums.map((album: Album): CardType => {
    return {
      id: album.id,
      title: album.name,
      subtitle: `${formatDate(
        album.releaseDate,
        'yyyy',
        'en-US'
      )} • ${getArtistsAdapter(album.artists)}`,
      image: getImageAdapter(album.images),
    };
  });
};
export const playlistsHomeDataAdapter = (
  playlists: Playlist[] | null
): CardType[] => {
  if (!playlists) return [];

  return playlists.map((playlist: Playlist): CardType => {
    return {
      id: playlist.id,
      title: playlist.name,
      subtitle: playlist.description,
      image: playlist.images,
    };
  });
};
