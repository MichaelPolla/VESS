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

  public lastImage: string;
  private lastImageFileName: string;
  private isOfagUser: boolean = false;
  private currentTest: Test;
  public layerNumber: number;
  private currentLayer: Layer;
  title: string;
  stepView: number;
  imageNamePath: string;
  instructions: string;
  defaultImage: string;

  constructor(
    private camera: Camera,
    public alertCtrl: AlertController,
    private dataService: DataService,
    private file: File,
    private filePath: FilePath,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public  utils: Utils,
    private toasts: Toasts,
    private translate: TranslateProvider,
    private geolocation: Geolocation) {

    this.stepView = this.navParams.get('stepView');
    this.currentTest = this.dataService.getCurrentTest();

    let existingPicture = "";
    switch (this.stepView) {
      case 1: // Block
        this.currentTest.comment = "";
        this.title = translate.get('PICTURE_OF_WHOLE_BLOCK');
        //check if file exist
        existingPicture = this.currentTest.picture;
        this.defaultImage = "./assets/icon/two-layers-example.png";
        this.instructions = translate.get('PICTURE_OF_WHOLE_BLOCK_INSTRUCTIONS');
        break;
      case 5: // Layer
        this.currentLayer = this.dataService.getCurrentLayer();
        this.layerNumber = this.currentLayer.num;

        this.title = this.translate.get('PICTURE_OF_LAYER') + " " + this.layerNumber + "  (" + this.currentLayer.minThickness + "-" + this.currentLayer.maxThickness + " cm)";
        existingPicture = this.dataService.getCurrentLayer().picture;
        this.defaultImage = "./assets/icon/generic-image.png";
        this.instructions = translate.get('PICTURE_OF_LAYER_INSTRUCTIONS');
        break;
    }
    this.lastImage = existingPicture ? existingPicture : this.defaultImage;
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

  /**
   * Copy a file to the local directory of the device (cordova.file.dataDirectory).
   * @param namePath Path of the file to copy.
   * @param currentName Name of the file to copy.
   * @param newFileName File name for the copied file.
   */
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(
      success => { 
      this.lastImageFileName = newFileName;
      this.lastImage = Utils.getPathForImage(this.lastImageFileName);
      this.saveData(); },
      error => {
    this.toasts.showToast(this.translate.get('ERROR_SAVING_PICTURE'));
    });
  }

  private saveData(){
    switch (this.stepView) {
      case 1:
        this.currentTest.picture = this.lastImageFileName;
        this.takeGeolocation();
        break;
      case 5:
        this.dataService.getCurrentLayer().picture = this.lastImageFileName;
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
    if (this.isOfagUser && this.imageFile == this.defaultImage) { // OFAG user must take a picture
      this.toasts.showToast(this.translate.get('PLEASE_TAKE_PICTURE'));
    } else {
      this.dataService.saveParcels();
      switch (this.stepView) {
        case 1:
          this.navCtrl.push(DefiningLayerPage, {
            stepView: this.stepView + 1
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
