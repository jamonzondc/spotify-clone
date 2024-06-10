import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {BasicResponse} from 'src/app/shared/api/models/basic-response.model';
import {Album, Artist, Track} from 'src/app/shared/entities';
import {SpotifyState} from '../../shared';
import {ArtistViewModel} from '../models/artist-view-model.type';
import {ArtistApi} from '../api/artist.api';
import {getArtistInfoViewModelAdapter} from "../adapters/artist-view-model.adapter";
import {Notification} from "../../core/services/notification/notification";
import {albumHomeDataAdapter} from "../../home/adapters";

@Injectable()
export class ArtistUseCaseService {
  private readonly notification: Notification = inject(Notification);
  private readonly artistApi: ArtistApi = inject(ArtistApi);
  private readonly store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  public getArtistInfo(artistId: string): Observable<ArtistViewModel | undefined> {
    const artistViewModel: ArtistViewModel = {
      info: undefined,
      topTracks: [],
      artistAlbums: [],
    };
    return this.artistApi.getArtist(artistId).pipe(
      concatMap(
        (
          response: BasicResponse<Artist>
        ): Observable<BasicResponse<Track[]>> => {
          if (response.hasError())
            return of(new BasicResponse<Track[]>(undefined, response.getError()));

          artistViewModel.info = getArtistInfoViewModelAdapter(response.getData());
          return this.artistApi.getArtistTopTracks(artistId);
        }
      ),
      concatMap(
        (
          response: BasicResponse<Track[]>
        ): Observable<BasicResponse<Album[]>> => {
          if (response.hasError())
            return of(new BasicResponse<Album[]>(undefined, response.getError()));

          artistViewModel.topTracks = response.getData() || [];
          return this.artistApi.getArtistAlbums(artistId);
        }
      ),
      map((response: BasicResponse<Album[]>): ArtistViewModel | undefined => {
        if (response.hasError()) {
          this.notification.showNotification(response.getError()?.getCode());
          return undefined;
        }
        artistViewModel.artistAlbums =  albumHomeDataAdapter(response.getData());
        return artistViewModel;
      })
    );
  }
}
