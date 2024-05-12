import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AlbumApi } from 'src/app/album/services/api/album.api';
import { BasicResponse } from 'src/app/shared/api/models/basic-response.model';
import { Album } from 'src/app/shared/entities';
import { Track } from 'src/app/shared/entities/track.type';
import {
  SpotifyState,
  queue,
  changeCurrentTrackIndex,
} from '../../shared/store';
import { albumViewDataAdapter } from '../adapters/album.adapter';
import { AlbumViewData } from '../models/album.type';

@Injectable()
export class AlbumUseCaseService {
  private readonly albumApi: AlbumApi = inject(AlbumApi);
  private readonly store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  public playTrackInAlbum(
    albumId: string,
    image: string,
    currentTrackIndex: number
  ): Observable<BasicResponse<Album>> {
    return this.albumApi.getAlbum(albumId).pipe(
      tap((response: BasicResponse<Album>) => {
        if (response.hasError()) {
          //Emitir un error
          return;
        }

        if (response.getData()?.tracks.length === 0) {
          //Emitir un error
          return;
        }

        this.store.dispatch(
          queue({
            queue: this.addImageToTrack(
              image,
              response.getData()?.tracks || []
            ),
          })
        );
        this.store.dispatch(changeCurrentTrackIndex({ currentTrackIndex }));
      })
    );
  }

  public playAlbum(
    albumId: string,
    image: string
  ): Observable<BasicResponse<Album>> {
    return this.playTrackInAlbum(albumId, image, 0);
  }

  public getAlbum(albumId: string): Observable<AlbumViewData | null> {
    return this.albumApi.getAlbum(albumId).pipe(
      map((response: BasicResponse<Album>): AlbumViewData | null => {
        if (response.hasError()) {
          //Emitir un error
          return null;
        }
        return albumViewDataAdapter(response.getData());
      })
    );
  }

  private addImageToTrack(image: string, tracks: Track[] | null): Track[] {
    if (!tracks) return [];
    return tracks.map((track) => ({ ...track, image }));
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
