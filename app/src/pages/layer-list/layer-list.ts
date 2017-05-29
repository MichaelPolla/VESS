import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { Test, Layer } from './../../models/parcel';
// Pages
import { CameraPage } from '../camera/camera';
import { Notation1Page } from '../notation-1/notation-1';
import { HomePage } from './../home-page/home-page';
import { ModalPicturePage } from './../modal-picture/modal-picture';
//Providers
import { DataService } from '../../providers/data-service';
import { Toasts } from '../../providers/toasts';

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
  private currentTest: Test;

  constructor(public navCtrl: NavController,
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private dataService: DataService,
    private platform: Platform,
    public toasts: Toasts) { }

  ionViewDidLoad() {
    this.stepView = this.navParams.get('stepView');
    this.currentTest = this.dataService.getCurrentTest();
    this.layers = this.currentTest.layers;

    if (this.navParams.get('score') != null) {
      this.currentLayer = this.dataService.getCurrentLayer();
      let toastMsg = "La qualité de la couche " + this.currentLayer.num + " est SQ" + this.currentLayer.score;
      this.toasts.showToast(toastMsg);
    }

    for (let i = 0; i < this.layers.length; i++) {
      this.listItems.push({ title: "Couche " + (i + 1), index: i, score: this.layers[i].score })
    }
  }

  layerSelected(layerIndex: number) {
    this.dataService.selected[2] = layerIndex;
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
      this.dataService.saveParcels();
      this.navCtrl.push(HomePage);
    } else {
      let toastMsg = "La notation n'a pas été effectuée pour toutes les couches.";
      this.toasts.showToast(toastMsg);
    }
  }

  goResume(){
        this.dataService.saveParcels(); // TODO : check if necessary
    let modal = this.modalCtrl.create(ModalPicturePage, { type:"resume", resume: this.currentTest });
   modal.present();
  }

}
