import { Layer } from './../../app/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';
// Pages
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { LayerListPage } from '../layer-list/layer-list';
import { Notation1Page } from '../notation-1/notation-1';
// Providers
import { DataService } from '../../providers/data-service';
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from '../../providers/toasts';


@Component({
  selector: 'page-verif-notation',
  templateUrl: 'verif-notation.html'
})
export class VerifNotationPage {
  heightRuler: number;
  score: number;
  items: Array<{ title: string, checked: Boolean, imgSrc?: string, code: number }>;
  criterias: Array<{ title: string, array: Array<{ title: string, checked: Boolean, imgSrc?: string, code: number }> }>;
  private currentLayer: Layer;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private dataService: DataService,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.currentLayer = this.dataService.getCurrentLayer();

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
            { title: 'Très poreux, grumeleux (photo A)', checked: false, imgSrc: './assets/pictures/a-2.png', code: 1 },
            { title: 'Se séparent spontanément ou après une très faible pression', checked: false, code: 2 },
            { title: 'Sont maintenus entre eux par de nombreuses racines (photo B)', checked: false, imgSrc: './assets/pictures/b-1.png', code: 3 }
          ];
          this.criterias = [{ title: 'Les agrégats d’environ 1cm sont :', array: this.items }];

          break;

        case 2:
          this.items = [
            { title: 'Poreux et arrondis (photo C)', checked: false, code: 1 },
            { title: 'Se séparent spontanément ou après une très faible pression', checked: false, code: 2 },
            { title: 'Contiennent des racines (photo D)', checked: false, code: 3 }
          ];
          this.criterias = [{ title: 'Les agrégats d’environ 1cm sont :', array: this.items }];
          break;
        case 3:
          this.items = [
            { title: 'Majoritairement poreux et arrondis (photo C)', checked: false, code: 1 },
            { title: 'Relativement facile à rompre', checked: false, code: 2 },
            { title: 'Contiennent des racines (photo D)', checked: false, code: 3 }
          ];
          this.criterias = [{ title: 'Les agrégats d’environ 1cm sont :', array: this.items }];
          this.criterias.push({ title: 'Présence possible de fragments* de sol non poreux, ne contenant pas ou peu de racines (photo E)', array: [{ title: 'Oui', checked: false, code: 1 }] });
          break;
        case 4:
          this.items = [
            { title: 'Non poreux, de forme cubique, aux bords anguleux', checked: false, code: 1 },
            { title: 'Contiennent très peu de racines', checked: false, code: 2 }
          ];
          this.criterias = [{ title: 'Les fragments de sol d’environ 1 cm sont :', array: this.items }];
          this.criterias.push({ title: 'Les racines se situent principalement autour des mottes ou au sein des pores grossiers visibles', array: [{ title: 'Oui', checked: false, code: 1 }] });
          break;
        case 5:
          this.items = [
            { title: 'Difficiles à obtenir ( sol compact)', checked: false, code: 1 },
            { title: 'Contiennent très peu ou pas de racines', checked: false, code: 2 }
          ];
          this.criterias = [{ title: 'Les fragments de sol d’environ 1 cm sont :', array: this.items }];
          this.criterias.push({ title: 'Les racines se situent autour principalement des mottes ou au sein des pores grossiers visibles', array: [{ title: 'Oui', checked: false, code: 1 }] });
          this.criterias.push({ title: 'Anoxie possible, couleur gris-bleu (odeur d’œuf pourri)', array: [{ title: 'Oui', checked: false, code: 1 }] });
          break;
      }
    }
  }

  showModal(item_index) {
    let imgSrc = this.items[item_index].imgSrc; // TODO: pass this parameter to the modal so it can be used to show the picture.
    let testModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc });
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
      this.showAlert('Validation', 'Nombre suffisant de critères validés, la qualité de la couche est : ' + this.score, ['OK']);
      this.goToLayerListPage();
    } else if (cntChecked == 0) {//Return to decision tree on wrong result
      this.showAlert('Critère Incorrectes', 'Aucun critère ne semble correspondre. Veuillez recommencer la notation' + this.score, ['OK']);
      this.navCtrl.push(Notation1Page);
    } else {//suggest to return to decision tree or valid notation
      console.log("Suggère de valider ou de retourner à l'arbre de décision")
      this.showAlert('Validation', "Peu de critères validés. Souhaitez-vous néanmoins confirmer la qualité de couche de : " + this.score, [
        {
          text: 'Non, recommencer la notation',
          handler: data => {
            this.navCtrl.push(Notation1Page);
          }
        },
        {
          text: 'Oui',
          handler: data => {
            this.goToLayerListPage();
          }
        }]);
    }
  }
  
  private goToLayerListPage() {
    this.currentLayer.score = this.score;
    this.navCtrl.push(LayerListPage, {
      score: this.score
    });
  }

}
