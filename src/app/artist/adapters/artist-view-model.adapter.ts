import {Artist} from 'src/app/shared';
import {ArtistInfoViewModel} from '../models/artist-view-model.type';
import {formatNumber} from '@angular/common';

export const getArtistInfoViewModelAdapter = (
  artist: Artist | undefined
): ArtistInfoViewModel | undefined => {
  if (!artist) return undefined;

  return {
    ...artist,
    followersCount: formatNumber(artist.followersCount, 'en-US'),
  };
};
