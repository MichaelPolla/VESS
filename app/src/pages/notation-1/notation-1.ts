import { Layer } from './../../app/parcel';
import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
// Pages
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { Notation2Page } from '../notation-2/notation-2';
//Providers
import { DataService } from '../../providers/data-service';

@Component({
  selector: 'page-notation-1',
  templateUrl: 'notation-1.html'
})
export class Notation1Page {
  items: Array<{ title: string, checked: Boolean, imgSrc: String, code: number }>;
  code: number;
  layerNumber: number;
  private currentLayer: Layer;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private dataService: DataService) { }

  ionViewDidLoad() {
    this.currentLayer = this.dataService.getCurrentLayer();
    this.layerNumber = this.currentLayer.num;
    this.items = [
      { title: 'Pas de motte fermée', checked: false, imgSrc: './assets/icon/motte.png', code: 1 },
      { title: 'Présence possible de mottes fermées', checked: false, imgSrc: './assets/icon/motte.png', code: 2 },
      { title: 'Présence majoritaire de mottes fermées', checked: false, imgSrc: './assets/icon/motte.png', code: 3 }
    ];
  }

  validationStep() {
    if (this.code) {
      this.navCtrl.push(Notation2Page, {
        code: this.code,
      })
    }
  }

  updateCheckedBox(position, item) {
    let cnt: number = 0;

    for (let item of this.items) {
      //if position selected
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
