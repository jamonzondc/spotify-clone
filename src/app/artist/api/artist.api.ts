import {Observable} from 'rxjs';
import {Album, Artist, Track} from 'src/app/shared';
import {BasicResponse} from '../../shared/api/models/basic-response.model';

export abstract class ArtistApi {
  abstract getArtist(artistId: string): Observable<BasicResponse<Artist>>;

  abstract getArtistTopTracks(
    artistId: string
  ): Observable<BasicResponse<Track[]>>;

  abstract getArtistAlbums(
    artistId: string
  ): Observable<BasicResponse<Album[]>>;
}
