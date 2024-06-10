import { Track } from 'src/app/shared/entities/track.type';
import {Image} from "../entities";
export const getTracksResponseAdapter = (tracks: any[], images: Image[]=[]): Track[] => {
  if (!tracks || !Array.isArray(tracks)) return [];

  return tracks.map(
    (item: any): Track => ({
      id: item.id,
      name: item.name,
      artists: item.artists,
      duration: item.duration_ms,
      previewUrl: item.preview_url,
      images: item.images || images,
    })
  );
};
