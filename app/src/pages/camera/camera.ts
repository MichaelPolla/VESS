import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, File } from 'ionic-native';
import { DefiningLayerPage } from '../defining-layer/defining-layer';

/*
  Useful docs :
  - Camera in Ionic2 doc : https://ionicframework.com/docs/v2/native/camera
  - Camera with Ionic2 tutorial : http://blog.ionic.io/10-minutes-with-ionic-2-using-the-camera-with-ionic-native
*/

declare var cordova;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  public imageFile: string;
  stepView:number;
  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = './assets/icon/mignon.gif';
  }

    ionViewDidLoad() {
    console.log('Hello CameraPage Page');
  }

  takePicture() {
    Camera.getPicture({
      //destinationType: Camera.DestinationType.FILE_URI, //TODO: switch for iOS (see links)
      //encodingType: Camera.EncodingType.JPEG,
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000, //TODO: check if it necessary to resize picture, and if so, set correct values
      targetHeight:1000
    }).then((imagePath) => {
        this.imageFile = "data:image/jpeg;base64," + imagePath;
        //var currentName = imagePath.replace(/^.*[\\\/]/, '');
        //File.moveFile(cordova.file.tempDirectory, currentName, cordova.file.externalRootDirectory, "test.jpg");
    }, (err) => {
      console.log(err);
    });
  }


  validationStep(){
    this.navCtrl.push(DefiningLayerPage, {
      stepView: this.stepView+1,
    }).catch(()=> console.log('should I stay or should I go now'))
  }

  returnButton(){
    this.navCtrl.pop();
  }
}
