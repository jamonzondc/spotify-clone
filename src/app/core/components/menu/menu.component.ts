import { Component, OnInit } from '@angular/core';
import {
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonList,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, search } from 'ionicons/icons';

@Component({
  selector: 'spotify-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonItem,
    IonList,
  ],
})
export class MenuComponent implements OnInit {
  constructor() {
    addIcons({ home, search });
  }

  ngOnInit() {}
}
