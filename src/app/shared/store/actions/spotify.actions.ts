import { createAction, props } from '@ngrx/store';
import { Track } from 'src/app/shared/entities/track.type';

export const switchQueueVisibility = createAction('Switch playlist showed');
export const playing = createAction('Playing');
export const muted = createAction('Muted');
export const repeat = createAction('Repeat');
export const shuffle = createAction('Suffle');
export const volumeChange = createAction(
  'Volumen change',
  props<{ volume: number }>()
);
export const queue = createAction('Set queue', props<{ queue: Track[] }>());
export const changeCurrentTrackIndex = createAction(
  'Reset track index',
  props<{ currentTrackIndex: number }>()
);
export const backTrack = createAction('Back track');
export const nextTrack = createAction('Next track');
