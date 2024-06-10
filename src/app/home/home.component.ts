import {AsyncPipe, NgFor} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
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
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {home, search} from 'ionicons/icons';
import {AlbumApi} from 'src/app/album/api/album.api';
import {AlbumApiService} from 'src/app/album/api/album.api.service';
import {PlaylistApi} from 'src/app/shared/api/playlist/playlist.api';
import {PlaylistApiService} from 'src/app/shared/api/playlist/playlist.api.service';
import {AlbumUseCaseService} from 'src/app/core';
import {playlistComponent} from 'src/app/core/components/play-list/play-list.component';
import {AlbumUseCase} from 'src/app/album/services/album-use-case';
import {HomeUseCase} from 'src/app/home/services/home-use-case';
import {HomeUseCaseService} from 'src/app/home/services/home-use-case.service';
import {PlaylistUseCase} from 'src/app/shared/feature/playlist/playlist-use-case';
import {PlaylistUseCaseService} from 'src/app/shared/feature/playlist/playlist-use-case.service';
import {Card, CardType} from 'src/app/shared/view-models/card.type';
import {LoginAbstract, LoginService} from '../login';
import {CardInfoComponent} from '../shared/components/card-info/card-info.component';
import {Navigation} from '../shared';
import {HomeSectionViewModel} from "./models/home-section-view-model.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
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
  providers: [
    {provide: LoginAbstract, useClass: LoginService},
    {provide: PlaylistApi, useClass: PlaylistApiService},
    {provide: PlaylistUseCase, useClass: PlaylistUseCaseService},
    {provide: AlbumApi, useClass: AlbumApiService},
    {provide: AlbumUseCase, useClass: AlbumUseCaseService},
    {provide: HomeUseCase, useClass: HomeUseCaseService},
  ],
})
export class HomeComponent implements OnInit {
  homeSection: HomeSectionViewModel[] = [];
  private navigation: Navigation = inject(Navigation);
  private loginService: LoginAbstract = inject(LoginAbstract);
  private homeUseCase: HomeUseCase = inject(HomeUseCase);
  private albumUseCase: AlbumUseCase = inject(AlbumUseCase);
  private playlistUseCase: PlaylistUseCase = inject(PlaylistUseCase);

  public ngOnInit(): void {
    addIcons({home, search});

    this.loginService.getToken().subscribe({
      next: (): void => this.initHomeSection(),
    });
  }

constructor(private el: ElementRef) {
}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.scrollY

    const header: HTMLIonHeaderElement | null = document.querySelector('ion-header');
    if (!header) return;
    if (scrollPosition >= componentPosition) {
      header.classList.remove('ion-toolbar-background-transparent')
      header.classList.add('ion-toolbar-background-glass')

    } else {
      header.classList.add('ion-toolbar-background-transparent')
      header.classList.remove('ion-toolbar-background-glass')
    }
  }

  public playItem(card: Card): void {
    if (!card) return;
    if (card.type === CardType.ALBUM)
      this.albumUseCase.playAlbum(card.id, card.images).subscribe();
    else
      this.playlistUseCase.playPlaylist(card.id).subscribe();
  }

  public viewItem(card: Card): void {
    if (!card) return;
    if (card.type === CardType.ALBUM)
      this.navigation.navigateTo(`/album/${card.id}`);
    else
      this.navigation.navigateTo(`/playlist/${card.id}`);
  }

  private initHomeSection(): void {
    this.homeSection = [
      {title: 'Albums', items$: this.homeUseCase.getAlbums()},
      {title: 'Playlists', items$: this.homeUseCase.getPlaylists()},
    ];
  }
}
