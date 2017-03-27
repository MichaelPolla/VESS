import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Pages
import { CameraPage } from '../camera/camera';
import { Notation1Page } from '../notation-1/notation-1';
//Providers
import { NotationService, Layer } from '../../providers/notation-service';
import { Toasts } from './../../providers/toasts';

@Component({
  selector: 'page-layer-list',
  templateUrl: 'layer-list.html'
})
export class LayerListPage {
  nbLayers: number;
  listItems: Array<{ title: string, index: number, score: string }> = [];
  stepView: number;
  score: number;
  layers: Layer[];
  layersWithScore: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public notationService: NotationService,
    public platform: Platform,
    public toasts: Toasts) { }

  ionViewDidLoad() {
    this.layers = this.notationService.layers;
    this.stepView = this.navParams.get('stepView');

    if (this.navParams.get('score') != null) {
      this.score = this.navParams.get('score');
      this.notationService.actualLayer.score = this.score;
      let toastMsg = "La qualité de la couche " + this.notationService.actualLayer.num + " est SQ" + this.score;
      this.toasts.showToast(toastMsg);
    }

    for (var i = 0; i < this.layers.length; i++) {
      let scoreParam = "";
      this.layersWithScore = 0;
      if (this.layers[i].score) {
        scoreParam = " — score : " + this.layers[i].score;
        this.layersWithScore += 1;
      }
      this.listItems.push({ title: "Couche " + (i + 1), index: i, score: scoreParam })
    }
  }

  layerSelected(layerIndex: number) {
    this.notationService.setActualLayer(layerIndex);
    if (this.platform.is('core')) {
      // Running on desktop
      // Skipping CameraPage as it requires Cordova, unavailable on regular browser
      this.navCtrl.push(Notation1Page)
    } else {
      this.navCtrl.push(CameraPage, { stepView: 5 })
    }
  }

  blockScore() {
    if (this.layersWithScore == this.layers.length) {
      // Show block score
    } else {
      let toastMsg = "La notation n'a pas été effectuée pour toutes les couches.";
      this.toasts.showToast(toastMsg);
    }
  }
}
