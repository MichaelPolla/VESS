import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Test } from './../../models/parcel';
// Pages
import { ConsultationParcelsPage } from '../consultation-parcels/consultation-parcels';
import { ExportPage } from './../export/export';
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  ionViewDidLoad() { 
    let showTestResult;
    if(showTestResult = this.navParams.get('showTestResult') != null) {
      this.showResume(showTestResult)
    }
  }

  showPage(pageName: String) {
    switch (pageName) {
      case "notation":
        this.navCtrl.push(ParcelsTestsPage);
        break;
      case "consultation":
        this.navCtrl.push(ConsultationParcelsPage);
        break;
      case "settings":
        this.navCtrl.push(SettingsPage);
        break;
      case "email":
        this.navCtrl.push(ExportPage);
        break;
    }
  }

    showResume(currentTest: Test) {
    let modal = this.modalCtrl.create(ModalPicturePage, { type: "resume", resume: currentTest });
    modal.present();
  }
}
