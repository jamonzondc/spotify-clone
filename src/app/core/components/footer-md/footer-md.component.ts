import { Component, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonChip } from '@ionic/angular/standalone';
import { PlayerControllersComponent } from '../player-controllers/player-controllers.component';
import { PlayerInfoComponent } from '../player-info/player-info.component';
import { PlayerOptionsComponent } from '../player-options/player-options.component';

@Component({
  selector: 'spotify-footer-md',
  standalone: true,
  imports: [
    IonChip,
    IonCol,
    IonRow,
    IonGrid,
    PlayerInfoComponent,
    PlayerControllersComponent,
    PlayerOptionsComponent,
  ],
  templateUrl: './footer-md.component.html',
  styleUrl: './footer-md.component.scss',
})
export class FooterMDComponent implements OnInit {
  ngOnInit(): void {}
}
