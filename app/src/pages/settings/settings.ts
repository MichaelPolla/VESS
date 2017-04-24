import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  userTypeControl;
  userTypeForm;
  userType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userTypeForm = new FormGroup({
          userTypeControl: new FormControl()
        });
  }

  ionViewDidLoad() {

  }

  userRadioChange(){
    this.userType = this.userTypeForm.value.userTypeControl;
  }



}
