import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Notation1Page } from '../notation-1/notation-1';
import { CameraPage } from '../camera/camera';
import { LayerListPage } from '../layer-list/layer-list';
import { Toast  } from 'ionic-native';

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
  nbLayers:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //test if is the first step or other step
    if(this.navParams.get('stepView')==null){
      this.stepView = 0;
      this.titlePage = 'Extraction du bloc';
    }else{
      this.stepView = this.navParams.get('stepView');
      this.titlePage = 'Ouverture du bloc';
      this.nbLayers = 3;
    }

    //image in function of step
    switch(this.stepView){
      case 0:
        this.imageFile='./assets/icon/TERRE_extraction_bloc.jpg';
      break;
      case 3:
        this.imageFile='./assets/icon/TERRE_ouverture_bloc.jpg';
      break;
    }
  }

  validationStep(){
      if(this.stepView==0){
        this.navCtrl.push(CameraPage, {
          stepView: this.stepView+1,
        }).catch(()=> console.log('should I stay or should I go now'))
      }else{
        this.navCtrl.push(LayerListPage, {
          nbLayers: this.nbLayers,
        }).catch(()=> console.log('should I stay or should I go now'))
      }

  }

  returnButton(){
    this.navCtrl.pop();
  }

}
