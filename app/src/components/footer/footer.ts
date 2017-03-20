import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'component-footer-view',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Output() onValidationStep = new EventEmitter<void>();

  validationStep() {
    this.onValidationStep.emit();
  }
}
