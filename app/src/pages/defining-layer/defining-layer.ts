import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home-page/home-page';
import { GifViewPage } from '../gif-view/gif-view';

/*
  Generated class for the DefiningLayer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-defining-layer',
  templateUrl: 'defining-layer.html'
})
export class DefiningLayerPage {
  stepView:number;
  imageFile:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = './assets/icon/mignon.gif';
  }

  validationStep(){
    this.navCtrl.push(GifViewPage, {
      stepView: this.stepView+1,
    }).catch(()=> console.log('should I stay or should I go now'))
  }

  returnButton(){
    this.navCtrl.pop();
  }

}
