import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { getErrorResponseAdapter } from 'src/app/shared/adapters';
import {
  getPlaylistResponseAdapter,
  getPlaylistsResponseAdapter,
} from 'src/app/shared/adapters/playlist.adapter';
import { Playlist } from '../../entities/playlist.type';
import { BasicResponse } from '../models/basic-response.model';
import { PlaylistApi } from './playlist.api';

@Injectable()
export class PlaylistApiService extends PlaylistApi {
  private httpClient: HttpClient = inject(HttpClient);

  public getPlaylists(limit: number): Observable<BasicResponse<Playlist[]>> {
    const params: HttpParams = new HttpParams().set('limit', limit.toString());

    return this.httpClient
      .get('https://api.spotify.com/v1/browse/featured-playlists', { params })
      .pipe(
        map((response: any): BasicResponse<Playlist[]> => {
          return new BasicResponse<Playlist[]>(
            getPlaylistsResponseAdapter(response)
          );
        }),
        catchError((error: any): Observable<BasicResponse<Playlist[]>> => {
          return of(
            new BasicResponse<Playlist[]>(null, getErrorResponseAdapter(error))
          );
        })
      );
  }

  public getPlaylist(playlistId: string): Observable<BasicResponse<Playlist>> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`)
      .pipe(
        map((response: any): BasicResponse<Playlist> => {
          return new BasicResponse<Playlist>(
            getPlaylistResponseAdapter(response)
          );
        }),
        catchError((error: any): Observable<BasicResponse<Playlist>> => {
          return of(
            new BasicResponse<Playlist>(null, getErrorResponseAdapter(error))
          );
        })
      );
  }
}
