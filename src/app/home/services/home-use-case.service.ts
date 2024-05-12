import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BasicResponse } from 'src/app/shared/api/models/basic-response.model';
import { CardType } from 'src/app/shared/entities/card.type';
import { HomeUseCase } from './home-use-case';

import { AlbumApi, PlaylistApi } from 'src/app/shared/api';
import { Album, Playlist } from 'src/app/shared/entities';
import { albumHomeDataAdapter, playlistsHomeDataAdapter } from '../adapters';

@Injectable()
export class HomeUseCaseService extends HomeUseCase {
  private readonly cardsToShow: number = 6;
  private readonly albumApi: AlbumApi = inject(AlbumApi);
  private readonly playlistApi: PlaylistApi = inject(PlaylistApi);

  public getAlbums(): Observable<CardType[]> {
    return this.albumApi.getAlbums(this.cardsToShow).pipe(
      map((response: BasicResponse<Album[]>): CardType[] => {
        if (response.hasError()) {
          //Ademas emitir un error
          return [];
        }
        return albumHomeDataAdapter(response.getData());
      })
    );
  }

  public getPlaylists(): Observable<CardType[]> {
    return this.playlistApi.getPlaylists(this.cardsToShow).pipe(
      map((response: BasicResponse<Playlist[]>): CardType[] => {
        if (response.hasError()) {
          //Ademas emitir un error
          return [];
        }
        return playlistsHomeDataAdapter(response.getData());
      })
    );
  }
}
