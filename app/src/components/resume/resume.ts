import { Layer } from './../../models/parcel';
import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Test } from '../../models/parcel';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import { ExportPage } from '../../pages/export/export';
import { BrowserTab } from '@ionic-native/browser-tab';

declare var cordova;

export class LayerInfo {
  public img?: string;
  public layer?: Layer;

  public constructor(layer: Layer) {
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
  public lastNumLayer: number;
  public layerArray: LayerInfo[];
  defaultPicture: string;
  constructor(
    private file: File,
    public navCtrl: NavController,
    private platform: Platform,
    private translate: TranslateService,
    private browserTab: BrowserTab) { }

  ngOnInit() {
    this.lastNumLayer = this.resume.layers.length;
    if (!this.platform.is('core')) { // Check that we aren't running on desktop
      this.defaultPicture = "./assets/icon/two-layers-example.png";
      //read block
      this.file.checkFile(cordova.file.externalDataDirectory, this.resume.picture).then(_ => {
        //read picture
        this.file.readAsDataURL(cordova.file.externalDataDirectory, this.resume.picture).then((pictureAsBase64) => {
          this.imageFileBlock = pictureAsBase64;
        });
      }).catch(err => {
        //file doesn't exist, so display example picture for how to take photo
        this.imageFileBlock = this.defaultPicture;
      });
      this.defaultPicture = "./assets/icon/generic-image.png";

      //init array
      this.layerArray = [];
      for (let layer of this.resume.layers)  //init all layers before read pictures of layer
        this.layerArray.push(new LayerInfo(layer));

      for (let layer of this.resume.layers) { //read all layers

        //read block
        this.file.checkFile(cordova.file.externalDataDirectory, layer.picture).then(_ => {
          //read picture
          this.file.readAsDataURL(cordova.file.externalDataDirectory, layer.picture).then((pictureAsBase64) => {
            this.layerArray[layer.num - 1].img = pictureAsBase64;
            this.layerArray = this.layerArray.slice(); // Good for re-update the view https://stackoverflow.com/questions/39196766/angular-2-do-not-refresh-view-after-array-push-in-ngoninit-promise?answertab=votes#tab-top
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          //file doesn't exist, so display example picture for how to take photo
          this.layerArray[layer.num - 1].img = this.defaultPicture;
        });
      }


    } else {
      this.defaultPicture = "./assets/icon/generic-image.png";
      //init array
      this.layerArray = [];
      for (let layer of this.resume.layers)  //init all layers before read pictures of layer
        this.layerArray.push(new LayerInfo(layer));
      for (let layer of this.resume.layers) { //read all layers
        this.layerArray[layer.num - 1].img = this.defaultPicture;
      }
      this.imageFileBlock = this.defaultPicture;

    }
  }

  openMap(event) {
    
    event.stopPropagation();

    this.browserTab.isAvailable()
    .then((isAvailable: boolean) => {
      if (isAvailable) {
        this.browserTab.openUrl("http://maps.google.com/maps?q=" + this.resume.geolocation.latitude + "," + this.resume.geolocation.longitude )
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
  }

  exportTest(event) {
    this.navCtrl.push(ExportPage, { test: this.resume });
  }
}
