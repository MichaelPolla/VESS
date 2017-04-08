import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Block, Layer } from './../../app/parcel';
// Pages
import { CameraPage } from '../camera/camera';
import { Notation1Page } from '../notation-1/notation-1';
import { ParcelsTestsPage } from './../parcels-tests/parcels-tests';
//Providers
import { ParcelService } from './../../providers/parcel-service';
import { Toasts } from './../../providers/toasts';

@Component({
  selector: 'page-layer-list',
  templateUrl: 'layer-list.html'
})
export class LayerListPage {
  nbLayers: number;
  listItems: Array<{ title: string, index: number, score: number }> = [];
  stepView: number;
  score: number;
  layers: Layer[];
  private currentLayer: Layer;
  private currentBlock: Block;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private parcelService: ParcelService,
    private platform: Platform,
    public toasts: Toasts) { }

  ionViewDidLoad() {
    this.stepView = this.navParams.get('stepView');
    this.currentBlock = this.parcelService.getCurrentBlock();
    this.layers = this.currentBlock.layers;

    if (this.navParams.get('score') != null) {
      this.currentLayer = this.parcelService.getCurrentLayer();
      let toastMsg = "La qualité de la couche " + this.currentLayer.num + " est SQ" + this.currentLayer.score;
      this.toasts.showToast(toastMsg);
    }

    for (let i = 0; i < this.layers.length; i++) {
      this.listItems.push({ title: "Couche " + (i + 1), index: i, score: this.layers[i].score })
    }
  }

  layerSelected(layerIndex: number) {
    this.parcelService.selected[3] = layerIndex;
    if (this.platform.is('core')) {
      // Running on desktop
      // Skipping CameraPage as it requires Cordova, unavailable on regular browser
      this.navCtrl.push(Notation1Page)
    } else {
      this.navCtrl.push(CameraPage, { stepView: 5 })
    }
  }

  blockScore() {
    let blockScore = 0;
    let layersWithScore = 0;
    for (let i = 0; i < this.layers.length; i++) {
      blockScore += this.layers[i].score;
      if (this.layers[i].score) {
        layersWithScore += 1;
      }
    }
    // TODO: temporary, should use the correct formula, taking in account the layers sizes
    blockScore /= this.layers.length;

    if (layersWithScore == this.layers.length) {
      this.navCtrl.push(ParcelsTestsPage, { step: 2, blockScore: blockScore });
    } else {
      let toastMsg = "La notation n'a pas été effectuée pour toutes les couches.";
      this.toasts.showToast(toastMsg);
    }
  }
}
