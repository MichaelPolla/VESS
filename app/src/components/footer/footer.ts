import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

//pages
import { ModalPicturePage } from '../../pages/modal-picture/modal-picture';

@Component({
  selector: 'component-footer-view',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Input() helpId: string;
  @Output() onValidationStep = new EventEmitter<void>();

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    private translate: TranslateService) {}

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
