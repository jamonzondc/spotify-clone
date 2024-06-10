import { Playlist } from 'src/app/shared/entities/playlist.type';
import { getTracksResponseAdapter } from './track-response.adapter';
export const getPlaylistResponseAdapter = (response: any): Playlist | undefined => {
  if (!response) return undefined;

  return {
    id: response.id,
    name: response.name,
    description: response.description,
    images: response.images,
    tracks: getTracksResponseAdapter(response?.tracks?.items),
  };
};
export const getPlaylistsResponseAdapter = (response: any): Playlist[] => {
  if (
    !response ||
    !response.playlists ||
    !response.playlists.items ||
    !Array.isArray(response.playlists.items)
  )
    return [];
  return response.playlists.items.map((item: any): Playlist => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      images: item.images,
      tracks: [],
    };
  });
};
