import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { TrackApi } from './track.api';
import { BasicResponse } from '../models/basic-response.model';

@Injectable()
export class TrackApiService extends TrackApi {
  private httpClient: HttpClient = inject(HttpClient);

  public getStreamingTrack(trackId: string): Observable<BasicResponse<string>> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/tracks/${trackId}`)
      .pipe(
        map((response: any) => new BasicResponse<string>(response.preview_url)),
        catchError(
          (error: any): Observable<BasicResponse<string>> =>
            of(new BasicResponse<string>(null, error))
        )
      );
  }

  public getRecetlyPlayedTracks(): Observable<any[]> {
    return this.httpClient
      .get(`https://api.spotify.com/v1/me/player/recently-played`)
      .pipe(map((response: any) => response.items));
  }
}
