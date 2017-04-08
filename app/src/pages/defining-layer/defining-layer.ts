import { Block, Layer } from './../../app/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
//Providers
import { ParcelService } from './../../providers/parcel-service';
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from './../../providers/toasts';

@Component({
  selector: 'page-defining-layer',
  templateUrl: 'defining-layer.html'
})
export class DefiningLayerPage {
  stepView: number;
  imageFile: string;
  nbLayers: number;
  nbLayersOld: number;
  sizeOfParcel: number;
  heightRuler: number;
  totalSize: number;
  private currentBlock: Block;

  listLayers: Array<{ numLayer: number, sizeLayer: number }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private parcelService: ParcelService,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts) { }

  ionViewDidLoad() {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = this.navParams.get('picture');
    this.currentBlock = this.parcelService.getCurrentBlock();

    if (!this.platform.is('core')) {
      // Get Height of Ruler in px with :
      // param1: height of image ruler in px
      // param 2: number of px for one centimeter in the image.
      this.rulerService.getHeightStyle(846, 56).then((value: number) => {
        this.heightRuler = value;
      }).catch((error: string) => {
        this.toasts.showToast(error);
      });
    }

    //init nbLayers and listLayers and sizeOfParcel
    this.nbLayers = 1;
    this.sizeOfParcel = 0;
    this.nbLayersOld = this.nbLayers;
    this.listLayers = [{ numLayer: 1, sizeLayer: 0 }];
    this.calcTotalSize();

  }

  changeNbLayers(nbLayers) {
    if (nbLayers < this.nbLayersOld) {
      this.listLayers.pop();
    } else {
      this.listLayers.push({ numLayer: nbLayers, sizeLayer: 0 });
    }
    this.nbLayersOld = nbLayers;
    this.calcTotalSize();
  }
  changeSizeLayers() {
    this.calcTotalSize();
  }
  calcTotalSize() {
    this.totalSize = 0;
    for (let layer of this.listLayers) {
      this.totalSize += layer.sizeLayer;
    }
  }

  validationStep() {
    if (this.nbLayers >= 1 && this.nbLayers <= 5) {
      for (var i = 1; i <= this.nbLayers; i++) {
        this.currentBlock.layers.push(new Layer(i));
      }
      this.navCtrl.push(GifViewPage, {
        stepView: this.stepView + 1,
        nbLayers: this.nbLayers,
      })
    } else {
      this.toasts.showToast("Veuillez correctement renseigner les champs.");
    }
  }

}
