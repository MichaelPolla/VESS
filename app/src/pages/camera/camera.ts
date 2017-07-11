import { Geoloc } from './../../models/geoloc';
import { Test, Layer } from './../../models/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

// Pages
import { DefiningLayerPage } from '../defining-layer/defining-layer';
import { Notation1Page } from '../notation-1/notation-1';
// Providers
import { DataService } from './../../providers/data-service';
import { Toasts } from './../../providers/toasts';
import { TranslateProvider } from '../../providers/translate/translate'
import { Utils } from './../../providers/utils';
import { Geolocation } from '@ionic-native/geolocation';

declare var cordova;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  public imageFile: string;
  private isOfagUser: boolean = false;
  private currentTest: Test;
  public layerNumber: number;
  private currentLayer: Layer;
  title: string;
  stepView: number;
  imageNamePath: string;
  dirName: string;
  instructions: string;
  defaultPicture: string;

  //TODO: Only Android ; should be something like cordova.file.dataDirectory for iOS
  private readonly destinationRootDirectory: string = cordova.file.externalDataDirectory;

  constructor(
    private camera: Camera,
    public alertCtrl: AlertController,
    private dataService: DataService,
    private file: File,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toasts: Toasts,
    private translate: TranslateProvider,
    private geolocation: Geolocation) {

    this.stepView = this.navParams.get('stepView');
    this.currentTest = this.dataService.getCurrentTest();

    let filePath = "";
    switch (this.stepView) {
      case 1://test
        this.currentTest.comment = "";
        this.title = translate.get('PICTURE_OF_WHOLE_BLOCK');
        this.dirName = "blocks";
        //check if file exist
        filePath = this.currentTest.picture;
        this.defaultPicture = "./assets/icon/two-layers-example.png";
        this.instructions = translate.get('PICTURE_OF_WHOLE_BLOCK_INSTRUCTIONS');
        break;
      case 5://block
        this.currentLayer = this.dataService.getCurrentLayer();
        this.layerNumber = this.currentLayer.num;

        this.title = this.translate.get('PICTURE_OF_LAYER') + " " + this.layerNumber + "  (" + this.currentLayer.minThickness + "-" + this.currentLayer.maxThickness + " cm)";
        this.dirName = "layers";
        filePath = this.dataService.getCurrentLayer().picture;
        this.defaultPicture = "./assets/icon/generic-image.png";
        this.instructions = translate.get('PICTURE_OF_LAYER_INSTRUCTIONS');
        break;
    }

    this.file.checkFile(this.destinationRootDirectory, filePath).then(_ => {
      //read picture
      this.file.readAsDataURL(this.destinationRootDirectory, filePath).then((pictureAsBase64) => {
        this.imageFile = pictureAsBase64;
      });
    }).catch(err => {
      //file doesn't exist, so display exemple picture for how to take photo
      this.imageFile = this.defaultPicture;
    });
  }

  takePicture() {
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 90,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000, //TODO: check if it necessary to resize picture, and if so, set correct values
      targetHeight: 1000,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((pictureAsBinary) => {
      //read new image
      this.imageFile = "data:image/jpeg;base64," + pictureAsBinary;
      //check if directory exist
      this.file.checkDir(this.destinationRootDirectory, this.dirName).then(success => {
        this.savePicture(this.imageFile);
      }, error => {
        this.file.createDir(this.destinationRootDirectory, this.dirName, true).then(success => {
          this.savePicture(this.imageFile);
        }, error => {
          this.toasts.showToast(this.translate.get('ERROR_CREATING_PICTURE_FOLDER'));
        });
      });
    }, (err) => {
      this.toasts.showToast(this.translate.get('ERROR_CREATING_PICTURE'));
    });
  }

  private savePicture(imageBase64: any) {
    // Convert the base64 string in a Blob
    let imgWithMeta = imageBase64.split(",")
    // base64 data
    let imgData = imgWithMeta[1].trim();
    // content type
    let imgType = imgWithMeta[0].trim().split(";")[0].split(":")[1];

    let dataBlob: Blob = this.b64toBlob(imgData, imgType, 512);
    this.imageNamePath = this.dirName + "/" + Utils.getDatetimeFilename('.jpg');
    this.file.writeFile(this.destinationRootDirectory, this.imageNamePath, dataBlob, true).then(success => { // Store file
    }, error => {
      this.toasts.showToast(this.translate.get('ERROR_SAVING_PICTURE'));
    });
    switch (this.stepView) {
      case 1:
        this.currentTest.picture = this.imageNamePath;
        //take geoloc
        this.geolocation.getCurrentPosition().then((resp) => {
          this.dataService.getCurrentTest().geolocation = new Geoloc(resp.coords);
          this.dataService.saveParcels();
        }).catch((error) => {
          console.log('Error getting location', error);
        });


        break;
      case 5:
        this.dataService.getCurrentLayer().picture = this.imageNamePath;
        break;
    }


    this.dataService.saveParcels();
  }

  validationStep() {
    if (this.isOfagUser && this.imageFile == this.defaultPicture) { // OFAG user must take a picture
      this.toasts.showToast(this.translate.get('PLEASE_TAKE_PICTURE'));
    } else {
      this.dataService.saveParcels();
      switch (this.stepView) {
        case 1:
          this.navCtrl.push(DefiningLayerPage, {
            stepView: this.stepView + 1,
            picture: this.imageFile
          })
          break;
        case 5:
          this.navCtrl.push(Notation1Page)
          break;
      }
    }
  }

  // convert base64 to Blob
  // Copy from https://github.com/ionic-team/ionic-native/issues/806
  b64toBlob(b64Data, contentType, sliceSize) {
    let byteCharacters = atob(b64Data);

    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);

    }
    let blob = new Blob(byteArrays, { type: contentType });

    return blob;
  }

  addTestComment() {
    let alert = this.alertCtrl.create({
      title: this.translate.get('COMMENT'),
      message: this.translate.get('COMMENT_TEST'),
      inputs:[
        {
          name: 'comment',
          placeholder: this.translate.get('COMMENT'),
          type: 'text'
        }]
      ,
      buttons: [
        {
          text: this.translate.get('CANCEL'),
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.get('ADD'),
          handler: data => {
            this.currentTest.comment = data.comment;
            console.log(this.currentTest)
          }
        }
      ]
    });
    alert.present();
  }
}
