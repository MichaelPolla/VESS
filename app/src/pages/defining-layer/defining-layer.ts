import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast  } from 'ionic-native';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
//Providers
import { NotationService } from '../../providers/notation-service';
import { RulerService } from '../../providers/ruler-service';

@Component({
  selector: 'page-defining-layer',
  templateUrl: 'defining-layer.html'
})
export class DefiningLayerPage {
  stepView:number;
  imageFile:string;
  nbLayers:number;
  heightRuler: number;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public notationService: NotationService,
              public rulerService: RulerService) {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = this.navParams.get('picture');

    // Get Height of Ruler in px with :
    // param1: height of image ruler in px
    // param 2: number of px for one centimeter in the image.
    this.rulerService.getHeightStyle(846, 56).then((value: number) => {
      this.heightRuler = value;
    }).catch((error: string) => {
      Toast.show(error, "long", "bottom").subscribe(toast => { console.log(toast); });
    });
  }

  validationStep(){
    if(this.nbLayers>1){
      this.notationService.setLayers(this.nbLayers);
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
