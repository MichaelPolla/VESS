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

declare var plugins;

@Component({
  selector: 'page-gif-view',
  templateUrl: 'gif-view.html'
})
export class GifViewPage {
  stepView:number;
  imageFile:string;
  titlePage:string;
  nbLayers:number;
  scale:number=10;
  g:number=5.947694038228347;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //test if is the first step or other step
    if(this.navParams.get('stepView')==null){
      this.stepView = 0;
      this.titlePage = 'Extraction du bloc';
    }else{
      this.stepView = this.navParams.get('stepView');
      this.titlePage = 'Ouverture du bloc';
      this.nbLayers = this.navParams.get('nbLayers');
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

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      plugins.screensize.get(successCallback, function(){});
    }

    function successCallback(result) {
      //this.scale = (dpi/(2.54*density))*15.10714  = height en pixel
      Toast.show(result.densityValue, "long", "bottom").subscribe(toast => {console.log(toast);});
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
          stepView: this.stepView+1,
        }).catch(()=> console.log('should I stay or should I go now'))
      }

  }

  returnButton(){
    this.navCtrl.pop();
  }

}
