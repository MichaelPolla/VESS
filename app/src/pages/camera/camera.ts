import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, File, Toast  } from 'ionic-native';
import { DefiningLayerPage } from '../defining-layer/defining-layer';

/*
  Useful docs :
  - Camera in Ionic2 doc : https://ionicframework.com/docs/v2/native/camera
  - Camera with Ionic2 tutorial : http://blog.ionic.io/10-minutes-with-ionic-2-using-the-camera-with-ionic-native
  - Capturing image and save in phone Ionc2 doc: https://ionicframework.com/docs/v2/native/file/
*/

declare var cordova;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  public imageFile: string;
  stepView:number;
  pathImgBlock:string = cordova.file.dataDirectory+"/imgBlock";

  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    this.stepView = this.navParams.get('stepView');

    //check if file exist
    File.checkFile(cordova.file.dataDirectory, "imgBlock/newImg.jpg").then(_ => {
      //read picture
      File.readAsBinaryString(cordova.file.dataDirectory, "imgBlock/newImg.jpg").then((imagePath) => {
        this.imageFile = "data:image/jpeg;base64," + imagePath;
      });
    }).catch(err => {
      //file doesn't exist, so display exemple picture for how to take photo
      this.imageFile = './assets/icon/mignon.gif';
    });
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000, //TODO: check if it necessary to resize picture, and if so, set correct values
      targetHeight:1000
    }).then((imagePath) => {
        //read new image
        this.imageFile = "data:image/jpeg;base64," + imagePath;
        //check if directory exist
        File.checkDir(cordova.file.dataDirectory, "imgBlock").then(success=>{
          //Directory is already created, so write imgFile
          File.writeFile(cordova.file.dataDirectory, "imgBlock/newImg.jpg", imagePath, true)
        }, error => {
          //Directory is not created, so you have to create it
          File.createDir(cordova.file.dataDirectory, "imgBlock", true).then(success => {
            //Directory is created, so you have to create image file
            File.writeFile(cordova.file.dataDirectory, "imgBlock/newImg.jpg", imagePath, true);
          }, error => {
            Toast.show("Error when created directory", "long", "bottom").subscribe(toast => {console.log(toast);});
          });
        });

    }, (err) => {
      Toast.show("Error picture", "long", "bottom").subscribe(toast => {console.log(toast);});
    });
  }

  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
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
