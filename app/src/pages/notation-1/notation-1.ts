import { Layer } from './../../models/parcel';
import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
// Pages
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { Notation2Page } from '../notation-2/notation-2';
import { VerifNotationPage } from './../verif-notation/verif-notation';
//Providers
import { DataService } from '../../providers/data-service';
import { TranslateProvider } from './../../providers/translate/translate';

@Component({
  selector: 'page-notation-1',
  templateUrl: 'notation-1.html'
})
export class Notation1Page {
  items: Array<{ title: string, checked: Boolean, imgSrc: String, code: number }>;
  code: number;
  public layerNumber: number;
  public currentLayer: Layer;
  public title:string;

  constructor(
    private dataService: DataService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private translate: TranslateProvider
  ) { }

  ionViewDidLoad() {
    this.currentLayer = this.dataService.getCurrentLayer();
    this.layerNumber = this.currentLayer.num;
    this.title = this.translate.get('NOTATION_OF_LAYER') + " " + this.layerNumber + "  ("+this.currentLayer.minThickness+"-"+this.currentLayer.maxThickness+" cm)";
    this.items = [
      {
        title: this.translate.get('NOTATION_STEP1_OPTION1'),
        checked: false,
        imgSrc: './assets/pictures/pas_motte_fermee.png',
        code: 1
      },
      {
        title: this.translate.get('NOTATION_STEP1_OPTION2'),
        checked: false,
        imgSrc: './assets/pictures/possibles_mottes_fermees.png',
        code: 2
      },
      {
        title: this.translate.get('NOTATION_STEP1_OPTION3'),
        checked: false,
        imgSrc: './assets/pictures/majoritaire_mottes_fermees.png',
        code: 3
      }
    ];
  }

  validationStep() {
    if (this.code) {
      if (this.code == 2) {
        this.navCtrl.push(VerifNotationPage, {
          score: 3
        })
      }
      else {
        this.navCtrl.push(Notation2Page, {
          code: this.code,
        })
      }
    }
  }

  updateCheckedBox(position, item) {
    let cnt: number = 0;

    for (let item of this.items) {
      if (position == cnt) {
        item.checked = true;
        this.code = item.code;
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
