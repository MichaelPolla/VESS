import { FilePath } from '@ionic-native/file-path';
import { Geoloc } from './../../models/geoloc';
import { Test, Layer } from './../../models/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
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

  public lastImage: string = null;
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
  private destinationRootDirectory: string;

  constructor(
    private camera: Camera,
    public alertCtrl: AlertController,
    private dataService: DataService,
    private file: File,
    private filePath: FilePath,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private toasts: Toasts,
    private translate: TranslateProvider,
    private geolocation: Geolocation) {

    if (this.platform.is('ios')) {
      // This will only print when on iOS
      this.destinationRootDirectory = cordova.file.documentsDirectory;
    }else if(this.platform.is('android')){
      this.destinationRootDirectory = cordova.file.externalDataDirectory;
    }else{
      this.toasts.showToast(this.translate.get('ERROR'));
    }
    

    this.stepView = this.navParams.get('stepView');
    this.currentTest = this.dataService.getCurrentTest();

    let picturePath = "";
    switch (this.stepView) {
      case 1://test
        this.currentTest.comment = "";
        this.title = translate.get('PICTURE_OF_WHOLE_BLOCK');
        this.dirName = "blocks";
        //check if file exist
        picturePath = this.currentTest.picture;
        this.defaultPicture = "./assets/icon/two-layers-example.png";
        this.instructions = translate.get('PICTURE_OF_WHOLE_BLOCK_INSTRUCTIONS');
        break;
      case 5://block
        this.currentLayer = this.dataService.getCurrentLayer();
        this.layerNumber = this.currentLayer.num;

        this.title = this.translate.get('PICTURE_OF_LAYER') + " " + this.layerNumber + "  (" + this.currentLayer.minThickness + "-" + this.currentLayer.maxThickness + " cm)";
        this.dirName = "layers";
        picturePath = this.dataService.getCurrentLayer().picture;
        this.defaultPicture = "./assets/icon/generic-image.png";
        this.instructions = translate.get('PICTURE_OF_LAYER_INSTRUCTIONS');
        break;
    }

    this.file.checkFile(this.destinationRootDirectory, picturePath).then(_ => {
      //read picture
      this.file.readAsDataURL(this.destinationRootDirectory, picturePath).then((pictureAsBase64) => {
        this.imageFile = pictureAsBase64;
      });
    }).catch(err => {
      //file doesn't exist, so display exemple picture for how to take photo
      this.imageFile = this.defaultPicture;
    });
  }

  takePicture() {
    const options = {
      quality: 90,
      correctOrientation: true // Fix the 90° picture rotation on Android devices. Note that when using the front camera, pictures are usally vertically flipped.
    }
    this.camera.getPicture(options).then((imagePath) => {
      let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      this.copyFileToLocalDir(correctPath, currentName, Utils.getDatetimeFilename('.jpg'));
    }, (error) => {
      this.toasts.showToast(this.translate.get('ERROR_CREATING_PICTURE'));
    });
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(
      success => { 
      this.lastImage = newFileName;
      this.saveData(); },
      error => {
    this.toasts.showToast(this.translate.get('ERROR_SAVING_PICTURE'));
    });
  }
  /**
   * Return the full path to an image, if it exists.
   * Example: "file:///data/user/0/ch.hepia.vess/files/1534408546442.jpg"
   * @param img The image to get the path.
   */
  public getPathForImage(img: string) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  private saveData(){
    switch (this.stepView) {
      case 1:
        this.currentTest.picture = this.lastImage;
        this.takeGeolocation();
        break;
      case 5:
        this.dataService.getCurrentLayer().picture = this.lastImage;
        break;
    }

    this.dataService.saveParcels();

  } 

  private takeGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.dataService.getCurrentTest().geolocation = new Geoloc(resp.coords);
      this.dataService.saveParcels();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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

  addTestComment() {
    let alert = this.alertCtrl.create({
      title: this.translate.get('COMMENT'),
      message: this.translate.get('COMMENT_TEST'),
      inputs: [
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
          }
        }
      ]
    });
    alert.present();
  }
}
