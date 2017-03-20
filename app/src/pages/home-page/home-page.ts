import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
import { GifViewPage } from '../gif-view/gif-view';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage{

  constructor(public navCtrl: NavController) {}

  goNotation(){
    this.navCtrl.push(ParcelsTestsPage).catch(()=> console.log('should I stay or should I go now'));
  }

  goExtractionBloc(){
    this.navCtrl.push(GifViewPage).catch(()=> console.log('should I stay or should I go now'));
  }

  goCamera(){
    this.navCtrl.push(CameraPage).catch(()=> console.log('should I stay or should I go now'))
  }
}
