import {Component, Input} from '@angular/core';
import {IonCol, IonGrid, IonIcon, IonLabel, IonRow} from "@ionic/angular/standalone";
import {ArtistInfoViewModel} from "../../models/artist-view-model.type";
import {addIcons} from "ionicons";
import {checkmarkCircle} from "ionicons/icons";

@Component({
  selector: 'app-artist-banner',
  templateUrl: './artist-banner.component.html',
  styleUrls: ['./artist-banner.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonLabel, IonIcon]
})
export class ArtistBannerComponent {
  @Input() artistInfo: ArtistInfoViewModel | undefined = undefined;


  constructor() {
    addIcons({
      checkmarkCircle
    })
  }
}
