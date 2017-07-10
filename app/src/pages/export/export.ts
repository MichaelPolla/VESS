import { Geoloc } from './../../models/geoloc';
import { Component } from '@angular/core';
import { Layer } from './../../models/parcel';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { User, UserType } from '../../models/user';
import { Parcel, Test } from '../../models/parcel';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';

import { DataService } from '../../providers/data-service';

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
  private parcels: Parcel;
  private test: Test;
  public imageFileBlock: string;
  public attachements: string[];
  defaultPicture: string;

  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    private file: File,
    private platform: Platform) { }

  ionViewDidLoad() {
    this.test = this.navParams.get('test');
    console.log(this.test);



    this.dataService.getUserInfo().then((user) => {
      if (user != null) {
        this.userInfo = user;
        this.dataService.getParcels().then((parcels) => {
          if (parcels != null) {
            this.parcels = parcels;
            this.readPicture();
          }
        });

      }
    });

  }

  strJSONToCSV(string) {
    var csv= ',first name,last name,user type,mail\r\n';
    csv += 'userInfo,'+this.test.user.firstName+','+this.test.user.lastName+','+this.test.user.userType+','+this.test.user.mail+'\r\n';
    csv += '\r\n';
    csv += ',identifiant,depth,thickness,score,picture,date,comment,latitude,longitude\r\n';
    for(let layer of this.test.layers){
      if(layer.picture!=undefined){
        let pathFileLayer = layer.picture.split("/"); //split path 
        csv += 'layer,'+layer.num+','+layer.minThickness+'-'+layer.maxThickness+','+layer.thickness+','+layer.score+','+pathFileLayer[1]+','+','+layer.comment+'\r\n';
      }else{
        csv += 'layer,'+layer.num+','+layer.minThickness+'-'+layer.maxThickness+','+layer.thickness+','+layer.score+','+'no image,'+','+layer.comment+'\r\n';
      }
    }
    let pathFileBloc = this.test.picture.split("/"); //split path

    if(this.test.geolocation!=undefined)
      csv += 'test,'+this.test.name+','+'0-'+this.test.thickness+','+this.test.thickness+','+this.test.score+','+pathFileBloc[1]+','+this.test.date+','+this.test.comment+','+this.test.geolocation.latitude+','+this.test.geolocation.longitude+'\r\n';
    else
      csv += 'test,'+this.test.name+','+'0-'+this.test.thickness+','+this.test.thickness+','+this.test.score+','+pathFileBloc[1]+','+this.test.date+','+this.test.comment+','+''+','+''+'\r\n';
    return csv;
  }

  /**
   * Read all picture and send email
   */
  readPicture() {
    let cntReadPicture = 0;
    //read pictures
    if (!this.platform.is('core')) { // Check that we aren't running on desktop
      this.defaultPicture = "./assets/icon/two-layers-example.png";
      this.attachements = [];
      //read block
      this.file.checkFile(cordova.file.externalDataDirectory, this.test.picture).then(_ => {
        //read picture
        this.file.readAsDataURL(cordova.file.externalDataDirectory, this.test.picture).then((pictureAsBase64) => {
          let imgData = this.b64Streamtob64Data(pictureAsBase64);
          let pathFile = this.test.picture.split("/"); //split path 
          this.attachements.push('base64:' + pathFile[1] + '//' + imgData);
          cntReadPicture++;
          this.sendEmail(cntReadPicture);
        }).catch(err => {
          console.log(err);
        });

      }).catch(err => {
        console.log(err);
        cntReadPicture++;
        this.sendEmail(cntReadPicture);
      });

      //read layers
      for (let layer of this.test.layers) { //read all layers

        //read layer
        this.file.checkFile(cordova.file.externalDataDirectory, layer.picture).then(_ => {
          //read picture
          this.file.readAsDataURL(cordova.file.externalDataDirectory, layer.picture).then((pictureLayerAsBase64) => {
            let imgDataLayer = this.b64Streamtob64Data(pictureLayerAsBase64);
            let pathFileLayer = layer.picture.split("/"); //split path 
            this.attachements.push('base64:' + pathFileLayer[1] + '//' + imgDataLayer);
            cntReadPicture++;

            this.sendEmail(cntReadPicture);
          }).catch(err => {
            console.log(err);
          });

        }).catch(err => {
          console.log(err);
          cntReadPicture++;
          this.sendEmail(cntReadPicture);
        });
      }

    }
  }


  /**
   * convert base64 stream to base64 data
   */
  b64Streamtob64Data(b64Stream) {
    // Convert the base64 string in a Blob
    let imgWithMeta = b64Stream.split(",")
    // base64 data
    let imgData = imgWithMeta[1].trim();
    return imgData;
  }

  /**
   * send email if all picture are read 
   */
  sendEmail(cntReadPicture) {
    // test if all picture are read because promise are async
    if (cntReadPicture == this.test.layers.length + 1) {
      let testJson:any=Object.assign({},this.test); // copy object

      //delete field
      delete testJson.isCompleted;
      delete testJson.id;
      delete testJson.user.language;

      let newJson = '{ "SpadeTest":' + JSON.stringify(testJson) + '}';//add spadetest to json
      this.attachements.push('base64:' + this.test.name + '.csv//' + btoa(this.strJSONToCSV(newJson)));
      this.attachements.push('base64:' + this.test.name + '.json//' + btoa(newJson))

      this.emailComposer.isAvailable().then((available: boolean) => {
        if (available) {
          // In fact, the code should be there, but it doesn't work,
          // "available"" is always false - although the emailComposer can be called...!
          // Last checked : 18.06.2017
        }
      });

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

}
