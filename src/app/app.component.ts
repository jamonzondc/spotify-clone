import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonApp,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MainContentComponent } from './core/components/main-content/main-content.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { playlistComponent } from './core/components/play-list/play-list.component';
import { SpotifyState, queueShowedSelector } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonFooter,
    IonTitle,
    IonToolbar,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonLabel,
    IonItem,
    IonCardHeader,
    IonContent,
    IonCol,
    IonList,
    IonCardContent,
    IonCard,
    IonIcon,
    IonApp,
    IonRouterOutlet,
    MainContentComponent,
    FooterComponent,
    playlistComponent,
    AsyncPipe,
    MenuComponent,
    HeaderComponent,
  ],
})
export class AppComponent {
  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );
  playlistShowed$: Observable<boolean> = this.store.select(queueShowedSelector);

  constructor() {}
}
