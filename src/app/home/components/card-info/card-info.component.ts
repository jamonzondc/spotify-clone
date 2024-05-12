import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  IonImg,
  IonLabel,
} from '@ionic/angular/standalone';
import { CardType, DataType } from 'src/app/shared/entities/card.type';

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
  ],
})
export class CardInfoComponent {
  @Input() type!: DataType;
  @Input() data!: CardType;
  @Output() play: EventEmitter<void> = new EventEmitter<void>();
  @Output() view: EventEmitter<void> = new EventEmitter<void>();
}
