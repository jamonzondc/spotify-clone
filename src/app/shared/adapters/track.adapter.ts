import { Track } from 'src/app/shared/entities/track.type';

export const getTracksResponseAdapter = (tracks: any[]): Track[] => {
  if (!tracks || !Array.isArray(tracks)) return [];
  return tracks.map(
    (item: any): Track => ({
      id: item.track.id,
      artists: item.track.artists,
      duration: item.track.duration_ms,
      name: item.track.name,
      previewUrl: item.track.preview_url,
    })
  );
};
