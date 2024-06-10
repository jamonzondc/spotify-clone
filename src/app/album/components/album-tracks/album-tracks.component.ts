import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow
} from "@ionic/angular/standalone";
import {DatePipe, NgFor} from "@angular/common";
import {ImagePipe} from "../../../shared/pipe/image/image.pipe";
import {Album} from "../../../shared";
import {ArtistInfoComponent} from "../../../shared/components/artist-info/artist-info.component";
import {addIcons} from "ionicons";
import {addCircleOutline, ellipsisHorizontal, listOutline, play, timeOutline} from "ionicons/icons";

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor,IonRow, IonCol, IonGrid, IonLabel, IonIcon, DatePipe, ImagePipe, IonList, IonListHeader, IonItem, IonItemDivider, ArtistInfoComponent]
})
export class AlbumTracksComponent implements OnInit{
  @Input() album!: Album;
  @Output() playTrackInAlbum: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {

  }
}
