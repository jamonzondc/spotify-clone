import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BasicResponse } from 'src/app/shared/api/models/basic-response.model';
import { TrackUseCase } from './track-use-case';
import { TrackApi } from 'src/app/shared/api';

@Injectable()
export class TrackUseCaseService extends TrackUseCase {
  private readonly trackApi: TrackApi = inject(TrackApi);

  public getStreamingTrack(trackId: string): Observable<string> {
    return this.trackApi.getStreamingTrack(trackId).pipe(
      map((response: BasicResponse<string>) => {
        if (response.hasError()) {
          // Emitir un error
          return '';
        }
        return response.getData()!;
      })
    );
  }
}
