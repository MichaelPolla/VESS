import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Notation1Page } from '../notation-1/notation-1';
import { DefiningLayerPage } from '../defining-layer/defining-layer';

/*
  Generated class for the GifView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gif-view',
  templateUrl: 'gif-view.html'
})
export class GifViewPage {
  stepView:number;
  imageFile:string;
  titlePage:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //test if is the first step or other step
    if(this.navParams.get('stepView')==null){
      this.stepView = 0;
      this.titlePage = 'Extraction du bloc';
    }else{
      this.stepView = this.navParams.get('stepView');
      this.titlePage = 'Ouverture du bloc';
    }

    //image in function of step
    switch(this.stepView){
      case 0:
        this.imageFile='./assets/icon/TERRE_extraction_bloc.jpg';
      break;
      case 2:
        this.imageFile='./assets/icon/TERRE_ouverture_bloc.jpg';
      break;
    }
  }

  validationStep(){
      if(this.stepView==0){
        this.navCtrl.push(DefiningLayerPage, {
          stepView: this.stepView+1,
        }).catch(()=> console.log('should I stay or should I go now'))
      }else{
        this.navCtrl.push(Notation1Page).catch(()=> console.log('should I stay or should I go now'))
      }

  }

  returnButton(){
    this.navCtrl.pop();
  }

}
