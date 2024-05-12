import { Component } from '@angular/core';
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonRow,
  IonCard,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'spotify-main-content',
  styleUrl: './main-content.component.scss',
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonCard,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Header </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="3">
            <ion-card> Hola mundo </ion-card>
          </ion-col>
          <ion-col size="9">
            <ion-card> <ng-content /></ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title> Footer </ion-title>
      </ion-toolbar>
    </ion-footer>
  `,
})
export class MainContentComponent {}
