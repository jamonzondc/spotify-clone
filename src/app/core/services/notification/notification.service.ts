import {inject, Injectable} from '@angular/core';
import {Notification} from './notification';
import {Platform, ToastController} from "@ionic/angular";
import {ErrorsConstantService} from "../../utilities/errors.constant";

@Injectable()
export class NotificationService extends Notification {
  platform: Platform = inject(Platform);
  toastController: ToastController = inject(ToastController);
  errorsConstantService: ErrorsConstantService = inject(ErrorsConstantService);


  public override async showNotification(code: string = ''): Promise<void> {
    const message: string = this.errorsConstantService.getErrorMessage(code);

    if (this.platform.is('ios') || this.platform.is('android'))
      return await this.showNotificationMobile(message);

    return await this.showNotificationWeb(message);
  }

  private async showNotificationWeb(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      header: 'Info',
      message,
      color: 'primary',
      duration:3000,
      position:'top',

    });
    await toast.present();
  }

  private showNotificationMobile(message: string): void {
    //TODO: Implementar notificaciones para dispositivos móviles
  }
}
