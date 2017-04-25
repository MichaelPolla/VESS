import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { DataService } from '../../providers/data-service';
import { Storage } from '@ionic/storage';

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
  userType: any;

  firstName:string;
  lastName:string;
  mail:string
  idOfag:string;
  user:User;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public dataService: DataService,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    //init
    this.dataService.getUserInfo().then((value) => {
      if (value != null) {
        this.user = value;

        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.userType = this.user.userType;
        this.mail = this.user.mail;
        this.idOfag = this.user.idOfag;
      }else{

        this.user = new User({ firstName: "", lastName: "", userType: "", mail: "", idOfag:""});
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

  saveUserInfo(){
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.userType = this.userType;
    this.user.mail = this.mail;
    this.user.idOfag = this.idOfag;
    if(this.firstName!="" && this.lastName!="" && this.mail!="" && this.userType != "ofag"){
      this.dataService.save("user", this.user);
    }else if(this.firstName!="" && this.lastName!="" && this.mail!="" && this.userType == "ofag" && this.idOfag !=""){
      this.dataService.save("user", this.user);
    }else{
      this.showAlert("Error", "Veuillez remplir les champs correctement")
    }
  }



}
