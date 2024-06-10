import {AsyncPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
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
  IonItem,
  IonItemDivider,
  IonItemOptions,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {addCircleOutline, ellipsisHorizontal, listOutline, play, timeOutline,} from 'ionicons/icons';
import {AlbumUseCaseService} from 'src/app/core';
import {AlbumUseCase} from 'src/app/album/services/album-use-case';
import {Observable} from 'rxjs';
import {Album, AlbumApi, AlbumApiService, Image, Navigation} from '../shared';
import {ArtistInfoComponent} from "../shared/components/artist-info/artist-info.component";
import {ImagePipe} from "../shared/pipe/image/image.pipe";
import {AlbumBannerComponent} from "./components/album-banner/album-banner.component";
import {AlbumActionsComponent} from "./components/album-actions/album-actions.component";
import {AlbumTracksComponent} from "./components/album-tracks/album-tracks.component";

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
    ArtistInfoComponent,
    ImagePipe,
    AlbumBannerComponent,
    AlbumActionsComponent,
    AlbumTracksComponent
  ],
  templateUrl: './album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: AlbumApi, useClass: AlbumApiService},
    {provide: AlbumUseCase, useClass: AlbumUseCaseService},
  ],
})
export class AlbumComponent implements OnInit {
  @Input('id') public albumId: string = '';
  private navigation: Navigation = inject(Navigation);
  private albumUseCase: AlbumUseCase = inject(AlbumUseCase);
  public album$!: Observable<Album | undefined>;
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

  public playAlbum(albumId: string, images: Image[]): void {
    if (!albumId) return;
    this.albumUseCase.playAlbum(albumId, images).subscribe();
  }

  public playTrackInAlbum(
    albumId: string,
    images: Image[],
    currentTrackIndex: number
  ): void {
    if (!albumId) return;
    this.albumUseCase
      .playTrackInAlbum(albumId, images, currentTrackIndex)
      .subscribe();
  }

  private getRandomColor(): string {
    const colors: string[] = ['#FFD1DC', '#D1FFD1', '#D1D1FF', '#FFD1D1', '#FFFFD1', '#D1FFFF', '#FFD1FF', '#D1FFFE', '#FFD1C1', '#D1FFC1', '#C1D1FF', '#FFC1D1'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `linear-gradient(180deg, ${colors[randomIndex]}, transparent)`
  }
}
