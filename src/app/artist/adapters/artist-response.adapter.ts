import {Artist} from 'src/app/shared';

export const getArtistResponseAdapter = (response: any): Artist | undefined => {
  if (!response) return undefined;

  return {
    id: response.id,
    name: response.name,
    images: response.images,
    followersCount: response.followers?.total || 0,
  };
};
