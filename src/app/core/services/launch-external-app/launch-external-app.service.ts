import {inject, Injectable} from '@angular/core';
import {LaunchExternalApp} from './launch-external-app';
import {Platform} from "@ionic/angular";
import {Browser} from "@capacitor/browser";

@Injectable()
export class LaunchExternalAppService extends LaunchExternalApp {
  platform: Platform = inject(Platform);
  
  public override async open(url: string = ''): Promise<void> {
    const path: string = `spotify:app:${url}`;
    if (this.platform.is('desktop')) {
      window.open(path, '_system');
    } else {
      await Browser.open({url: path});
    }
  }
}
