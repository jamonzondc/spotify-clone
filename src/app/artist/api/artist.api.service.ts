import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {Album, Artist, Track} from 'src/app/shared';
import {getErrorResponseAdapter} from 'src/app/shared/adapters';
import {BasicResponse} from '../../shared';
import {getArtistResponseAdapter,} from '../adapters/artist-response.adapter';
import {ArtistApi} from './artist.api';
import {getTracksResponseAdapter} from "../../shared/adapters/track-response.adapter";
import {getAlbumsResponseAdapter} from "../../album/adapters/album-response.adapter";

@Injectable()
export class ArtistApiService extends ArtistApi {
  private httpClient: HttpClient = inject(HttpClient);

  public getArtist(artistId: string): Observable<BasicResponse<Artist>> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/artists/${artistId}`)
      .pipe(
        map(
          (response: any): BasicResponse<Artist> =>
            new BasicResponse<Artist>(getArtistResponseAdapter(response))
        ),
        catchError((error: any): Observable<BasicResponse<Artist>> => {
          return of(
            new BasicResponse<Artist>(undefined, getErrorResponseAdapter(error))
          );
        })
      );
  }

  public getArtistTopTracks(
    artistId: string
  ): Observable<BasicResponse<Track[]>> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`)
      .pipe(
        map(
          (response: any): BasicResponse<Track[]> =>
            new BasicResponse<Track[]>(
              getTracksResponseAdapter(response?.tracks)
            )
        ),
        catchError((error: any): Observable<BasicResponse<Track[]>> => {
          return of(
            new BasicResponse<Track[]>(undefined, getErrorResponseAdapter(error))
          );
        })
      );
  }

  public getArtistAlbums(artistId: string): Observable<BasicResponse<Album[]>> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/artists/${artistId}/albums`)
      .pipe(
        map(
          (response: any): BasicResponse<Album[]> =>
            new BasicResponse<Album[]>(getAlbumsResponseAdapter(response?.items))
        ),
        catchError((error: any): Observable<BasicResponse<Album[]>> => {
          return of(
            new BasicResponse<Album[]>(undefined, getErrorResponseAdapter(error))
          );
        })
      );
  }
}
