import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';

import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonRow,
} from '@ionic/angular/standalone';
import {Store} from '@ngrx/store';
import {addIcons} from 'ionicons';
import {pauseCircle, playCircle, playSkipBack, playSkipForward, repeat, shuffle,} from 'ionicons/icons';
import {tap} from 'rxjs/operators';
import {TrackApi} from 'src/app/shared/api';
import {Track} from 'src/app/shared/entities/track.type';
import {AlbumUseCase} from '../../../album/services/album-use-case';
import {AlbumUseCaseService} from '../../../album/services/album-use-case.service';
import {TrackApiService} from '../../../shared/api/track/track.api.service';
import {TrackUseCase} from '../../../shared/feature/track/track-use-case';
import {TrackUseCaseService} from '../../../shared/feature/track/track-use-case.service';
import {
  backTrack,
  currentTrackIndexSelector,
  nextTrack,
  queueSelector,
  SpotifyState,
  volumeChangeSelector,
} from '../../store';
import {DataTimer, PlayerControllerService,} from './player-controller.service';

@Component({
  selector: 'spotify-player-controllers',
  templateUrl: './player-controllers.component.html',
  styleUrls: ['./player-controllers.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonItem,
    IonLabel,
    IonCol,
    IonGrid,
    IonRow,
    IonIcon,
    IonProgressBar,
    DatePipe,
    AsyncPipe,
  ],
  providers: [
    {provide: AlbumUseCase, useClass: AlbumUseCaseService},
    {provide: TrackApi, useClass: TrackApiService},
    {provide: TrackUseCase, useClass: TrackUseCaseService},
    {provide: PlayerControllerService, useClass: PlayerControllerService},
  ],
})
export class PlayerControllersComponent implements OnInit, OnDestroy {
  playing: boolean = false;
  dataTimer: DataTimer = {
    currentTime: 0,
    progress: 0,
    remainingTime: 0,
    isFinished: false,
  };
  private currentTrackIndex: number = 0;
  private trackDuration: number = 30000;
  private volume: number = 0;
  private queue: Track[] = [];
  private audio: HTMLAudioElement | undefined = new Audio();
  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );
  private playerController: PlayerControllerService = inject(
    PlayerControllerService
  );

  constructor() {
    addIcons({
      playSkipForward,
      playSkipBack,
      playCircle,
      pauseCircle,
      shuffle,
      repeat,
    });
  }

  public get playOrPauseIcon(): string {
    return this.playing ? 'pause-circle' : 'play-circle';
  }

  public backTrack(): void {
    this.stopProgressBar();

    if (this.dataTimer.currentTime < 3) {
      //If the track is playing for less than 3 seconds, go back to the previous track
      this.audio = undefined;
      this.store.dispatch(backTrack());
    } else {
      //If the track is playing for more than 3 seconds, restart the track
      this.audio!.currentTime = 0;
      // this.currentTime = 0;
    }
  }

  public nextTrack(): void {
    if (!this.audio) return;
    this.stopProgressBar();
    this.store.dispatch(nextTrack());
  }

  public ngOnDestroy() {
    this.stopProgressBar();
  }

  public ngOnInit(): void {
    this.listeningVolumenChange();
    this.listeningTracks();
  }

  private listeningVolumenChange(): void {
    this.store
      .select(volumeChangeSelector)
      .pipe(
        tap((volume: number) => {
          this.volume = volume;
          if (this.audio) this.audio.volume = volume;
        })
      )
      .subscribe();
  }

  private listeningTracks(): void {
    this.store
      .select(queueSelector)
      .pipe(
        tap((queue: Track[]): void => {
          if (queue.length === 0) return;
          this.queue = queue;
          this.playCurrentTrack();
        })
      )
      .subscribe();
  }

  public playCurrentTrack(): void {
    this.store
      .select(currentTrackIndexSelector)
      .pipe(
        tap((currentTrackIndex: number) => {
          if (currentTrackIndex < 0 || currentTrackIndex >= this.queue.length)
            return;

          this.audio = undefined;
          this.currentTrackIndex = currentTrackIndex;
          this.trackDuration = 30000; // //track?.duration;
          this.startProgressBar(this.queue[currentTrackIndex]);
        })
      )
      .subscribe();
  }

  private startProgressBar(track: Track): void {
    this.playerController
      .startDataTimer(track.duration)
      .pipe(
        tap((dataTimer: DataTimer) => {
          this.dataTimer = dataTimer;
          if (!this.playing) this.initAudio(track.previewUrl);
        })
      )
      .subscribe();
  }

  private stopProgressBar(): void {
    if (!this.audio) return;
    this.audio = undefined;
    this.playerController.stopDataTimer();
  }

  private initAudio(previewUrl: string): void {
    if (!this.audio) {
      this.audio = new Audio(previewUrl);
      this.audio.volume = this.volume;
    }
    this.audio.play();
    this.playing = true;
  }

  public onPlayOrPause(): void {
    if (this.trackDuration === 1 || !this.audio) return;
    this.playing = !this.playing;

    if (this.playing) {
      this.startProgressBar(this.queue[this.currentTrackIndex]);
    } else {
      this.playerController.pauseDataTimer();
      this.audio.pause();
    }
  }
}
