import { Observable } from 'rxjs';
import { CardType } from 'src/app/shared/entities/card.type';

export abstract class HomeUseCase {
  abstract getAlbums(): Observable<CardType[]>;
  abstract getPlaylists(): Observable<CardType[]>;
}
