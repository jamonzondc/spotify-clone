import {Observable} from 'rxjs';
import {Card} from 'src/app/shared/view-models/card.type';

export abstract class HomeUseCase {
  abstract getAlbums(): Observable<Card[]>;
  abstract getPlaylists(): Observable<Card[]>;
}
