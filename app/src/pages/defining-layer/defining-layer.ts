import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GifViewPage } from '../gif-view/gif-view';
import { Toast  } from 'ionic-native';
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
  nbLayers:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = './assets/icon/mignon.gif';
  }

  validationStep(){
    if(this.nbLayers>1){
      this.navCtrl.push(GifViewPage, {
        stepView: this.stepView+1,
        nbLayers: this.nbLayers,
      }).catch(()=> console.log('should I stay or should I go now'))
    }else{
      Toast.show("Veuillez entrer les champs correctement", "long", "top").subscribe(toast => {console.log(toast);});
    }
  }

  returnButton(){
    this.navCtrl.pop();
  }

}
