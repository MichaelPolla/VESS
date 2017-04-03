import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

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
