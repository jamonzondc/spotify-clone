import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AlbumApi} from 'src/app/album/api/album.api';
import {BasicResponse} from 'src/app/shared/api/models/basic-response.model';
import {Album, Image} from 'src/app/shared/entities';
import {Track} from 'src/app/shared/entities/track.type';
import {changeCurrentTrackIndex, queue, SpotifyState,} from '../../core/store';
import {Notification} from "../../core/services/notification/notification";

@Injectable()
export class AlbumUseCaseService {
  private readonly notification: Notification = inject(Notification);
  private readonly albumApi: AlbumApi = inject(AlbumApi);
  private readonly store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  public playTrackInAlbum(
    albumId: string,
    images: Image[],
    currentTrackIndex: number
  ): Observable<BasicResponse<Album>> {
    return this.albumApi.getAlbum(albumId).pipe(
      tap((response: BasicResponse<Album>) => {
        if (response.hasError()) {
          this.notification.showNotification(response.getError()?.getCode());
          return;
        }

        this.store.dispatch(
          queue({
            queue: this.addImageToTrack(
              images,
              response.getData()?.tracks || []
            ),
          })
        );

        this.store.dispatch(
          changeCurrentTrackIndex({currentTrackIndex: currentTrackIndex})
        );
      })
    );
  }

  public playAlbum(
    albumId: string,
    images: Image[]
  ): Observable<BasicResponse<Album>> {
    return this.playTrackInAlbum(albumId, images, 0);
  }

  public getAlbum(albumId: string): Observable<Album | undefined> {
    return this.albumApi.getAlbum(albumId).pipe(
      map((response: BasicResponse<Album>): Album | undefined => {
        if (response.hasError()) {
          this.notification.showNotification(response.getError()?.getCode());
          return undefined;
        }
        return response.getData();
      })
    );
  }

  private addImageToTrack(images: Image[], tracks: Track[] | undefined): Track[] {
    if (!tracks) return [];
    return tracks.map((track: Track) => ({...track, images}));
  }
}
