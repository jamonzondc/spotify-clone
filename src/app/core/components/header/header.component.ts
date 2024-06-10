import {Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {
  arrowDownCircleOutline,
  chevronBackCircle,
  chevronForwardCircle,
  notificationsOutline,
  openOutline,
} from 'ionicons/icons';
import {Navigation} from 'src/app/shared';

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
  @ViewChild('popover') popover!: IonPopover;
  private navigation: Navigation = inject(Navigation);

  constructor(private el: ElementRef) {
    addIcons({
      chevronBackCircle,
      chevronForwardCircle,
      arrowDownCircleOutline,
      notificationsOutline,
      openOutline,
    });
  }



  public back() {
    this.navigation.navigateBack();
  }

  public forward() {
    this.navigation.navigateForward();
  }
}
