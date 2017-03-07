import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
// Pages
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { Notation2Page } from '../notation-2/notation-2';

@Component({
  selector: 'page-notation-1',
  templateUrl: 'notation-1.html'
})
export class Notation1Page {

  //declaration of field
  items: Array<{ title: string, checked: Boolean, imgSrc: String, code: number }>;
  code: number;
  layerNumber: number;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    //construction of the list
    this.items = [
      { title: 'Pas de motte fermée', checked: false, imgSrc: './assets/icon/motte.png', code: 1 },
      { title: 'Présence possible de mottes fermées', checked: false, imgSrc: './assets/icon/motte.png', code: 2 },
      { title: 'Présence majoritaire de mottes fermées', checked: false, imgSrc: './assets/icon/motte.png', code: 3 }
    ];
  }

  //Methods
  validationStep() {
    this.navCtrl.push(Notation2Page, {
      code: this.code,
    })
  }

  updateCheckedBox(position, item) {
    //declar var
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

  returnButton() {
    this.navCtrl.pop();
  }

  showModal(item_index) {
    let imgSrc = this.items[item_index].imgSrc; // TODO: pass this parameter to the modal so it can be used to show the picture.
    let testModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc });
    testModal.present();
  }

}
