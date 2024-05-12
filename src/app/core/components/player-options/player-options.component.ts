import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonRange,
  IonRow,
  RangeCustomEvent,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import {
  desktopOutline,
  expandOutline,
  informationCircleOutline,
  listOutline,
  micOutline,
  volumeHighOutline,
  volumeLowOutline,
  volumeMediumOutline,
  volumeMuteOutline,
} from 'ionicons/icons';
import {
  SpotifyState,
  switchQueueVisibility,
  volumeChange,
} from '../../../shared/store';
type ButtonView = {
  iconName: string;
  disabled?: boolean;
  isActive?: boolean;
  action: () => void;
};

@Component({
  selector: 'spotify-player-options',
  templateUrl: './player-options.component.html',
  styleUrls: ['./player-options.component.scss'],
  standalone: true,
  imports: [
    IonRange,
    IonProgressBar,
    IonButton,
    IonItem,
    IonLabel,
    IonCol,
    IonGrid,
    IonRow,
    IonIcon,
    NgFor,
  ],
})
export class PlayerOptionsComponent implements OnInit {
  buttons: ButtonView[] = [
    {
      iconName: 'information-circle-outline',
      action: () => this.onInformationClick(),
    },
    {
      iconName: 'mic-outline',
      action: () => this.onMicClick(),
    },
    {
      iconName: 'list-outline',
      action: () => {
        console.log('list-----------');
        this.onListClick();
      },
    },
    {
      iconName: 'desktop-outline',
      disabled: true,
      action: () => this.onDesktopClick(),
    },
    {
      iconName: 'volume-medium-outline',
      action: () => this.onVolumeMuteClick(),
    },
    {
      iconName: 'expand-outline',
      action: () => this.onExpandClick(),
    },
  ];

  private store: Store<{ spotify: SpotifyState }> = inject(
    Store<{ spotify: SpotifyState }>
  );

  constructor() {
    addIcons({
      informationCircleOutline,
      micOutline,
      listOutline,
      desktopOutline,
      volumeLowOutline,
      volumeMediumOutline,
      volumeHighOutline,
      volumeMuteOutline,
      expandOutline,
    });
  }

  ngOnInit() {}

  pinFormatter(value: number) {
    return `${value}%`;
  }

  public onInformationClick(): void {}
  public onMicClick(): void {
    console.log(this.buttons);
  }
  public onListClick(): void {
    this.store.dispatch(switchQueueVisibility());
  }
  public onDesktopClick(): void {}
  public onVolumeMuteClick(): void {}
  public onVolumeChange(event: RangeCustomEvent): void {
    const volume: number = (Number(event.detail.value) || 0) / 100;
    this.store.dispatch(volumeChange({ volume }));
  }
  public onExpandClick(): void {}
}
