import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {Store} from '@ngrx/store';
import {addIcons} from 'ionicons';
import {close, ellipsisHorizontal, play} from 'ionicons/icons';
import {map, Observable, withLatestFrom} from 'rxjs';
import {Track} from 'src/app/shared/entities/track.type';
import {
  currentTrackIndexSelector,
  currentTrackSelector,
  queueSelector,
  SpotifyState,
  switchQueueVisibility,
} from '../..';
import {ImagePipe} from "../../../shared/pipe/image/image.pipe";

@Component({
  selector: 'spotify-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonIcon,
    IonCardContent,
    IonTitle,
    IonToolbar,
    IonCardHeader,
    IonCard,
    IonList,
    IonItem,
    IonButton,
    IonListHeader,
    IonLabel,
    AsyncPipe,
    NgFor,
    NgIf,
    ImagePipe,
  ],
})
export class playlistComponent implements OnInit {
  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  public currentTrack$: Observable<Track | undefined> =
    this.store.select(currentTrackSelector);

  public queue$: Observable<Track[]> = this.store.select(queueSelector);

  public queue1$: Observable<Track[]> = this.queue$.pipe(
    withLatestFrom(this.store.select(currentTrackIndexSelector)),
    map(([playlist, currentTrackIndex]) =>
      playlist.slice(currentTrackIndex + 1)
    )
  );

  constructor() {
    addIcons({close, ellipsisHorizontal, play});
  }

  ngOnInit() {
  }

  onCloseplaylist(): void {
    this.store.dispatch(switchQueueVisibility());
  }

  onPlayTrack(): void {
  }
}
