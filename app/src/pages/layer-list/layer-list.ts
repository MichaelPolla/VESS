import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Notation1Page } from '../notation-1/notation-1';
import { CameraPage } from '../camera/camera';

/*
  Generated class for the LayerList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-layer-list',
  templateUrl: 'layer-list.html'
})
export class LayerListPage {
  nbLayers:number;
  items:Array<{title: string, id:number}>;
  stepView:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nbLayers = this.navParams.get('nbLayers');
    this.stepView = this.navParams.get('stepView');
    this.items=[];
    for (var i=1; i<=this.nbLayers;i++){
      this.items.push({title: "Couche "+i, id: i})
    }

  }

  layerSelected(item){
    this.navCtrl.push(CameraPage, {
      idLayer: item,
      stepView: this.stepView+1,
    }).catch(()=> console.log('should I stay or should I go now'))
  }

}
