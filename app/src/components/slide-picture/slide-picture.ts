import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'component-slide-picture-view',
  templateUrl: 'slide-picture.html'
})
export class SlidePictureComponent {

  @Input() imgSrc: string;
  constructor(public navCtrl: NavController) {
    console.log(this.imgSrc);
  }
}
