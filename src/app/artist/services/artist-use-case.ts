import {Observable} from 'rxjs';
import {ArtistViewModel} from '../models/artist-view-model.type';

export abstract class ArtistUseCase {
  abstract getArtistInfo(artistId: string): Observable<ArtistViewModel | undefined>;
}
