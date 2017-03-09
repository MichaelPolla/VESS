import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from 'ionic-native';
// Pages
import { LayerListPage } from '../layer-list/layer-list';
// Providers
import { RulerService } from '../../providers/ruler-service';

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
  heightRuler: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rulerService: RulerService) {
    this.code = this.navParams.get('code');

    // Get Height of Ruler in px with :
    // param1: height of image ruler in px 
    // param 2: number of px for one centimeter in the image.
    this.rulerService.getHeightStyle(846, 56).then((value: number) => {
      this.heightRuler = value;
    }).catch((error: string) => {
      Toast.show(error, "long", "bottom").subscribe(toast => { console.log(toast); });
    });

    switch (this.code) {

      case 1:
        this.title = 'La plupart des agrégats obtenus en appliquant une très faible pression mesurent :';
        this.items = [
          { title: 'Moins de 6 mm', checked: false, code2: 1 },
          { title: 'Jusqu\'à 7 cm', checked: false, code2: 2 }
        ];
        break;

      case 2:
        Toast.show("Le niveau de terre est SQ3", "long", "bottom").subscribe(
          toast => {
            console.log(toast);
          }
        );
        break;

      case 3:
        this.title = 'Les mottes fermées font généralement plus de 10 cm';
        this.items = [
          { title: 'Moins de 30\% des mottes fermées mesurent moins de 7cm', checked: false, code2: 1 },
          { title: 'Presqu\'aucune motte ne mesure moins de 7 cm', checked: false, code2: 2 }
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

    } else if (this.code == 3) {
      if (this.code2 == 1) {  // => SQ4
        layerScore = 4;

      } else if (this.code2 == 2) { // => SQ5
        layerScore = 5;
      }
    }

    if (layerScore) {
      this.navCtrl.push(LayerListPage, {
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
