import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast  } from 'ionic-native';
// Pages
import { GifViewPage } from '../gif-view/gif-view';

@Component({
  selector: 'page-defining-layer',
  templateUrl: 'defining-layer.html'
})
export class DefiningLayerPage {
  stepView:number;
  imageFile:string;
  nbLayers:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = this.navParams.get('picture');
  }

  validationStep(){
    if(this.nbLayers>1){
      this.navCtrl.push(GifViewPage, {
        stepView: this.stepView+1,
        nbLayers: this.nbLayers,
      })
    }else{
      Toast.show("Veuillez entrer les champs correctement", "long", "top").subscribe(toast => {console.log(toast);});
    }
  }

  returnButton(){
    this.navCtrl.pop();
  }

}
