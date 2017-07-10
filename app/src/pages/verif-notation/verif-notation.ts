import { Camera } from '@ionic-native/camera';
import { Layer, Test } from './../../models/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';
// Pages
import { HomePage } from './../home-page/home-page';
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { Notation1Page } from '../notation-1/notation-1';
import { CameraPage } from '../camera/camera';
// Providers
import { DataService } from '../../providers/data-service';
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from '../../providers/toasts';
import { TranslateProvider } from '../../providers/translate/translate'
import { Utils } from './../../providers/utils';


@Component({
  selector: 'page-verif-notation',
  templateUrl: 'verif-notation.html'
})
export class VerifNotationPage {
  heightRuler: number;
  score: number;
  private helpId: string;
  items: Array<{ title: string, checked: Boolean, imgSrc?: string, code: number }>;
  criterias: Array<{ title: string, array: Array<{ title: string, checked: Boolean, imgSrc?: string, code: number }> }>;
  private currentLayer: Layer;
  private currentTest: Test;
  private nextLayerIndex: number;
  private lastLayer: Boolean = false;
  private comment: string;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private dataService: DataService,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts,
    private translate: TranslateProvider) { }

  ionViewDidLoad() {
    this.currentLayer = this.dataService.getCurrentLayer();
    this.currentTest = this.dataService.getCurrentTest();
    this.nextLayerIndex = this.currentTest.layers.indexOf(this.currentLayer) + 1;
    if (this.nextLayerIndex == this.currentTest.layers.length) {
      this.lastLayer = true;
    }

    if (!this.platform.is('core')) {
      this.rulerService.getHeightStyle(846, 56).then((value: number) => {
        this.heightRuler = value;
      }).catch((error: string) => {
        this.toasts.showToast(error);
      });
    }

    if (this.navParams.get('score') != null) {
      this.score = this.navParams.get('score');

      switch (this.score) {

        case 1:
          this.items = [
            {
              title: this.translate.get('VERIF_SCORE1_CRITERIA1_CHECK1'),
              checked: false,
              imgSrc: './assets/pictures/aggregat_moins_1cm.png',
              code: 1
            },
            {
              title: this.translate.get('VERIF_SCORE1_CRITERIA1_CHECK2'),
              checked: false,
              imgSrc: './assets/pictures/aggregat_moins_1cm.png',
              code: 2
            },
            {
              title: this.translate.get('VERIF_SCORE1_CRITERIA1_CHECK3'),
              checked: false,
              imgSrc: './assets/pictures/aggregat_moins_1cm.png',
              code: 3
            }
          ];
          this.criterias = [{ title: this.translate.get('VERIF_SCORE1_CRITERIA1_TITLE'), array: this.items }];
          this.helpId = "help_verif_score1";
          break;

        case 2:
          this.items = [
            {
              title: this.translate.get('VERIF_SCORE2_CRITERIA1_CHECK1'),
              checked: false,
              imgSrc: './assets/pictures/aggregat_jusque_7cm.png',
              code: 1
            },
            {
              title: this.translate.get('VERIF_SCORE2_CRITERIA1_CHECK2'),
              imgSrc: './assets/pictures/aggregat_jusque_7cm.png',
              checked: false,
              code: 2
            },
            {
              title: this.translate.get('VERIF_SCORE2_CRITERIA1_CHECK3'),
              checked: false,
              imgSrc: './assets/pictures/aggregat_jusque_7cm.png',
              code: 3
            }
          ];
          this.criterias = [{ title: this.translate.get('VERIF_SCORE2_CRITERIA1_TITLE'), array: this.items }];
          this.helpId = "help_verif_score2";
          break;

        case 3:
          this.items = [
            {
              title: this.translate.get('VERIF_SCORE3_CRITERIA1_CHECK1'),
              checked: false,
              imgSrc: './assets/pictures/no_picture.png',
              code: 1
            },
            {
              title: this.translate.get('VERIF_SCORE3_CRITERIA1_CHECK2'),
              checked: false,
              imgSrc: './assets/pictures/no_picture.png',
              code: 2
            },
            {
              title: this.translate.get('VERIF_SCORE3_CRITERIA1_CHECK3'),
              checked: false,
              imgSrc: './assets/pictures/fragment_1cm.png',
              code: 3
            }
          ];
          this.criterias = [{ title: this.translate.get('VERIF_SCORE3_CRITERIA1_TITLE'), array: this.items }];
          this.criterias.push({
            title: this.translate.get('VERIF_SCORE3_CRITERIA2_TITLE'),
            array: [{ title: this.translate.get('YES'), checked: false, imgSrc: './assets/pictures/fragment_sans_racine.png', code: 1 }]
          });
          this.helpId = "help_verif_score3";
          break;

        case 4:
          this.items = [
            {
              title: this.translate.get('VERIF_SCORE4_CRITERIA1_CHECK1'),
              checked: false, imgSrc: './assets/pictures/non_poreux.png',
              code: 1
            },
            {
              title: this.translate.get('VERIF_SCORE4_CRITERIA1_CHECK2'),
              checked: false,
              imgSrc: './assets/pictures/no_picture.png',
              code: 2
            }
          ];
          this.criterias = [{ title: this.translate.get('VERIF_SCORE4_CRITERIA1_TITLE'), array: this.items }];
          this.criterias.push({ title: 'Les racines se situent principalement autour des mottes ou au sein des pores grossiers visibles', array: [{ title: 'Oui', checked: false, imgSrc: './assets/pictures/racines_autour_mottes.png', code: 1 }] });
          this.helpId = "help_verif_score4";
          break;
        case 5:
          this.items = [
            {
              title: this.translate.get('VERIF_SCORE5_CRITERIA1_CHECK1'),
              checked: false,
              imgSrc: './assets/pictures/fragment_difficile_obtenir.png',
              code: 1
            },
            {
              title: this.translate.get('VERIF_SCORE5_CRITERIA1_CHECK2'),
              checked: false,
              imgSrc: './assets/pictures/no_picture.png',
              code: 2
            }
          ];
          this.criterias = [{ title: this.translate.get('VERIF_SCORE5_CRITERIA1_TITLE'), array: this.items }];
          this.criterias.push({
            title: this.translate.get('VERIF_SCORE5_CRITERIA2_TITLE'),
            array: [{ title: this.translate.get('YES'), checked: false, imgSrc: './assets/pictures/racines_autour_mottes.png', code: 1 }]
          });
          this.criterias.push({
            title: this.translate.get('VERIF_SCORE5_CRITERIA3_TITLE'),
            array: [{ title: this.translate.get('YES'), checked: false, imgSrc: './assets/pictures/anoxie_possible.png', code: 1 }]
          });
          this.helpId = "help_verif_score5";
          break;
      }
    }
  }

  showModal(item_index) {
    let imgSrc = this.items[item_index].imgSrc; // TODO: pass this parameter to the modal so it can be used to show the picture.
    let testModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc, type: "picture" });
    testModal.present();
  }

  showAlert(Title, subTitle, buttons) {
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }


  validationStep() {
    //cnt nb check and nb criteria
    let cntCriteria = 0;
    let cntChecked = 0;
    for (let criteria of this.criterias) {
      for (let item of criteria.array) {
        cntCriteria += 1;
        if (item.checked == true) {
          cntChecked += 1;
        }
      }
    }

    //Condition of criteria
    if (((cntChecked >= 2) && (cntCriteria == 3)) || ((cntChecked >= 3) && (cntCriteria == 4))) {//Notation ok
      this.showAlert(this.translate.get('VALIDATION'),
        this.translate.get('VALIDATION_ENOUGH_VALID_CRITERIA', { score: this.score }),
        ['OK']);
      this.goToNextLayerOrHome();
    } else if (cntChecked == 0) {//Return to decision tree on wrong result
      this.showAlert(this.translate.get('NO_VALIDATED_CRITERIA'),
        this.translate.get('VALIDATION_NO_VALID_CRITERIA'),
        ['OK']);
      this.navCtrl.push(Notation1Page);
    } else {//suggest to return to decision tree or valid notation
      this.showAlert(this.translate.get('VALIDATION'), this.translate.get('VALIDATION_FEW_VALID_CRITERIA', { score: this.score }), [
        {
          text: this.translate.get('NO_REDO_NOTATION'),
          handler: data => {
            this.navCtrl.push(Notation1Page);
          }
        },
        {
          text: this.translate.get('YES'),
          handler: data => {
            this.goToNextLayerOrHome();
          }
        }]);
    }
  }

  // TODO: Add modal, or alert (see above) showing score
  private goToNextLayerOrHome() {
    this.currentLayer.score = this.score;
    this.dataService.saveParcels();

    if (this.nextLayerIndex < this.currentTest.layers.length) {
      this.dataService.setCurrentLayer(this.nextLayerIndex);
      this.navCtrl.push(CameraPage, { stepView: 5 });
    } else {
      this.calculateAndShowTestScore();
    }
  }

  private calculateAndShowTestScore() {
    let testScore = 0;

    let blockThickness = this.currentTest.thickness;
    for (let i = 0; i < this.currentTest.layers.length; i++) {
      let layer = this.currentTest.layers[i];
      testScore += (layer.score * layer.thickness) / blockThickness;
    }
    testScore = Utils.round(testScore, 1);

    switch (this.currentTest.state) {
      case "STONY_SOIL":
        this.currentTest.layers.push({num: this.currentLayer.num + 1, thickness: 30 - this.currentTest.thickness, score: 3, comment: this.translate.get('STONY_SOIL') })
        break;
      case "TOO_HARD_SOIL":
        this.currentTest.layers.push({num: this.currentLayer.num + 1, thickness: 30 - this.currentTest.thickness, score: 5, comment: this.translate.get('TOO_HARD_SOIL') })
        break;
    }

    this.dataService.getUserInfo().then((value) => {
      if (value != null) {
        this.currentTest.user = value;
        this.dataService.saveParcels();
      }
    });
    this.currentTest.isCompleted = true;
    this.currentTest.score = testScore;
    this.currentTest.comment = this.comment;
    this.dataService.saveParcels();
    let toastMsg = this.translate.get('FINAL_SCORE', { score: testScore });
    this.toasts.showToast(toastMsg, 5000);
    this.navCtrl.push(HomePage);
  }
}
