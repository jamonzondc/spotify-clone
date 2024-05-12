export enum DataType {
  ALBUMS = 'albums',
  PLAYLISTS = 'playlists',
  ARTISTS = 'artists',
  PODCASTS = 'podcasts',
}

export type CardType = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};
