import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
  caretForwardOutline,
  closeOutline,
  codeOutline,
  copyOutline,
  ellipsisHorizontal,
  personAddOutline,
  play,
  radioOutline,
  shareOutline,
  warningOutline
} from "ionicons/icons";
import {LaunchExternalApp} from "../../../core/services/launch-external-app/launch-external-app";
import {LaunchExternalAppService} from "../../../core/services/launch-external-app/launch-external-app.service";
import {Router} from "@angular/router";
import {Clipboard} from "@capacitor/clipboard";

@Component({
  selector: 'app-artist-actions',
  templateUrl: './artist-actions.component.html',
  styleUrls: ['./artist-actions.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonAvatar, IonContent, IonItem, IonList, IonPopover],
  providers: [{provide: LaunchExternalApp, useClass: LaunchExternalAppService}]
})
export class ArtistActionsComponent implements OnInit {
  @Input() artistId: string | undefined = '';
  @Output() playArtist: EventEmitter<void> = new EventEmitter<void>();
  following: boolean = false;
  report: string = 'https://support.spotify.com/es/content-policy-reporting/plain/?uri=spotify%3Aartist%3A2bxxlINUlcMQQb39K7IopR&platform=desktop-web';
  private launchExternalApp: LaunchExternalApp = inject(LaunchExternalApp);
  private router: Router = inject(Router);


  ngOnInit() {
    addIcons({
      play,
      ellipsisHorizontal,
      personAddOutline,
      radioOutline,
      warningOutline,
      shareOutline,
      caretForwardOutline,
      copyOutline,
      codeOutline,
      closeOutline
    });
  }


  public async openSpotifyApp(): Promise<void> {
    let path: string = this.artistId ? `artist/${this.artistId}` : 'home';
    await this.launchExternalApp.open(path);
  }

  public async copyPath(): Promise<void> {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const currentUrl = `${protocol}//${host}${this.router.url}`;
    await Clipboard.write({
      string: currentUrl
    });
  }
}

