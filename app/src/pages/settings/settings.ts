import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User, UserType } from '../../models/user';
import { Storage } from '@ionic/storage';
// Providers
import { DataService } from '../../providers/data-service';
import { TranslateProvider } from '../../providers/translate/translate'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  userType: UserType;
  firstName: string;
  lastName: string;
  mail: string
  idOfag: string;
  user: User;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public dataService: DataService,
    public alertCtrl: AlertController,
    private translate: TranslateProvider) {
  }

  ionViewDidLoad() {
    this.dataService.getUserInfo().then((value) => {
      if (value != null) {
        this.user = value;

        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.userType = this.user.userType;
        this.mail = this.user.mail;
        this.idOfag = this.user.idOfag;
      } else {
        this.userType = UserType.Anonymous;
        this.user = new User({ firstName: "", lastName: "", userType: this.userType, mail: "", idOfag: "" });
      }
    });
  }

  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  saveUserInfo() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.userType = this.userType;
    this.user.mail = this.mail;
    this.user.idOfag = this.idOfag;

    if (this.userType == UserType.Ofag && this.idOfag == null) {
      this.showAlert(this.translate.get('ERROR'), this.translate.get('PLEASE_FILL_IN_OFAG_ID'));
    } else {
      this.dataService.save("user", this.user);
    }
  }
}
