import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {getErrorResponseAdapter,} from 'src/app/shared/adapters';
import {Album} from '../../shared/entities/album.type';
import {BasicResponse} from '../../shared/api/models/basic-response.model';
import {AlbumApi} from './album.api';
import {getAlbumResponseAdapter, getAlbumsResponseAdapter} from "../adapters/album-response.adapter";

@Injectable()
export class AlbumApiService extends AlbumApi {
  private httpClient: HttpClient = inject(HttpClient);

  public getAlbums(limit: number = 10): Observable<BasicResponse<Album[]>> {
    const params: HttpParams = new HttpParams().set('limit', limit.toString());

    return this.httpClient
      .get('https://api.spotify.com/v1/browse/new-releases', {params})
      .pipe(
        map(
          (response: any): BasicResponse<Album[]> =>
            new BasicResponse<Album[]>(getAlbumsResponseAdapter(response?.albums?.items))
        ),
        catchError((error: any): Observable<BasicResponse<Album[]>> => {
          return of(
            new BasicResponse<Album[]>(undefined, getErrorResponseAdapter(error))
          );
        })
      );
  }

  public getAlbum(albumId: string): Observable<BasicResponse<Album>> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/albums/${albumId}`)
      .pipe(
        map(
          (response: any) =>
            new BasicResponse<Album>(getAlbumResponseAdapter(response))
        ),
        catchError((error: any): Observable<BasicResponse<Album>> => {
          return of(
            new BasicResponse<Album>(undefined, getErrorResponseAdapter(error))
          );
        })
      );
  }
}
