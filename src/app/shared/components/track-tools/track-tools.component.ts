import {Component} from "@angular/core";
import {IonContent, IonIcon, IonItem, IonList, IonPopover} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
  addCircleOutline,
  caretForwardOutline,
  ellipseOutline,
  musicalNotesOutline,
  radioOutline,
  searchOutline
} from "ionicons/icons";

@Component({
  selector: 'app-track-tools',
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonItem,
    IonList,
    IonPopover
  ],
  providers: [],
  template: `

    <ion-content>
      <ion-list>
        <ion-item id="add-artist-to-list" button=true>
          <ion-icon name="add-outline" slot="start"></ion-icon>
          Añadir a lista
          <ion-icon name="caret-forward-outline" slot="end"></ion-icon>
        </ion-item>
        <ion-popover trigger="add-artist-to-list" triggerAction="hover" [dismissOnSelect]="true" side="end"
                     size="auto">
          <ng-template>
            <ion-content>
              <ion-list>
                <ion-item button=true>
                  <ion-icon name="search-outline" slot="start"></ion-icon>
                  Busca una lista
                </ion-item>
                <ion-item button=true disabled="true">
                  <ion-icon name="add-outline" slot="start"></ion-icon>
                  Nueva lista
                </ion-item>
              </ion-list>
            </ion-content>
          </ng-template>
        </ion-popover>
        <ion-item button=true>
          <ion-icon name="add-circle-outline" slot="start"></ion-icon>
          Guardar en canciones que te gustan
        </ion-item>
        <ion-item button=true>
          <ion-icon name="radio-outline" slot="start"></ion-icon>
          Ir a radio de la canción
        </ion-item>
        <ion-item button=true>
          <ion-icon name="ellipse-outline" slot="start"></ion-icon>
          Ir al álbum
        </ion-item>
        <ion-item button=true>
          <ion-icon name="musical-note-outline" slot="start"></ion-icon>
          View creadits
        </ion-item>
        <ion-item button id="nested-trigger">
          <ion-icon name="share-outline" slot="start"></ion-icon>
          Compartir
          <ion-icon name="caret-forward-outline" slot="end"></ion-icon>
        </ion-item>
        <ion-popover trigger="nested-trigger" triggerAction="hover" [dismissOnSelect]="true" side="end" size="auto">
          <ng-template>
            <ion-content>
              <ion-list>
                <ion-item button=true (click)="copyPath()">
                  <ion-icon name="copy-outline" slot="start"></ion-icon>
                  Copiar enlace al artista
                </ion-item>
                <ion-item button=true disabled="true">
                  <ion-icon name="code-outline" slot="start"></ion-icon>
                  Insertar artista
                </ion-item>
              </ion-list>
            </ion-content>
          </ng-template>
        </ion-popover>
        <ion-item button lines="full" (click)="openSpotifyApp()">
          <ion-icon name="open-outline" slot="start"></ion-icon>
          Abrir en la aplicación del ordenador
        </ion-item>
      </ion-list>
    </ion-content>

  `
})
export class TrackToolsComponent {
  constructor() {
    addIcons({
      caretForwardOutline,
      searchOutline,
      addCircleOutline,
      ellipseOutline,
      radioOutline,
      musicalNotesOutline
    })
  }

  public async openSpotifyApp(): Promise<void> {
  //  let path: string = this.artistId ? `artist/${this.artistId}` : 'home';
   // await this.launchExternalApp.open(path);
  }

  copyPath(){}
}
