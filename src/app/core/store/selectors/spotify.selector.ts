import { createSelector } from '@ngrx/store';
import { Track } from 'src/app/shared/entities/track.type';
import { SpotifyState } from '../index';

export const currentTrackIndexSelector = createSelector(
  (state: { spotify: SpotifyState }) => state.spotify,
  (spotify: SpotifyState): number => spotify.currentTrackIndex
);

export const currentTrackSelector = createSelector(
  (state: { spotify: SpotifyState }) => state.spotify,
  (spotify: SpotifyState): Track | undefined => {
    return spotify.currentTrackIndex >= 0 &&
      spotify.currentTrackIndex <= spotify.queue.length - 1
      ? spotify.queue[spotify.currentTrackIndex]
      : undefined;
  }
);

export const queueSelector = createSelector(
  (state: { spotify: SpotifyState }) => state.spotify,
  (spotify: SpotifyState): Track[] => spotify.queue
);

export const volumeChangeSelector = createSelector(
  (state: { spotify: SpotifyState }) => state.spotify,
  (spotify: SpotifyState): number => spotify.volume
);

export const queueShowedSelector = createSelector(
  (state: { spotify: SpotifyState }) => state.spotify,
  (spotify: SpotifyState): boolean => spotify.queueShowed
);

export const isPlaying = createSelector(
  (state: { spotify: SpotifyState }) => state.spotify,
  (spotify: SpotifyState): boolean => spotify.playing
);
