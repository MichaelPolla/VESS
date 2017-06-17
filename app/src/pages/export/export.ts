import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer'

@Component({
  selector: 'page-export',
  templateUrl: 'export.html'
})
export class ExportPage {

  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController, 
    public navParams: NavParams) {}

  ionViewDidLoad() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      this.emailComposer.open(email);
      if(available) { 
        // In fact, the code should be there, but it doesn't work,
        // "available"" is always false - although the emailComposer can be called...!
        // Last checked : 18.06.2017
        }
    });

    let email = {
      to: 'michael@polla.net',
      subject: 'VESS test',
      body: "VESSSSS ça marche !",
      isHtml: true
    };
  }
}
