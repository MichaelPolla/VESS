import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'component-footer-view',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Output() onValidationStep = new EventEmitter<void>();

  constructor(public navCtrl: NavController) {
  }

  validationStep() {
    this.onValidationStep.emit();
  }

  returnButton() {
    this.navCtrl.pop();
  }
}
