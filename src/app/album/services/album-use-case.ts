import {Observable} from 'rxjs';
import {BasicResponse} from 'src/app/shared/api/models/basic-response.model';
import {Album, Image} from 'src/app/shared/entities';

export abstract class AlbumUseCase {
    abstract playTrackInAlbum(
        albumId: string,
        images: Image[],
        currentTrackIndex: number
    ): Observable<BasicResponse<Album>>;

    abstract playAlbum(
        albumId: string,
        images: Image[]
    ): Observable<BasicResponse<BasicResponse<Album>>>;

    abstract getAlbum(albumId: string): Observable<Album | undefined>;
}
