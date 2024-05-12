import { Component, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { PlayerControllersComponent } from '../player-controllers/player-controllers.component';
import { PlayerInfoComponent } from '../player-info/player-info.component';
import { PlayerOptionsComponent } from '../player-options/player-options.component';

@Component({
  selector: 'spotify-footer',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    PlayerInfoComponent,
    PlayerControllersComponent,
    PlayerOptionsComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {}
}
