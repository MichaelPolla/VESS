import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
import { ConsultationParcelsPage } from '../consultation-parcels/consultation-parcels'
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage{

  constructor(public navCtrl: NavController, public modalCtrl:ModalController ) {
  }

  showPage(pageName: String) {
    switch(pageName) {
      case "notation":
        this.navCtrl.push(ParcelsTestsPage);
        break;
      case "consultation":
        this.navCtrl.push(ConsultationParcelsPage);
        break;
      case "settings":
        this.navCtrl.push(SettingsPage);
        break;
      case "resume":
        let modal = this.modalCtrl.create(ModalPicturePage, { type:"resume" });
        modal.present();
        break;
    }
  }
}
