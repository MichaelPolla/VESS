import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'component-help-view',
  templateUrl: 'help.html'
})
export class HelpComponent {

  @Input() helpNumber: number;
  constructor(public navCtrl: NavController) {
    console.log(this.helpNumber);
  }
}
