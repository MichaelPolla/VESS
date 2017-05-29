import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

//pages
import { ModalPicturePage } from '../../pages/modal-picture/modal-picture';

@Component({
  selector: 'component-footer-view',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Input() helpId: string;
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
    let helpModal = this.modalCtrl.create(ModalPicturePage, { helpId: this.helpId, type:"help" });
    helpModal.present();
  }
}
