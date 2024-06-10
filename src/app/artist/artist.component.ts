import {AsyncPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import {Component, inject, Input, OnInit} from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/angular/standalone';
import {Observable} from 'rxjs';
import {AlbumComponent} from '../album/album.component';
import {ArtistViewModel} from './models/artist-view-model.type';
import {ArtistUseCase} from './services/artist-use-case';
import {ArtistUseCaseService} from './services/artist-use-case.service';
import {ArtistApiService} from './api/artist.api.service';
import {ArtistApi} from './api/artist.api';
import {CardInfoComponent} from '../home';
import {ImagePipe} from "../shared/pipe/image/image.pipe";
import {ArtistBannerComponent} from "./components/artist-banner/artist-banner.component";
import {ArtistActionsComponent} from "./components/artist-actions/artist-actions.component";
import {ArtistTopTracksComponent} from "./components/artist-top-tracks/artist-top-tracks.component";
import {ArtistAlbumsComponent} from "./components/artist-albums/artist-albums.component";

@Component({
  selector: 'spotify-albums',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  standalone: true,
  imports: [
    IonImg,
    IonButton,
    IonItem,
    IonIcon,
    IonLabel,
    IonListHeader,
    IonItemDivider,
    IonList,
    IonCol,
    IonRow,
    IonGrid,
    NgFor,
    AsyncPipe,
    AlbumComponent,
    NgIf,
    DatePipe,
    CardInfoComponent,
    ImagePipe,
    ArtistBannerComponent,
    ArtistActionsComponent,
    ArtistTopTracksComponent,
    ArtistAlbumsComponent,


  ],
  providers: [
    {provide: ArtistApi, useClass: ArtistApiService},
    {provide: ArtistUseCase, useClass: ArtistUseCaseService},
  ],
})
export class ArtistComponent implements OnInit {
  @Input() id: string = '';
  artistUseCase: ArtistUseCase = inject(ArtistUseCase);
  artist$!: Observable<ArtistViewModel | undefined>;


  ngOnInit(): void {
    this.artist$ = this.artistUseCase.getArtistInfo(this.id);
  }

  public playArtist(artistId: string | undefined): void {
    if (!artistId) return;
    // this.albumUseCase.playAlbum(albumId, image).subscribe();
  }

  public playTopTrack(): void {
  }


  public goToArtist(artistId: string): void {
  }


}
