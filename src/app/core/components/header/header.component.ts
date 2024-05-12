import { Component, ViewChild, inject } from '@angular/core';
import {
  IonToolbar,
  IonButtons,
  IonTitle,
  IonHeader,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonItemDivider,
  IonLabel,
  IonPopover,
  IonContent,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowDownCircleOutline,
  chevronBackCircle,
  chevronForwardCircle,
  notificationsOutline,
  openOutline,
} from 'ionicons/icons';
import { Navigation } from 'src/app/shared';

@Component({
  selector: 'spotify-header',
  standalone: true,
  imports: [
    IonContent,
    IonLabel,
    IonItemDivider,
    IonAvatar,
    IonItem,
    IonList,
    IonIcon,
    IonButton,
    IonHeader,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonPopover,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private navigation: Navigation = inject(Navigation);

  constructor() {
    addIcons({
      chevronBackCircle,
      chevronForwardCircle,
      arrowDownCircleOutline,
      notificationsOutline,
      openOutline,
    });
  }

  @ViewChild('popover') popover!: IonPopover;

  openPopover(event: Event) {}

  selectOption(option: string) {
    // Haz algo con la opción seleccionada
    console.log(option);
    this.popover.dismiss();
  }

  public back() {
    this.navigation.navigateBack();
  }

  public forward() {
    this.navigation.navigateForward();
  }
}
