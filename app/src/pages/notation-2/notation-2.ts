import { Layer } from './../../models/parcel';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from 'ionic-angular';
// Pages
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { VerifNotationPage } from '../verif-notation/verif-notation';
// Providers
import { DataService } from '../../providers/data-service';
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from '../../providers/toasts';

@Component({
  selector: 'page-notation-2',
  templateUrl: 'notation-2.html'
})
export class Notation2Page {
  //declaration of field
  items: Array<{ title: string, checked: Boolean, imgSrc: String, code2: number }>;
  title: string;
  code: number;
  code2: number;
  layerNumber: number;
  heightRuler: number;
  private currentLayer: Layer;
  private helpId: string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private dataService: DataService,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts) { }

  ionViewDidLoad() {
    this.currentLayer = this.dataService.getCurrentLayer();
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
          { title: 'Moins de 1 cm', checked: false, imgSrc: './assets/pictures/agregats_moins_1cm.png', code2: 1 },
          { title: 'Jusqu\'à 7 cm', checked: false, imgSrc: './assets/pictures/aggregats_jusque_7cm.png', code2: 2 }
        ];
        this.helpId = "pas_motte_fermee";
        break;

      case 3:
        this.title = 'Les mottes fermées font généralement plus de 10 cm';
        this.items = [
          { title: 'Moins de 30\% des agrégats* ou mottes* sont de taille inférieure à 7cm', checked: false,  imgSrc: './assets/pictures/moins_30pourcent_aggregats_moins_7cm.png', code2: 1 },
          { title: 'Presque pas d\'agrégats* ou mottes* de taille inférieure à 7 cm', checked: false,  imgSrc: './assets/pictures/aucun_aggregat_moins_7cm.png', code2: 2 }
        ];
        this.helpId = "majoritairement_mottes_fermees";
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


  showModal(item_index) {
    let imgSrc = this.items[item_index].imgSrc; // TODO: pass this parameter to the modal so it can be used to show the picture.
    let pictureModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc, type: "picture" });
    pictureModal.present();
  }

}
