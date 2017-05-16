import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Test } from '../../models/parcel';
import { Camera, File } from 'ionic-native';

declare var cordova;

@Component({
  selector: 'component-resume-view',
  templateUrl: 'resume.html'
})
export class ResumeComponent {

  @Input() resume: Test;

  public imageFileBlock: string;
  public imageFileLayers: string[];
  defaultPicture: string;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log(this.resume);
    this.defaultPicture = "./assets/icon/two-layers-example.png";
    //read block
    File.checkFile(cordova.file.dataDirectory, this.resume.picture).then(_ => {
      //read picture
      File.readAsBinaryString(cordova.file.dataDirectory, this.resume.picture).then((pictureAsBinary) => {
        this.imageFileBlock = "data:image/jpeg;base64," + pictureAsBinary;
      });
    }).catch(err => {
      //file doesn't exist, so display exemple picture for how to take photo
      this.imageFileBlock = this.defaultPicture;
    });
    this.defaultPicture ="./assets/icon/generic-image.png";
    for (let layer of this.resume.layers) {
      //read block
      File.checkFile(cordova.file.dataDirectory, layer.picture).then(_ => {
        //read picture
        File.readAsBinaryString(cordova.file.dataDirectory, layer.picture).then((pictureAsBinary) => {
          this.imageFileLayers.push("data:image/jpeg;base64," + pictureAsBinary);
        });
      }).catch(err => {
        //file doesn't exist, so display exemple picture for how to take photo
        this.imageFileLayers.push(this.defaultPicture);
      });
    }
  }
}
