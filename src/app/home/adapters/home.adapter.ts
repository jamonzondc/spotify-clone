import {formatDate} from '@angular/common';
import {Album, getArtistViewModelAdapter, Playlist,} from 'src/app/shared';
import {Card, CardType} from "../../shared/view-models/card.type";

export const albumHomeDataAdapter = (albums: Album[] | undefined): Card[] => {
  if (!albums) return [];

  return albums.map((album: Album): Card => {
    return {
      ...album,
      title: album.name,
      type: CardType.ALBUM,
      subtitle: `${formatDate(
        album.releaseDate,
        'yyyy',
        'en-US'
      )} • ${getArtistViewModelAdapter(album.artists)}`
    };
  });
};
export const playlistsHomeDataAdapter = (
  playlists: Playlist[] | undefined
): Card[] => {
  if (!playlists) return [];

  return playlists.map((playlist: Playlist): Card => {
    return {
      ...playlist,
      title: playlist.name,
      type: CardType.PLAYLIST,
      subtitle: playlist.description,
    };
  });
};
