import { createReducer, on } from '@ngrx/store';
import {
  playing,
  muted,
  repeat,
  shuffle,
  volumeChange,
  queue,
  backTrack,
  nextTrack,
  changeCurrentTrackIndex,
  switchQueueVisibility,
} from '../actions';
import { initialState } from '../state';

export const spotifyReducer = createReducer(
  initialState,
  on(playing, (state) => ({ ...state, playing: !state.playing })),
  on(muted, (state) => ({ ...state, isMuted: !state.isMuted })),
  on(repeat, (state) => ({ ...state, repeat: !state.repeat })),
  on(shuffle, (state) => ({ ...state, shuffle: !state.shuffle })),
  on(volumeChange, (state, { volume }) => ({ ...state, volume })),
  on(queue, (state, { queue }) => ({ ...state, queue })),
  on(switchQueueVisibility, (state) => ({
    ...state,
    queueShowed: !state.queueShowed,
  })),
  on(changeCurrentTrackIndex, (state, { currentTrackIndex }) => ({
    ...state,
    currentTrackIndex,
  })),
  on(backTrack, (state) => ({
    ...state,
    currentTrackIndex: state.currentTrackIndex - 1,
  })),
  on(nextTrack, (state) => ({
    ...state,
    currentTrackIndex: state.currentTrackIndex + 1,
  }))
);
