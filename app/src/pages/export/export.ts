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
                'base64:'+this.test.name+'.csv//' + btoa(this.strJSONToCSV(JSON.stringify(this.test)))
              ]
            };

            // Send a text message using default options
            this.emailComposer.open(email);

          }
        });

      }
    });

  }

  strJSONToCSV(string) {
    //split substring 

    //creat layer string
    var layerString = string.substring(string.lastIndexOf('[')+1,string.lastIndexOf(']')) 
    layerString = layerString.replace(/num/g, '\r\nLayer num'); //g for delet all 

    //creat field string
    var fieldString1 = string.substring(0,string.lastIndexOf('"layers":['))
    var fieldString2 = string.substring(string.lastIndexOf(']')+2, string.length)
    var fieldString = fieldString1 + fieldString2;

    //delete { } ""
    fieldString = fieldString.replace(/{/g, ''); //g for delet all 
    fieldString = fieldString.replace(/}/g, '');
    fieldString = fieldString.replace(/"/g, '');

    layerString = layerString.replace(/{/g, ''); //g for delet all 
    layerString = layerString.replace(/}/g, '');
    layerString = layerString.replace(/"/g, '');

    return fieldString+"\r\n"+layerString;
  }

}
