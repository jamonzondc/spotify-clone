import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IonButton, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow} from "@ionic/angular/standalone";
import {Album} from "../../../shared";

@Component({
  selector: 'app-album-actions',
  templateUrl: './album-actions.component.html',
  styleUrls: ['./album-actions.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[IonRow, IonCol, IonGrid, IonLabel, IonImg, IonButton, IonIcon]
})
export class AlbumActionsComponent {
  @Input() album!: Album;
  @Output() playAlbum: EventEmitter<void> = new EventEmitter<void>();
}
