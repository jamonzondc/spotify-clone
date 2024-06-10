import { DatePipe, NgClass, NgForOf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPopover,
  IonRow,
  PopoverController,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import { addOutline, pause, timeOutline } from 'ionicons/icons';
import { currentTrackSelector, SpotifyState, Track } from '../../../shared';
import { ArtistInfoComponent } from '../../../shared/components/artist-info/artist-info.component';
import { TrackToolsComponent } from '../../../shared/components/track-tools/track-tools.component';

@Component({
  selector: 'app-artist-top-tracks',
  templateUrl: './artist-top-tracks.component.html',
  styleUrls: ['./artist-top-tracks.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    IonCol,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    NgForOf,
    ArtistInfoComponent,
    IonContent,
    IonPopover,
    TrackToolsComponent,
    IonImg,
    NgClass,
  ],
})
export class ArtistTopTracksComponent implements OnInit {
  @Input() topTracks: Track[] = [];
  public popoverController: PopoverController = inject(PopoverController);
  public classForTrack: string = '';
  private isPlaying: boolean = false;
  private trackPlaying: Track | undefined;
  private readonly store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  constructor() {
    addIcons({
      timeOutline,
      addOutline,
      pause,
    });
  }

  ngOnInit(): void {
    this.store.select(currentTrackSelector).subscribe({
      next: (currentTrack: Track | undefined) => {
        this.trackPlaying = currentTrack;
      },
    });
  }

  public async openTools(event: Event): Promise<void> {
    const popover: HTMLIonPopoverElement = await this.popoverController.create({
      component: TrackToolsComponent,
      event,
    });

    await popover.present();
  }

  playTopTrack(track: Track) {
    this.trackPlaying = track;
  }

  addArtistToList(): void {}

  public whenMouseHover(track: Track): string {
    /*
     * 1- Si hago un hover y se está reproduciendono muestro el boton de pause
     * 2- Si hago un hover y no se está reproduciendo muestro el icono de play
     */
    console.error('--------------');
    return track.isPlaying
      ? 'only-pause-icon-on-hover'
      : 'only-play-icon-on-hover';
  }
}
