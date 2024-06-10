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
import { queueShowedSelector, SpotifyState } from './core';
import { FooterMDComponent } from './core/components/footer-md/footer-md.component';

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
    FooterMDComponent,
    playlistComponent,
    AsyncPipe,
    MenuComponent,
    HeaderComponent,
  ],
})
export class AppComponent {
  backgroundColor: string = '';
  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );
  playlistShowed$: Observable<boolean> = this.store.select(queueShowedSelector);

  constructor() {
    this.backgroundColor = this.getRandomColor();
  }

  private getRandomColor(): string {
    const colors: string[] = [
      '#FF6B6B',
      '#4ECDC4',
      '#1A535C',
      '#6B5B95',
      '#355C7D',
      '#2A363B',
      '#E84A5F',
      '#2A363B',
      '#FECEAB',
      '#FF847C',
      '#E84A5F',
      '#2A363B',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `linear-gradient(180deg, ${colors[randomIndex]}, transparent)`;
  }
}
