import { Test } from './../../models/parcel';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

// Pages
import { ExportPage } from './../export/export';
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
import { SettingsPage } from '../settings/settings';

// Providers
import { DataService } from '../../providers/data-service';
import { TranslateProvider } from './../../providers/translate/translate';


@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage {
  user: User;

  constructor(
    private dataService: DataService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateProvider) {
  }

  ionViewDidLoad() {
    this.dataService.getUserInfo().then((value) => {
      if (value != null) {
        this.user = value;
        this.translate.setLang(this.user.language);
      } else {
        this.translate.setLang('fr');
      }
    });

    let showTestResult;
    if (showTestResult = this.navParams.get('showTestResult') != null) {
      this.showResume(showTestResult)
    }
  }

  showPage(pageName: String) {
    switch (pageName) {
      case "notation":
        this.navCtrl.push(ParcelsTestsPage, {isConsultation: false});
        break;
      case "consultation":
        this.navCtrl.push(ParcelsTestsPage, {isConsultation: true});
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
