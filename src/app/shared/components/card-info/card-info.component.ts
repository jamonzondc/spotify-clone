import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output,} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  IonImg,
  IonLabel,
} from '@ionic/angular/standalone';
import {Card} from 'src/app/shared/view-models/card.type';
import {ImagePipe} from "../../pipe/image/image.pipe";

@Component({
  selector: 'spotify-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardSubtitle,
    IonLabel,
    IonCardHeader,
    IonIcon,
    IonButton,
    IonImg,
    IonCard,
    DatePipe,
    ImagePipe,
  ],
})
export class CardInfoComponent {
  @Input() data!: Card;
  @Output() played: EventEmitter<void> = new EventEmitter<void>();
  @Output() view: EventEmitter<void> = new EventEmitter<void>();
}
