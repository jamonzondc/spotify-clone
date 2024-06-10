import {Image, Track} from 'src/app/shared';
import {Card} from "../../shared/view-models/card.type";

export type ArtistInfoViewModel = {
  id: string;
  name: string;
  images: Image[];
  followersCount: string;
};

export type ArtistViewModel = {
  info: ArtistInfoViewModel | undefined;
  topTracks: Track[];
  artistAlbums: Card[];
};
