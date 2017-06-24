import { Test } from './../../models/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

declare var cordova;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  public imageFile: string;
  private isOfagUser: boolean = false;
  private currentTest: Test;
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
    private dataService: DataService,
    private file: File,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toasts: Toasts,
    private translate: TranslateProvider) {

    this.stepView = this.navParams.get('stepView');
    this.currentTest = this.dataService.getCurrentTest();

    let filePath = "";
    switch (this.stepView) {
      case 1:
        this.title = translate.get('PICTURE_OF_WHOLE_BLOCK');
        this.dirName = "blocks";
        //check if file exist
        filePath = this.currentTest.picture;
        this.defaultPicture = "./assets/icon/two-layers-example.png";
        this.instructions = translate.get('PICTURE_OF_WHOLE_BLOCK_INSTRUCTIONS');
        break;
      case 5:
        this.title = translate.get('PICTURE_OF_LAYER');
        this.dirName = "layers";
        filePath = this.dataService.getCurrentLayer().picture;
        this.defaultPicture = "./assets/icon/generic-image.png";
        this.instructions = translate.get('PICTURE_OF_LAYER_INSTRUCTIONS');
        break;
    }

    this.file.checkFile(this.destinationRootDirectory, filePath).then(_ => {
      //read picture
      this.file.readAsBinaryString(this.destinationRootDirectory, filePath).then((pictureAsBinary) => {
        this.imageFile = "data:image/jpeg;base64," + pictureAsBinary;
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
      targetWidth: 1000, //TODO: check if it necessary to resize picture, and if so, set correct values
      targetHeight: 1000,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((pictureAsBinary) => {
      //read new image
      this.imageFile = "data:image/jpeg;base64," + pictureAsBinary;
      //check if directory exist
      this.file.checkDir(this.destinationRootDirectory, this.dirName).then(success => {
        this.savePicture(pictureAsBinary);
      }, error => {
        this.file.createDir(this.destinationRootDirectory, this.dirName, true).then(success => {
          this.savePicture(pictureAsBinary);
        }, error => {
          this.toasts.showToast(this.translate.get('ERROR_CREATING_PICTURE_FOLDER'));
        });
      });
    }, (err) => {
      this.toasts.showToast(this.translate.get('ERROR_CREATING_PICTURE'));
    });
  }

  private savePicture(imagePath: any) {
    this.imageNamePath = this.dirName + "/" + Utils.getDatetimeFilename('.jpg');
    this.file.writeFile(this.destinationRootDirectory, this.imageNamePath, imagePath, true).then(success => { // Store file
    }, error => {
      this.toasts.showToast(this.translate.get('ERROR_SAVING_PICTURE'));
    });
    switch (this.stepView) {
      case 1:
        this.currentTest.picture = this.imageNamePath;
        break;
      case 5:
        this.dataService.getCurrentLayer().picture = this.imageNamePath;
        break;
    }


    this.dataService.saveParcels;
  }

  validationStep() {
    if (this.isOfagUser && this.imageFile == this.defaultPicture) { // OFAG user must take a picture
      this.toasts.showToast(this.translate.get('PLEASE_TAKE_PICTURE'));
    } else {
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
}
