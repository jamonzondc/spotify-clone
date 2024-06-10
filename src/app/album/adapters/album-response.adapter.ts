import {Album} from 'src/app/shared/entities/album.type';
import {getTracksResponseAdapter} from "../../shared/adapters/track-response.adapter";

export const getAlbumsResponseAdapter = (albums: any[]): Album[] => {
  if (
    !albums ||
    !Array.isArray(albums)
  )
    return [];
  return albums.map((item: any): Album => {
    return getAlbumResponseAdapter(item)!;
  });
};

export const getAlbumResponseAdapter = (response: any): Album | undefined => {
  if (!response) return undefined;

  return {
    id: response.id,
    name: response.name,
    images: response.images,
    artists: response.artists,
    releaseDate: response.release_date,
    totalTracks: response.total_tracks,
    tracks: getTracksResponseAdapter(
      response.tracks?.items,
      response.images //2
    ),
  };
};


