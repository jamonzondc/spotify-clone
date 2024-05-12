import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

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
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import {
  pauseCircle,
  playCircle,
  playSkipBack,
  playSkipForward,
  repeat,
  shuffle,
} from 'ionicons/icons';
import { finalize, tap } from 'rxjs';
import { TrackApi } from 'src/app/shared/api';
import { Track } from 'src/app/shared/entities/track.type';
import { AlbumUseCase } from '../../../album/services/album-use-case';
import { AlbumUseCaseService } from '../../../album/services/album-use-case.service';
import { TrackApiService } from '../../../shared/api/track/track.api.service';
import { TrackUseCase } from '../../../shared/feature/track/track-use-case';
import { TrackUseCaseService } from '../../../shared/feature/track/track-use-case.service';
import {
  SpotifyState,
  backTrack,
  currentTrackIndexSelector,
  nextTrack,
  queueSelector,
  volumeChangeSelector,
} from '../../../shared/store';
import {
  DataTimer,
  PlayerControllerService,
} from './player-controller.service';

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
    { provide: AlbumUseCase, useClass: AlbumUseCaseService },
    { provide: TrackApi, useClass: TrackApiService },
    { provide: TrackUseCase, useClass: TrackUseCaseService },
    { provide: PlayerControllerService, useClass: PlayerControllerService },
  ],
})
export class PlayerControllersComponent implements OnInit, OnDestroy {
  trackDuration: number = 12000;
  currentTime: number = 0;
  playing: boolean = false;
  dataTimer: DataTimer = {
    currentTime: '0',
    progress: '0',
    remainingTime: '0',
    isFinished: false,
  };
  private queue: Track[] = [];
  private stop!: any;
  private audio: HTMLAudioElement | null = new Audio();
  private volume: number = 0;
  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );
  /*  private playerController: PlayerControllerService = inject(
    PlayerControllerService
  ); */

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

  public backTrack(): void {
    this.stopProgressBar();

    if (this.currentTime < 3) {
      //If the track is playing for less than 3 seconds, go back to the previous track
      this.audio = null;
      this.store.dispatch(backTrack());
    } else {
      //If the track is playing for more than 3 seconds, restart the track
      this.audio!.currentTime = 0;
      this.currentTime = 0;
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
    this.playCurrentTrack();
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
          this.queue = queue;
        })
      )
      .subscribe();
  }

  public playCurrentTrack(): void {
    this.store
      .select(currentTrackIndexSelector)
      .pipe(
        tap((currentTrackIndex: number) => {
          console.error('------------------->', currentTrackIndex, this.queue);
          if (currentTrackIndex < 0 || currentTrackIndex >= this.queue.length)
            return;
          // this.initAudio(this.queue[currentTrackIndex]);
        }),
        finalize(() => {
          console.error('---------Observable has completed-----------');
        })
      )
      .subscribe({
        next: (currentTrackIndex: number) => {
          console.error('----------N--------->', currentTrackIndex, this.queue);
        },
        error: (error: any) => {
          console.error('-------ERR------------>', error);
        },
      });
  }

  private initAudio(track: Track): void {
    this.trackDuration = 30000; // //track?.duration || 0;
    this.currentTime = 0;

    this.audio = new Audio(track.previewUrl);
    this.audio.volume = this.volume;
    this.audio.play();
    this.playing = true;

    //this.startProgressBar();

    /* this.playerController.getDataTimer(this.trackDuration).subscribe({
      next: (dataTimer: DataTimer) => {
        this.dataTimer = dataTimer;
      },
    }); */
  }

  public onPlayOrPause(playing: boolean): void {
    if (this.trackDuration === 1 || !this.audio) return;

    this.playing = playing;

    if (playing) {
      this.audio.play();
      this.startProgressBar();
    } else {
      this.audio.pause();
      this.stopProgressBar();
    }
  }

  public get playOrPauseIcon(): string {
    return this.playing ? 'pause-circle' : 'play-circle';
  }

  /* public get progress(): number {
    return (this.currentTime * 1000) / this.trackDuration;
  }

  public get remainingTime(): number {
    return this.trackDuration - this.currentTime * 1000;
  }*/

  private startProgressBar(): void {
    this.stop = null;
    this.stop = setInterval(() => {
      if ((this.currentTime + 1) * 1000 <= this.trackDuration) {
        this.currentTime++;
        console.error(
          '----------->',
          this.currentTime,
          this.trackDuration
          //this.progress
        );
      } else {
        this.nextTrack();
      }
    }, 1000);
  }

  private stopProgressBar(): void {
    if (!this.audio) return;
    this.audio.pause();
    clearInterval(this.stop);
  }
}
