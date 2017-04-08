import { ParcelService } from './../../providers/parcel-service';
import { Layer } from './../../app/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
// Pages
import { VerifNotationPage } from '../verif-notation/verif-notation';
// Providers
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from './../../providers/toasts';

@Component({
  selector: 'page-notation-2',
  templateUrl: 'notation-2.html'
})
export class Notation2Page {
  //declaration of field
  items: Array<{ title: string, checked: Boolean, code2: number }>;
  title: string;
  code: number;
  code2: number;
  layerNumber: number;
  heightRuler: number;
  private currentLayer: Layer;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private parcelService: ParcelService,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts) { }

  ionViewDidLoad() {
    this.currentLayer = this.parcelService.getCurrentLayer();
    this.layerNumber = this.currentLayer.num;
    this.code = this.navParams.get('code');

    if (!this.platform.is('core')) {
      this.rulerService.getHeightStyle(846, 56).then((value: number) => {
        this.heightRuler = value;
      }).catch((error: string) => {
        this.toasts.showToast(error);
      });
    }

    switch (this.code) {

      case 1:
        this.title = 'La plupart des agrégats mesurent :';
        this.items = [
          { title: 'Moins de 1 cm', checked: false, code2: 1 },
          { title: 'Jusqu\'à 7 cm', checked: false, code2: 2 }
        ];
        break;

      case 2:
        this.title = 'Principalement agrégats de 1 à 10cm et moins de 30\% des agrégats font moins de 1cm';
        break;

      case 3:
        this.title = 'Les mottes fermées font généralement plus de 10 cm';
        this.items = [
          { title: 'Moins de 30\% des agrégats mesurent moins de 7cm', checked: false, code2: 1 },
          { title: 'Presqu\'aucun agrégats ne mesure moins de 7 cm', checked: false, code2: 2 }
        ];
        break;
    }
  }

  validationStep() {
    let layerScore;
    if (this.code == 1) {
      if (this.code2 == 1) {  // => SQ1
        layerScore = 1;

      } else if (this.code2 == 2) { // => SQ2
        layerScore = 2;
      }

    } else if (this.code == 2) { // => SQ3
      layerScore = 3;
    } else if (this.code == 3) {
      if (this.code2 == 1) {  // => SQ4
        layerScore = 4;

      } else if (this.code2 == 2) { // => SQ5
        layerScore = 5;
      }
    }

    if (layerScore) {
      this.navCtrl.push(VerifNotationPage, {
        score: layerScore
      })
    }
  }

  updateCheckedBox(position, item) {
    let cnt: number = 0;

    for (let item of this.items) {
      if (position == cnt) {
        item.checked = true;
        this.code2 = item.code2;
      } else {
        item.checked = false;
      }
      cnt++;
    }
  }
}
