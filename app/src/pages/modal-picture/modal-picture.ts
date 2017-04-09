import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';

/*
  Ionic2 modals :
    https://ionicframework.com/docs/v2/2.0.0-beta.10/api/components/modal/Modal/
    https://alexdisler.com/2016/03/27/modals-in-ionic-framework-2/
*/
@Component({
  selector: 'page-modal-picture',
  templateUrl: 'modal-picture.html'
})
export class ModalPicturePage {

  imgSrc: string;
  type: string;
  helpNumber: number;
  constructor(public viewCtrl: ViewController,
    public navParams: NavParams,
    private platform: Platform) { }
  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {
      this.closeModal();
    });
    this.type = this.navParams.get('type');
    switch (this.type) {
      case 'picture':
        this.imgSrc = this.navParams.get('imgSrc');
        break;
      case 'help':
        this.helpNumber = 1;
        break;
    }
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
