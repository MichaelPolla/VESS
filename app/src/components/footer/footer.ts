import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';

//pages
import { ModalPicturePage } from '../../pages/modal-picture/modal-picture';

@Component({
  selector: 'component-footer-view',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Output() onValidationStep = new EventEmitter<void>();

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  validationStep() {
    this.onValidationStep.emit();
  }



  returnButton() {
    this.navCtrl.pop();
  }

  helpButton(){
    let helpModal = this.modalCtrl.create(ModalPicturePage, { helpNumber: 1, type:"help" });
    helpModal.present();
  }
}
