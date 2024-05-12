import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response.model';
import { Playlist } from 'src/app/shared/entities';

export abstract class PlaylistApi {
  abstract getPlaylist(playlistId: string): Observable<BasicResponse<Playlist>>;

  abstract getPlaylists(limit: number): Observable<BasicResponse<Playlist[]>>;
}
