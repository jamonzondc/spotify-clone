import {Component, inject, Input} from '@angular/core';
import {IonCol, IonRow} from "@ionic/angular/standalone";
import {CardInfoComponent} from "../../../shared/components/card-info";
import {NgFor} from "@angular/common";
import {Card} from "../../../shared/view-models/card.type";
import {Navigation} from "../../../core/services/navigation";
import {AlbumUseCase, AlbumUseCaseService} from "../../../album";
import {AlbumApi, AlbumApiService} from "../../../album/api";

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss'],
  standalone: true,
  imports: [IonRow, IonCol, CardInfoComponent, NgFor],
  providers: [
    {provide: AlbumApi, useClass: AlbumApiService},
    {provide: AlbumUseCase, useClass: AlbumUseCaseService},
  ]
})
export class ArtistAlbumsComponent {
  @Input() artistAlbums: Card[] = [];
  private navigation: Navigation = inject(Navigation);
  private albumUseCase: AlbumUseCase = inject(AlbumUseCase);

  constructor() {
  }

  public playAlbum(card: Card): void {
    if (!card) return;
    this.albumUseCase.playAlbum(card.id, card.images).subscribe();
  }

  public viewAlbum(card: Card): void {
    if (!card) return;
    this.navigation.navigateTo(`/album/${card.id}`);
  }
}
