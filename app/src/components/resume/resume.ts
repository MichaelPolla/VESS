import { Layer } from './../../models/parcel';
import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Test } from '../../models/parcel';
import { File } from '@ionic-native/file';
import { ExportPage } from '../../pages/export/export';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Toasts } from './../../providers/toasts';
import { TranslateProvider } from '../../providers/translate/translate'

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
  private destinationRootDirectory: string;

  public imageFileBlock: string;
  public lastNumLayer: number;
  public layerArray: LayerInfo[];
  defaultPicture: string;
  constructor(
    private file: File,
    public navCtrl: NavController,
    private translate: TranslateProvider,
    public platform: Platform,
    private toasts: Toasts,
    private browserTab: BrowserTab) { }

  ngOnInit() {
    if (this.platform.is('ios')) {
      // This will only print when on iOS
      this.destinationRootDirectory = cordova.file.documentsDirectory;
    }else if(this.platform.is('android')){
      this.destinationRootDirectory = cordova.file.externalDataDirectory;
    }else{
      this.toasts.showToast(this.translate.get('ERROR'));
    }

    this.lastNumLayer = this.resume.layers.length;
    if (!this.platform.is('core')) { // Check that we aren't running on desktop
      this.defaultPicture = "./assets/icon/two-layers-example.png";
      //read block
      this.file.checkFile(this.destinationRootDirectory, this.resume.picture).then(_ => {
        //read picture
        this.file.readAsDataURL(this.destinationRootDirectory, this.resume.picture).then((pictureAsBase64) => {
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
        this.file.checkFile(this.destinationRootDirectory, layer.picture).then(_ => {
          //read picture
          this.file.readAsDataURL(this.destinationRootDirectory, layer.picture).then((pictureAsBase64) => {
            this.layerArray[layer.num - 1].img = pictureAsBase64;
            this.layerArray = this.layerArray.slice(); // Good for re-update the view https://stackoverflow.com/a/39201747/1975002
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
