import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Toast } from 'ionic-native';
// Pages
import { CameraPage } from '../camera/camera';
import { Notation1Page } from '../notation-1/notation-1';
//Providers
import { NotationService } from '../../providers/notation-service';

@Component({
  selector: 'page-layer-list',
  templateUrl: 'layer-list.html'
})
export class LayerListPage {
  nbLayers: number;
  items: Array<{ title: string, id: number }>;
  stepView: number;
  score: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public notationService: NotationService,
    public platform: Platform) { }

  ionViewDidLoad() {
    if (this.navParams.get('nbLayers') != null) {
      this.nbLayers = this.navParams.get('nbLayers');
    } else {
      this.nbLayers = this.notationService.layers.length;
    }
    this.stepView = this.navParams.get('stepView');
    this.items = [];
    for (var i = 1; i <= this.nbLayers; i++) {
      this.items.push({ title: "Couche " + i, id: i })
    }
    if (this.navParams.get('score') != null) {
      let score = this.navParams.get('score');
      Toast.show("La qualité de la couche est SQ" + score, "long", "bottom").subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }


  layerSelected(layerId: number) {
    this.notationService.actualLayer = layerId;
    if (this.platform.is('core')) {
      // Running on desktop
      // Skipping CameraPage as it requires Cordova, unavailable on regular browser
      this.navCtrl.push(Notation1Page)

    } else {
      this.navCtrl.push(CameraPage, {
        stepView: 5
      })
    }
  }

}
