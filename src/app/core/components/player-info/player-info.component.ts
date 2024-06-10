import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from 'src/app/shared/entities/track.type';
import {currentTrackSelector, SpotifyState} from '../../store';

@Component({
  selector: 'spotify-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class PlayerInfoComponent implements OnInit {
  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  track$: Observable<Track | undefined> = this.store.select(currentTrackSelector);

  constructor() {
  }

  ngOnInit() {
  }
}
