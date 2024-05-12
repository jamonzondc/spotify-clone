import { Album } from 'src/app/shared/entities/album-response.type';
import { Track } from 'src/app/shared/entities/track.type';
import { getImageAdapter } from './image.adapter';

export const getAlbumsResponseAdapter = (response: any): Album[] => {
  if (
    !response ||
    !response.albums ||
    !response.albums.items ||
    !Array.isArray(response.albums.items)
  )
    return [];
  return response.albums.items.map((item: any): Album => {
    return {
      id: item.id,
      name: item.name,
      images: item.images,
      artists: item.artists,
      releaseDate: item.release_date,
      totalTracks: item.total_tracks,
      tracks: [],
    };
  });
};

export const getAlbumResponseAdapter = (response: any): Album | null => {
  if (!response) return null;

  return {
    id: response.id,
    name: response.name,
    images: response.images,
    artists: response.artists,
    releaseDate: response.release_date,
    totalTracks: response.total_tracks,
    tracks: getAlbumTracksAdapter(
      response.tracks.items,
      getImageAdapter(response.images, 2)
    ),
  };
};

const getAlbumTracksAdapter = (tracks: any[], image: string): Track[] => {
  if (!tracks || !Array.isArray(tracks)) return [];

  return tracks.map(
    (item: any): Track => ({
      id: item.id,
      artists: item.artists,
      duration: item.duration_ms,
      name: item.name,
      previewUrl: item.preview_url,
      image,
    })
  );
};
