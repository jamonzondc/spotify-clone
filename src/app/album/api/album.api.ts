import {Observable} from 'rxjs';
import {Album} from '../../shared/entities/album.type';
import {BasicResponse} from '../../shared/api/models/basic-response.model';

export abstract class AlbumApi {
  abstract getAlbums(limit: number): Observable<BasicResponse<Album[]>>;

  abstract getAlbum(albumId: string): Observable<BasicResponse<Album>>;
}
