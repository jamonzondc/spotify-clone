import { Artist } from '../entities/artist.type';

export function getArtistViewModelAdapter(artists: Artist[]): string {
  if (!artists || artists.length === 0) return '?';

  return artists.reduce(
    (previousValue: string, currentValue: { name: string }): string => {
      if (!previousValue) return `${currentValue.name}`;
      return `${previousValue}, ${currentValue.name}`;
    },
    ''
  );
}
