import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { Test } from '../../models/parcel';

@Component({
  selector: 'page-modal-picture',
  templateUrl: 'modal-picture.html'
})
export class ModalPicturePage {

  imgSrc: string;
  type: string;
  helpNumber: number;
  resume:Test;
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
      case 'resume':
        this.resume = this.navParams.get('resume');
        break;
    }
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
