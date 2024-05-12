import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response.model';

export abstract class TrackApi {
  abstract getStreamingTrack(
    trackId: string
  ): Observable<BasicResponse<string>>;
  abstract getRecetlyPlayedTracks(): Observable<any[]>;
}
