import { Component } from '@angular/core';
import { Layer } from './../../models/parcel';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { Test } from '../../models/parcel';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { Toasts } from './../../providers/toasts';
// Providers
import { DataService } from '../../providers/data-service';
import { TranslateProvider } from '../../providers/translate/translate'
import { Utils } from '../../providers/utils';

declare var cordova;

export class LayerInfo {
  public img?: string;
  public layer?: Layer;

  public constructor(layer: Layer) {
    this.layer = layer;
  }
}

@Component({
  selector: 'page-export',
  templateUrl: 'export.html'
})

export class ExportPage {
  private userInfo: User;
  private test: Test;
  public imageFileBlock: string;
  public attachements: string[] = [];
  defaultPicture: string;

  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    private file: File,
    private toasts: Toasts,
    private translate: TranslateProvider,
    private platform: Platform) { }

  ionViewDidLoad() {
    this.test = this.navParams.get('test');
    console.log(this.test);

    this.dataService.getUserInfo().then((user) => {
      if (user != null) {
        this.userInfo = user;
        this.dataService.getParcels().then((parcels) => {
          if (parcels != null) {
            this.sendEmail();
          }
        });
      }
    });
  }

  strJSONToCSV(string) {
    var csv = ',first name,last name,user type,mail\r\n';
    csv += 'userInfo,' + this.test.user.firstName + ',' + this.test.user.lastName + ',' + this.test.user.userType + ',' + this.test.user.mail + '\r\n';
    csv += '\r\n';
    csv += ',identifiant,depth,thickness,score,picture,date,comment,latitude,longitude\r\n';
    for (let layer of this.test.layers) {
      if (layer.picture != undefined) {
        let pathFileLayer = layer.picture.split("/"); //split path 
        csv += 'layer,' + layer.num + ',' + layer.minThickness + '-' + layer.maxThickness + ',' + layer.thickness + ',' + layer.score + ',' + pathFileLayer[1] + ',' + ',' + layer.comment + '\r\n';
      } else {
        csv += 'layer,' + layer.num + ',' + layer.minThickness + '-' + layer.maxThickness + ',' + layer.thickness + ',' + layer.score + ',' + 'no image,' + ',' + layer.comment + '\r\n';
      }
    }

    let pathFileBloc;
    if (this.test.picture != undefined) {
      pathFileBloc = this.test.picture.split("/"); //split path
      pathFileBloc = pathFileBloc[1];
    }
    else {
      pathFileBloc = 'no image'
    }

    if (this.test.geolocation != undefined)
      csv += 'test,' + this.test.name + ',' + '0-' + this.test.thickness + ',' + this.test.thickness + ',' + this.test.score + ',' + pathFileBloc + ',' + this.test.date + ',' + this.test.comment + ',' + this.test.geolocation.latitude + ',' + this.test.geolocation.longitude + '\r\n';
    else
      csv += 'test,' + this.test.name + ',' + '0-' + this.test.thickness + ',' + this.test.thickness + ',' + this.test.score + ',' + pathFileBloc + ',' + this.test.date + ',' + this.test.comment + ',' + '' + ',' + '' + '\r\n';
    return csv;
  }

  /**
   * send email if all picture are read 
   */
  sendEmail() {
      let testJson: any = Object.assign({}, this.test); // copy object

      //delete field
      delete testJson.isCompleted;
      delete testJson.id;
      delete testJson.user.language;

      let newJson = '{ "SpadeTest":' + JSON.stringify(testJson) + '}';//add spadetest to json
      this.attachements.push('base64:' + this.test.name + '.csv//' + btoa(this.strJSONToCSV(newJson)));
      this.attachements.push('base64:' + this.test.name + '.json//' + btoa(newJson))

      if(this.test.picture) this.attachements.push(Utils.getPathForImage(this.dataService.getLocalDirectory(), this.test.picture)); // Add block picture if existing
      for (let layer of this.test.layers) { // Add existing layers pictures
        if(layer.picture) this.attachements.push(Utils.getPathForImage(this.dataService.getLocalDirectory(), layer.picture));
      }

      console.log(this.attachements);

      let email = {
        to: this.userInfo.mail,
        subject: 'VESS test name:' + this.test.name,
        body: "",
        isHtml: true,
        attachments: this.attachements
      };

      // Send a text message using default options
      this.emailComposer.open(email);
      this.navCtrl.pop();
  }
}
