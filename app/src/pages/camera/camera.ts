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
  pageTitle: string;
  stepView: number;
  imageNamePath: string;
  dirName: string;
  description: string;
  defaultPicture: string;

  constructor(
    private camera: Camera,
    private dataService: DataService,
    private file: File,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toasts: Toasts) {
    this.stepView = this.navParams.get('stepView');
    this.currentTest = this.dataService.getCurrentTest();

    let filePath = "";
    switch (this.stepView) {
      case 1:
        this.pageTitle = "Photo du bloc entier";
        this.dirName = "blocks";
        //check if file exist
        filePath = this.currentTest.picture;
        this.defaultPicture = "./assets/icon/two-layers-example.png";
        this.description = "Prenez une photo montrant le bloc entier et ses différentes couches, ainsi que le trou dont il est extrait :";
        break;
      case 5:
        this.pageTitle = "Photo de la couche";
        this.dirName = "layers";
        filePath = this.dataService.getCurrentLayer().picture;
        this.defaultPicture ="./assets/icon/generic-image.png";
        this.description = "Prenez une photo de la couche :";
        break;
    }

    this.file.checkFile(cordova.file.dataDirectory, filePath).then(_ => {
      //read picture
      this.file.readAsBinaryString(cordova.file.dataDirectory, filePath).then((pictureAsBinary) => {
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
      this.file.checkDir(cordova.file.dataDirectory, this.dirName).then(success => {
        this.savePicture(pictureAsBinary);
      }, error => {
        this.file.createDir(cordova.file.dataDirectory, this.dirName, true).then(success => {
          this.savePicture(pictureAsBinary);
        }, error => {
          this.toasts.showToast("Erreur lors de la création du répertoire de l'image.");
        });
      });
    }, (err) => {
      this.toasts.showToast("Erreur lors de la création de l'image.");
    });
  }

  private savePicture(imagePath: any) {
    this.imageNamePath = this.dirName + "/" + Utils.getDatetimeFilename('.jpg');
    this.file.writeFile(cordova.file.dataDirectory, this.imageNamePath, imagePath, true).then(success => { // Store file
    }, error => {
      this.toasts.showToast("Erreur lors de l'enregistrement de l'image.");
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
    switch (this.stepView) {
      case 1:
        if (this.isOfagUser && this.imageFile == this.defaultPicture) { // OFAG user must take a picture
          this.toasts.showToast("Veuillez prendre une photo.");
        } else {
          this.navCtrl.push(DefiningLayerPage, {
            stepView: this.stepView + 1,
            picture: this.imageFile
          })
        }
        break;
      case 5:
        if (this.isOfagUser && this.imageFile == this.defaultPicture) { // OFAG user must take a picture
          this.toasts.showToast("Veuillez prendre une photo.");
        } else {
          this.navCtrl.push(Notation1Page)
        }
        break;
    }
  }
}
