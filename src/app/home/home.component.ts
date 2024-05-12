import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, search } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { AlbumApi } from 'src/app/album/services/api/album.api';
import { AlbumApiService } from 'src/app/album/services/api/album.api.service';
import { PlaylistApi } from 'src/app/shared/api/playlist/playlist.api';
import { PlaylistApiService } from 'src/app/shared/api/playlist/playlist.api.service';
import { AlbumUseCaseService } from 'src/app/core';
import { playlistComponent } from 'src/app/core/components/play-list/play-list.component';
import { AlbumUseCase } from 'src/app/album/services/album-use-case';
import { HomeUseCase } from 'src/app/home/services/home-use-case';
import { HomeUseCaseService } from 'src/app/home/services/home-use-case.service';
import { PlaylistUseCase } from 'src/app/shared/feature/playlist/playlist-use-case';
import { PlaylistUseCaseService } from 'src/app/shared/feature/playlist/playlist-use-case.service';
import { CardType } from 'src/app/shared/entities/card.type';
import { LoginAbstract, LoginService } from '../login';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { Navigation } from '../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [
    { provide: LoginAbstract, useClass: LoginService },
    { provide: PlaylistApi, useClass: PlaylistApiService },
    { provide: PlaylistUseCase, useClass: PlaylistUseCaseService },
    { provide: AlbumApi, useClass: AlbumApiService },
    { provide: AlbumUseCase, useClass: AlbumUseCaseService },
    { provide: HomeUseCase, useClass: HomeUseCaseService },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    IonButton,
    IonButtons,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonList,
    NgFor,
    AsyncPipe,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonCard,
    IonCardContent,
    IonLabel,
    AsyncPipe,
    playlistComponent,
    CardInfoComponent,
  ],
})
export class HomeComponent implements OnInit {
  albums$!: Observable<CardType[]>;
  playlists$!: Observable<CardType[]>;
  private navigation: Navigation = inject(Navigation);
  private loginService: LoginAbstract = inject(LoginAbstract);
  private homeUseCase: HomeUseCase = inject(HomeUseCase);
  private albumUseCase: AlbumUseCase = inject(AlbumUseCase);
  private playlistUseCase: PlaylistUseCase = inject(PlaylistUseCase);

  ngOnInit(): void {
    addIcons({ home, search });
    this.loginService.getToken().subscribe({
      next: () => {
        this.albums$ = this.homeUseCase.getAlbums();
        this.playlists$ = this.homeUseCase.getPlaylists();
      },
    });
  }

  public onPlayAlbum(item: CardType): void {
    if (!item) return;
    this.albumUseCase.playAlbum(item.id, item.image).subscribe();
  }

  public viewAlbum(item: CardType): void {
    if (!item) return;
    this.navigation.navigateTo(`/album/${item.id}`);
  }

  public onPlayPlaylist(item: CardType): void {
    if (!item) return;
    this.playlistUseCase.playPlaylist(item.id).subscribe();
  }
}
