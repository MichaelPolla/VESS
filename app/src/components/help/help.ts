import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

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
