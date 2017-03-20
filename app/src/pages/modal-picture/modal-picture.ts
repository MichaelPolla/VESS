import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

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

  imgSrc:string;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
      this.imgSrc = this.navParams.get('imgSrc');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Hello ModalPicturePage Page');
  }

}
