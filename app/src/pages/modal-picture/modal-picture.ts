import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the ModalPicture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.

  Ionic2 modals : 
    https://ionicframework.com/docs/v2/2.0.0-beta.10/api/components/modal/Modal/ 
    https://alexdisler.com/2016/03/27/modals-in-ionic-framework-2/
    
*/
@Component({
  selector: 'page-modal-picture',
  templateUrl: 'modal-picture.html'
})
export class ModalPicturePage {

  constructor(public viewCtrl: ViewController) {}

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('Hello ModalPicturePage Page');
  }

}
