import { Layer } from './../../models/parcel';
import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Test } from '../../models/parcel';
import { File } from 'ionic-native';

declare var cordova;

export class LayerInfo {
  public img?: string;
  public layer?: Layer;

  public constructor(layer : Layer) {
    this.layer = layer;
  }
}

@Component({
  selector: 'component-resume-view',
  templateUrl: 'resume.html'
})
export class ResumeComponent {

  @Input() resume: Test;

  public imageFileBlock: string;

  public layerArray: LayerInfo[];
  defaultPicture: string;
  constructor(public navCtrl: NavController,
    private platform: Platform) {

  }

  ngOnInit() {
    if (!this.platform.is('core')) { // Check that we aren't running on desktop
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
      this.defaultPicture = "./assets/icon/generic-image.png";

      //init array
      this.layerArray = [];
      for (let layer of this.resume.layers)  //init all layers before read pictures of layer
        this.layerArray.push(new LayerInfo(layer));

      for (let layer of this.resume.layers) { //read all layers

        //read block
        File.checkFile(cordova.file.dataDirectory, layer.picture).then(_ => {
          console.log("CheckFile OK");
          //read picture
          File.readAsBinaryString(cordova.file.dataDirectory, layer.picture).then((pictureAsBinary) => {
            this.layerArray[layer.num - 1].img = "data:image/jpeg;base64," + pictureAsBinary;
            this.layerArray = this.layerArray.slice(); // Good for re-update the view https://stackoverflow.com/questions/39196766/angular-2-do-not-refresh-view-after-array-push-in-ngoninit-promise?answertab=votes#tab-top
          }).catch(err => {
            console.log(err);
          });
          console.log(this.layerArray);
        }).catch(err => {
          //file doesn't exist, so display example picture for how to take photo
          this.layerArray[layer.num - 1].img = this.defaultPicture;
          console.log("check file pas ok");
        });
      }


    }
  }
}
