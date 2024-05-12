import { Observable } from 'rxjs';
import { BasicResponse } from 'src/app/shared/api/models/basic-response.model';
import { Album } from 'src/app/shared/entities';
import { AlbumViewData } from '../models/album.type';

export abstract class AlbumUseCase {
  abstract playTrackInAlbum(
    albumId: string,
    image: string,
    currentTrackIndex: number
  ): Observable<BasicResponse<Album>>;

  abstract playAlbum(
    albumId: string,
    image: string
  ): Observable<BasicResponse<BasicResponse<Album>>>;

  abstract getAlbum(albumId: string): Observable<AlbumViewData | null>;
}
