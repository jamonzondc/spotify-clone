import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { AlbumComponent } from '../album/album.component';

@Component({
  selector: 'spotify-albums',
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, NgFor, AsyncPipe, AlbumComponent],
  providers: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
  @Input('id') artistId: string = '';
  ngOnInit(): void {}
}
