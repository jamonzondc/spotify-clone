import { Observable } from 'rxjs';
import { BasicResponse } from 'src/app/shared/api/models/basic-response.model';
import { Track } from 'src/app/shared/entities/track.type';

export abstract class TrackUseCase {
  abstract getStreamingTrack(trackId: string): Observable<any>;
}
