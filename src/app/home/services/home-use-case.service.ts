import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {BasicResponse} from 'src/app/shared/api/models/basic-response.model';
import {Card, CardType} from 'src/app/shared/view-models/card.type';
import {HomeUseCase} from './home-use-case';

import {AlbumApi, PlaylistApi} from 'src/app/shared/api';
import {Album, Playlist} from 'src/app/shared/entities';
import {albumHomeDataAdapter, playlistsHomeDataAdapter} from '../adapters';
import {Notification} from "../../core/services/notification/notification";

@Injectable()
export class HomeUseCaseService extends HomeUseCase {
  private readonly cardsToShow: number = 6;
  private readonly albumApi: AlbumApi = inject(AlbumApi);
  private readonly playlistApi: PlaylistApi = inject(PlaylistApi);
  private readonly notification: Notification = inject(Notification)

  public getAlbums(): Observable<Card[]> {
    return this.albumApi.getAlbums(this.cardsToShow).pipe(
      map((response: BasicResponse<Album[]>): Card[] => {
        if (response.hasError()) {
          this.notification.showNotification(response.getError()?.getCode())
          return [];
        }
        return albumHomeDataAdapter(response.getData());
      })
    );
  }

  public getPlaylists(): Observable<Card[]> {
    return this.playlistApi.getPlaylists(this.cardsToShow).pipe(
      map((response: BasicResponse<Playlist[]>): Card[] => {
        if (response.hasError()) {
          this.notification.showNotification(response.getError()?.getCode())
          return [];
        }
        return playlistsHomeDataAdapter(response.getData());
      })
    );
  }
}
