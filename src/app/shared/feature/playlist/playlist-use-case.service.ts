import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BasicResponse } from 'src/app/shared/api/models/basic-response.model';
import { PlaylistApi } from 'src/app/shared/api/playlist/playlist.api';
import { Playlist } from 'src/app/shared/entities';
import { SpotifyState, queue, changeCurrentTrackIndex } from '../../store';
import { PlaylistUseCase } from './playlist-use-case';

@Injectable()
export class PlaylistUseCaseService extends PlaylistUseCase {
  private readonly playlistApi: PlaylistApi = inject(PlaylistApi);
  private readonly store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  public playPlaylist(playlistId: string): Observable<BasicResponse<Playlist>> {
    return this.playlistApi.getPlaylist(playlistId).pipe(
      tap((response: BasicResponse<Playlist>) => {
        if (response.hasError()) {
          //Emitir un error
          return;
        }

        this.store.dispatch(changeCurrentTrackIndex({ currentTrackIndex: 0 }));
        this.store.dispatch(queue({ queue: response.getData()?.tracks! }));

        //this.setCurrentTrack();
      })
    );
  }

  /* private setCurrentTrack(): void {
    this.store
      .select(currentTrackIndexSelector)
      .pipe(
        withLatestFrom(this.store.select(currentplaylistSelector)),
        tap(([currentTrackIndex, playlist]) => {
          if (currentTrackIndex < 0 || currentTrackIndex >= playlist.length)
            return;

          const track: Track = playlist[currentTrackIndex];
          this.store.dispatch(currentTrack({ currentTrack: track }));
        })
      )
      .subscribe();
  } */
}
