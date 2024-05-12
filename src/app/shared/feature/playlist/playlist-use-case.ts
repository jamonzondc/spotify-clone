import { Observable } from 'rxjs';
import { Playlist } from 'src/app/shared/entities';
import { BasicResponse } from '../../api';

export abstract class PlaylistUseCase {
  abstract playPlaylist(
    playlistId: string
  ): Observable<BasicResponse<Playlist>>;
}
