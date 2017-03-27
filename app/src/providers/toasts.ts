import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Toast } from 'ionic-native';

@Injectable()
export class Toasts {

  constructor(private platform: Platform, private toastCtrl: ToastController) {}
  
  /** Shows a native or non-native Toast, depending of the platform.  
   *  If no duration is provided, default is 3500.
   *  In Android, "short" is 2000ms and "long" is 3500ms.
  */
  public showToast(message: string, duration?: number) {
    if(!duration) duration = 3500;
    if (!this.platform.is('core')) {
      Toast.show(message, duration.toString(), "bottom").subscribe();
    } else {
      this.showNativeToast(message, duration);
    }

  }

  private showNativeToast(message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}





