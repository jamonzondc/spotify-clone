import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  IonList,
  IonListHeader,
  IonItem,
  IonItemDivider,
  IonItemOptions,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  ellipsisHorizontal,
  listOutline,
  play,
  timeOutline,
} from 'ionicons/icons';
import { AlbumUseCaseService, SpotifyState } from 'src/app/core';
import { AlbumUseCase } from 'src/app/album/services/album-use-case';
import { Observable } from 'rxjs';
import { Album, Navigation } from '../shared';
import { AlbumViewData } from './models/album.type';

@Component({
  selector: 'spotify-album',
  standalone: true,
  imports: [
    IonItemOptions,
    IonItemDivider,
    IonItem,
    IonListHeader,
    IonList,
    IonImg,
    IonIcon,
    IonFabButton,
    IonFab,
    IonCol,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonLabel,
    DatePipe,
    NgFor,
    IonGrid,
    IonRow,
    IonIcon,
    IonButton,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  providers: [{ provide: AlbumUseCase, useClass: AlbumUseCaseService }],
})
export class AlbumComponent implements OnInit {
  @Input('id') public albumId: string = '';
  private store: Store<SpotifyState> = inject(Store<SpotifyState>);
  private navigation: Navigation = inject(Navigation);
  private albumUseCase: AlbumUseCase = inject(AlbumUseCase);
  public album$!: Observable<AlbumViewData | null>;
  public backgroundColor: string = '';

  ngOnInit(): void {
    addIcons({
      play,
      timeOutline,
      ellipsisHorizontal,
      addCircleOutline,
      listOutline,
    });
    this.album$ = this.albumUseCase.getAlbum(this.albumId);
    this.backgroundColor = this.getRandomColor();
  }

  public onPlayAlbum(albumId: string, image: string): void {
    if (!albumId) return;
    this.albumUseCase.playAlbum(albumId, image).subscribe();
  }

  public playTrackInAlbum(
    albumId: string,
    image: string,
    currentTrackIndex: number
  ): void {
    if (!albumId) return;
    this.albumUseCase
      .playTrackInAlbum(albumId, image, currentTrackIndex)
      .subscribe();
  }

  public goToArtist(artistId: string): void {
    if (!artistId) return;
    this.navigation.navigateTo(`/artist/${artistId}`);
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `linear-gradient(180deg, ${color}, transparent)`;
  }
}
