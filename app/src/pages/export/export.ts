import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User, UserType } from '../../models/user';
import { Parcel, Test } from '../../models/parcel';
import { EmailComposer } from '@ionic-native/email-composer';

import { DataService } from '../../providers/data-service';

@Component({
  selector: 'page-export',
  templateUrl: 'export.html'
})
export class ExportPage {
  private userInfo: User;
  private parcels: Parcel;
  private test:Test;
  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService) { }

  ionViewDidLoad() {
    this.test = this.navParams.get('test');
    this.dataService.getUserInfo().then((user) => {
      if (user != null) {
        this.userInfo = user;
        this.dataService.getParcels().then((parcels) => {
          if (parcels != null) {
            this.parcels = parcels;
            this.emailComposer.isAvailable().then((available: boolean) => {
              if (available) {
                // In fact, the code should be there, but it doesn't work,
                // "available"" is always false - although the emailComposer can be called...!
                // Last checked : 18.06.2017
              }
            });

            let email = {
              to: this.userInfo.mail,
              subject: 'VESS test:'+this.test.name,
              body: "",
              isHtml: true,
              attachments: [
                'base64:export.csv//' + btoa(JSON.stringify(this.test))
              ]
            };

            // Send a text message using default options
            this.emailComposer.open(email);

          }
        });

      }
    });

  }

  ConvertToCSV = function (objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }
    return str;
  }
}
