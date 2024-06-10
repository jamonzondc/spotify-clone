import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Album} from "../../../shared";
import {IonCol, IonGrid, IonImg, IonLabel, IonRow} from "@ionic/angular/standalone";
import {ArtistInfoComponent} from "../../../shared/components/artist-info/artist-info.component";
import {DatePipe} from "@angular/common";
import {ImagePipe} from "../../../shared/pipe/image/image.pipe";

@Component({
  selector: 'app-album-banner',
  templateUrl: './album-banner.component.html',
  styleUrls: ['./album-banner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[IonRow, IonCol, IonGrid, IonLabel, IonImg, ArtistInfoComponent, DatePipe, ImagePipe]
})
export class AlbumBannerComponent {
  @Input() album!: Album;
}
