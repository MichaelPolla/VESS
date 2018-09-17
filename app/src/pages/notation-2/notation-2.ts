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
import { TranslateProvider } from './../../providers/translate/translate';

/**
 * Notation - Step 2
 */
@Component({
  selector: 'page-notation-2',
  templateUrl: 'notation-2.html'
})


export class Notation2Page {

  items: Array<{ title: string, checked: Boolean, imgSrc: String, code2: number }>;
  title: string;
  subTitle: string;
  code: number;
  code2: number;
  layerNumber: number;
  heightRuler: number;
  private currentLayer: Layer;
  private helpId: string;

  constructor(
    private dataService: DataService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts,
    private translate: TranslateProvider
  ) { }

  ionViewDidLoad() {
    this.currentLayer = this.dataService.getCurrentLayer();
    this.layerNumber = this.currentLayer.num;
    this.title = this.translate.get('NOTATION_OF_LAYER') + " " + this.layerNumber + "  (" + this.currentLayer.minThickness + "-" + this.currentLayer.maxThickness + " cm)";
    this.code = this.navParams.get('code');

    if (!this.platform.is('core')) {
      this.rulerService.getHeightStyle(846, 56).then((value: number) => {
        this.heightRuler = value;
      }).catch((error: string) => {
        this.toasts.showToast(error);
      });
    }

    switch (this.code) {

      case 1: // "No closed clods" was selected on Step 1
        this.subTitle = this.translate.get('NOTATION_STEP2_IF_STEP1_1_OPTIONS_TITLE');
        this.items = [
          {
            title: this.translate.get('NOTATION_STEP2_IF_STEP1_1_OPTION1'),
            checked: false,
            imgSrc: './assets/pictures/sq1.jpg',
            code2: 1
          },
          {
            title: this.translate.get('NOTATION_STEP2_IF_STEP1_1_OPTION2'),
            checked: false,
            imgSrc: './assets/pictures/sq2.jpg',
            code2: 2
          }
        ];
        this.helpId = "step2_no_closed_clods";
        break;

      case 3: // "Majority of closed clods" was selected on Step 1
        this.subTitle = this.translate.get('NOTATION_STEP2_IF_STEP1_3_OPTIONS_TITLE');
        this.items = [
          {
            title: this.translate.get('NOTATION_STEP2_IF_STEP1_3_OPTION1'),
            checked: false,
            imgSrc: './assets/pictures/sq3.jpg',
            code2: 1
          },
          {
            title: this.translate.get('NOTATION_STEP2_IF_STEP1_3_OPTION2'),
            checked: false,
            imgSrc: './assets/pictures/sq2.jpg',
            code2: 2
          }
        ];
        this.helpId = "step2_mainly_closed_clods";
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
