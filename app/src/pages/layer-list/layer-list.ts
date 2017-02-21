import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Notation1Page } from '../notation-1/notation-1';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nbLayers = this.navParams.get('nbLayers');
    this.items=[];
    for (var i=1; i<=this.nbLayers;i++){
      this.items.push({title: "Couche "+i, id: i})
    }

  }

  layerSelected(item){
    this.navCtrl.push(Notation1Page, {
      idLayer: item,
    }).catch(()=> console.log('should I stay or should I go now'))
  }

}
