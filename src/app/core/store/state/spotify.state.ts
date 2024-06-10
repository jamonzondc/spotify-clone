import { Track } from 'src/app/shared/entities';

export type SpotifyState = {
  queueShowed: boolean;
  queue: Track[];
  playing: boolean;
  currentTrackIndex: number;

  volume: number;
  isMuted: boolean;
  repeat: boolean;
  shuffle: boolean;
};

export const initialState: SpotifyState = {
  queueShowed: true,
  queue: [],
  playing: false,
  currentTrackIndex: -1,
  volume: 0.5,
  isMuted: false,
  repeat: false,
  shuffle: false,
};
