import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
import { GifViewPage } from '../gif-view/gif-view';
import { CameraPage } from '../camera/camera';
import { ModalPicturePage } from '../modal-picture/modal-picture';

@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage{

  constructor(public navCtrl: NavController, public modalCtrl:ModalController ) {}

  goNotation(){
    this.navCtrl.push(ParcelsTestsPage).catch(()=> console.log('should I stay or should I go now'));
  }

  goExtractionBloc(){
    this.navCtrl.push(GifViewPage).catch(()=> console.log('should I stay or should I go now'));
  }

  goCamera(){
    this.navCtrl.push(CameraPage).catch(()=> console.log('should I stay or should I go now'))
  }

  goResume(){
    let modal = this.modalCtrl.create(ModalPicturePage, { type:"resume" });
    modal.present();
  }
}
